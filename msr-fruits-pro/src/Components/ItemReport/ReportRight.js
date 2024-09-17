import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ReportRight() {
  const location = useLocation();
  const { OrderId, UserName, UserMobile, status } = location.state || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [showViewButton, setShowViewButton] = useState(true);
  const [orderIdFilter, setOrderIdFilter] = useState('');
  const [userNameFilter, setUserNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [amounts, setAmounts] = useState({});
  const [isFilteringByToday, setIsFilteringByToday] = useState(false);
  const [isFilteringByLast7Days, setIsFilteringByLast7Days] = useState(false);  // Add this line

  const [isMonthModalOpen, setIsMonthModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');


  const [fromDate, setFromDate] = useState('');
const [toDate, setToDate] = useState('');
const [orderTypeFilter, setOrderTypeFilter] = useState(''); // Order type filter

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowViewButton(true);
  };

  useEffect(() => {
    fetchAllData(); // Fetch all data by default when component mounts
  }, []);
  

  const fetchAllData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/customerlist');
      const uniqueCustomers = getUniqueCustomers(response.data);
      setCustomers(uniqueCustomers);
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const fetchDataByPeriod = async (startDate, endDate) => {
    try {
      const response = await axios.get('http://localhost:8081/customerlist', {
        params: { startDate, endDate }
      });
      console.log('Fetched customers:', response.data); // Add this line to debug
      const uniqueCustomers = getUniqueCustomers(response.data);
      setCustomers(uniqueCustomers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleViewClick = async (orderId) => {
    setShowViewButton(false);
    setIsModalOpen(true);
    try {
      const response = await axios.get(`http://localhost:8081/customerlist/${orderId}`);
      setSelectedOrder(response.data || []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert(`Order with ID ${orderId} not found.`);
      } else {
        alert('An error occurred while fetching the order details.');
      }
      setSelectedOrder([]);
    }
  };

  const getUniqueCustomers = (data) => {
    const seen = new Set();
    return data.filter((customer) => {
      const duplicate = seen.has(customer.OrderId);
      seen.add(customer.OrderId);
      return !duplicate;
    });
  };



  const fetchTodayData = () => {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];
    
    setIsFilteringByToday(true);
    setFromDate('');  // Clear from date filter
    setToDate('');    // Clear to date filter
    fetchDataByPeriod(todayDate, todayDate);
  };
  
  const fetchAllReports = () => {
    // Reset filters
    setIsFilteringByToday(false);
    setFromDate('');  // Clear from date filter
    setToDate('');    // Clear to date filter
    
    // Fetch all data
    fetchAllData();
  };
  

  const filteredCustomers = customers.filter(customer => {
    const matchesOrderId = orderIdFilter ? customer.OrderId.toString().includes(orderIdFilter) : true;
    const matchesUserName = userNameFilter ? customer.UserName.toLowerCase().includes(userNameFilter.toLowerCase()) : true;
    const matchesStatus = statusFilter ? customer.OrderStatus === statusFilter : true;
    const matchesOrderType = orderTypeFilter ? customer.OrderType === orderTypeFilter : true;
  
    const customerDate = new Date(customer.created_at).toISOString().split('T')[0];
  
    // Check if we are filtering by the selected date range
    if (fromDate && toDate) {
      const isInRange = customerDate >= fromDate && customerDate <= toDate;
      return matchesOrderId && matchesUserName && matchesStatus && matchesOrderType && isInRange;
    }
  
    // Check if we are filtering by today's date
    if (isFilteringByToday) {
      const today = new Date().toISOString().split('T')[0];
      const matchesTodayDate = customerDate === today;
      return matchesOrderId && matchesUserName && matchesStatus && matchesOrderType && matchesTodayDate;
    }
  
    // Show all data (when no specific filters are applied)
    return matchesOrderId && matchesUserName && matchesStatus && matchesOrderType;
  });
  
  
  
  

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const newAmounts = {};
    filteredCustomers.forEach(customer => {
      const totalAmount = selectedOrder
        .filter(order => order.OrderId === customer.OrderId)
        .reduce((total, item) => total + parseFloat(item.Price || 0), 0)
        .toFixed(2);
      newAmounts[customer.OrderId] = totalAmount;
    });
    setAmounts(newAmounts);
  }, [selectedOrder, filteredCustomers]);

  // report price list
//   const [totalPrice, setTotalPrice] = useState(0);

// useEffect(() => {
//   const total = filteredCustomers.reduce((sum, customer) => sum + parseFloat(customer.Price || 0), 0).toFixed(2);
//   setTotalPrice(total);
// }, [filteredCustomers]);

  
  return (
    <div>
      <div className='row'>
        <div className='col-6'>
          <h3 className='my-4'>ORDER REPORTS</h3>
        </div>
        <div className='col-6 my-auto text-end'>
          <div className="text-right my-auto pe-4">
            <h3><strong className='my-auto'>Total Orders:<span className='text-warning'> {filteredCustomers.length}</span></strong></h3>
          </div>
        </div>
      </div>
      {/* price report */}
      {/* <div className='row my-2'>
  <div className="col-md-6 col-lg-4 col-4">
    <div className="card report-card">
      <div className="card-body ">
        <div className="row d-flex justify-content-center">
          <div className="col">
            <p className="text-dark mb-0 fw-semibold">Total Sales</p>
            <h3 className="m-0">
              <i className="bi bi-currency-rupee"></i>
              <span className="text-warning">{totalPrice}</span> 
            </h3>
            <p className="mb-0 text-truncate text-muted">
              <span className="text-success">
                <i className="mdi mdi-trending-up"></i>8.5%
              </span> New Sessions Today
            </p>
          </div>
          <div className="col-auto align-self-center">
            <div className="report-main-icon bg-light-alt">
              <i data-feather="users" className="align-self-center text-muted icon-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}













      <div className='row  text-center mx-auto bg-warning rounded'>

      <div className="form-group col-md-3 col-3">
      <label htmlFor="fromDate">From Date</label>
      <input
        id="fromDate"
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
    </div>
    <div className="form-group col-md-3 col-3">
      <label htmlFor="toDate">To Date</label>
      <input
        id="toDate"
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
    </div>
    

  <div className='col-3 my-auto p-0'>
    <div className='pt-2'></div>
    <button onClick={fetchTodayData} className='my-auto w-100 m-0 p-2'>Today Report</button>
</div>
<div className='col-3 my-auto'>
<div className='pt-2'></div>
    <button className='my-auto w-100 p-2 bg-danger' onClick={fetchAllReports}>All Reports</button>
  </div>


        
        
      </div>

      <form>
  <div className="row">
    <div className="form-group col-md-3 col-3">
      <label htmlFor="orderIdFilter">OrderId</label>
      <input
        id="orderIdFilter"
        type="text"
        placeholder="Filter by Order ID"
        value={orderIdFilter}
        onChange={(e) => setOrderIdFilter(e.target.value)}
      />
    </div>
    <div className="form-group col-md-3 col-3 mx-auto ">
      <label htmlFor="userNameFilter">UserName</label>
      <input
        id="userNameFilter"
        type="text"
        placeholder="Filter by Name"
        value={userNameFilter}
        onChange={(e) => setUserNameFilter(e.target.value)}
      />
    </div>
    <div className="form-group col-md-3 col-3 pe-0">
      <label className=' m-0 ms-5 '>Status</label>
      <div className='pt-0 m-0 ms-4 pe-0 ps-3'>
        <button
          type="button"
          className={`status-button ${statusFilter === '' ? 'active' : ''}`}
          style={{ marginTop: "0px"}}
          onClick={() => setStatusFilter('')}
        >
          All
        </button>
        <button
          type="button"
          className={`status-button ${statusFilter === 'Paid' ? 'active' : ''}`}
          style={{ marginTop: "0px"}}
          onClick={() => setStatusFilter('Paid')}
        >
          Paid
        </button>
        <button
          type="button"
          className={`status-button ${statusFilter === 'Unpaid' ? 'active' : ''}`}
          style={{ marginTop: "0px"}}
          onClick={() => setStatusFilter('Unpaid')}
        >
          Unpaid
        </button>
      </div>
    </div>

    <div className='col-3 pe-1'>
  <label>Order Type:</label>
  <div className='pe-4'>
    <div className="button-group row p-0 bg-warning border rounded">
      <div className='col-4 p-0'>
        <button
          type="button"
          className={`btn ${orderTypeFilter === '' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          style={{ margin: "0px", width: '100px' }}
          onClick={() => setOrderTypeFilter('')}
        >
          All
        </button>
      </div>
      <div className='col-4 p-0'>
        <button
          type="button"
          className={`btn ${orderTypeFilter === 'Purchase Order' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          style={{ margin: "0px", width: '100px' }}
          onClick={() => setOrderTypeFilter('Purchase Order')}
        >
          Purchase
        </button>
      </div>
      <div className='col-4 p-0'>
        <button
          type="button"
          className={`btn ${orderTypeFilter === 'Sale Order' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          style={{ margin: "0px", width: '100px' }}
          onClick={() => setOrderTypeFilter('Sale Order')}
        >
          Sale
        </button>
      </div>
    </div>
  </div>
</div>


  </div>
</form>


      {filteredCustomers.length > 0 ? (
        <div className="table-container">
<table className="table">
  <thead className="table-dark">
    <tr>
      <th>OrderID</th>
      <th>Name</th>
      <th>Mobile</th>
      <th>Date</th>
      <th>Status</th>
      <th>OrderType</th>
      <th>TotalAmount</th>

      <th className='text-center'>Action</th>
    </tr>
  </thead>
  <tbody className="postablebody">
  {filteredCustomers.map((customer, index) => (
  <tr key={index}>
    <td className="fw-bold">{customer.OrderId}</td>
    <td>{customer.UserName || 'N/A'}</td>
    <td>{customer.UserMobile || 'N/A'}</td>
    <td>{formatDate(customer.created_at)}</td>
    <td>{customer.OrderStatus || 'N/A'}</td>
    <td>{customer.OrderType || 'N/A'}</td>
    <td>{customer.OverAllAmount || 'N/A'}</td>
  


    <td className="text-center">
      <button className="viewbutton" type="button" onClick={() => handleViewClick(customer.OrderId)}>
        {isModalOpen && selectedOrder.length > 0 && selectedOrder[0]?.OrderId === customer.OrderId ? 'Hide' : 'View'}
      </button>
    </td>
  </tr>
))}


  </tbody>
</table>

        </div>
      ) : (
        <div className="no-customers text-center">
          <div className="my-5"></div>
          <h1>NO RECORD FOUND!</h1>
        </div>
      )}

{isModalOpen && selectedOrder.length > 0 && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleCloseModal}>&times;</span>
      <h4 className='bg-info rounded px-1 py-1'>Order Details</h4>
      <p><strong>OrderID:</strong> {selectedOrder[0]?.OrderId}</p>
      <p><strong>UserName:</strong> {selectedOrder[0]?.UserName || 'N/A'}</p>
      <table className="table table-striped table-hover">
        <thead className='table-dark'>
          <tr>
            <th>Fruit</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedOrder.map((item, index) => (
            <tr key={index}>
              <td>{item.Fruit}</td>
              <td>{item.Quantity}</td>
              <td>{item.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><strong>TotalAmount : </strong>{selectedOrder.reduce((total, item) => total + parseFloat(item.Price || 0), 0).toFixed(2)}</p>
      <p><strong>OverAllAmount :<span className='fs-5'> {selectedOrder[0]?.OverAllAmount || 'N/A'}</span></strong></p>
    </div>
  </div>
)}


      <style jsx>{`
        .table-container {
          max-height: 700px;
          overflow-y: auto;
          height: 470px;
        }
        .postablebody {
          max-height: 400px;
          overflow-y: auto;
          width: 100%;
        }
        .postablebody tr {
          width: 100%;
          table-layout: fixed;
        }
        .postablebody td {
          padding: 8px;
          border: 1px solid #ddd;
        }
        thead {
          position: sticky;
          top: 0;
          background-color: #f1f1f1;
          z-index: 1;
        }
        .viewbutton {
          background-color: #0dcaf0;
        }
        .modal {
          display: ${isModalOpen ? 'flex' : 'none'};
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.4);
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: white;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 500px;
          border-radius: 8px;
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }
        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }

        .status-button {
          background-color: #f1f1f1;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 10px 20px;
          margin: 5px;
          cursor: pointer;
          outline: none;
          font-size: 16px;
          color: black;
          transition: background-color 0.3s;
        }

        .status-button:hover {
          background-color: #e0e0e0;
        }

        .status-button.active {
          background-color: rgb(75, 181, 67);
          color: white;
          border-color: rgb(237, 232, 232);
        }










      `}</style>
    </div>
  );
}

export default ReportRight;
