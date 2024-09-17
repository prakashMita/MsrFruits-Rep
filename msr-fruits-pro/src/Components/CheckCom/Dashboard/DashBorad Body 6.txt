import React, { useState, useEffect } from "react";
import axios from 'axios';

function Body() {
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [totalOrderCount, setTotalOrderCount] = useState(0);
  const [monthOrderCount, setMonthOrderCount] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [monthTotalPrice, setMonthTotalPrice] = useState(0);
  const [todayTotalPrice, setTodayTotalPrice] = useState(0);
  const [todayOrderCount, setTodayOrderCount] = useState(0); // State for today's order count
  const [selectedMonth, setSelectedMonth] = useState('');

  // Helper function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  // Get today's date
  const getTodayDate = () => {
    return formatDate(new Date());
  };

  // Fetch customer list from backend
  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await axios.get('http://localhost:8081/customerlist');
        const customers = response.data;

        setFilteredCustomers(customers);

        // Total Order Count
        const uniqueOrderIds = new Set(customers.map(customer => customer.OrderId));
        setTotalOrderCount(uniqueOrderIds.size);

        // Total Price Calculation
        const orderIdTotals = customers.reduce((acc, customer) => {
          const { OrderId, OverAllAmount } = customer;
          if (!acc.has(OrderId)) {
            acc.set(OrderId, parseFloat(OverAllAmount) || 0);
          }
          return acc;
        }, new Map());
        const total = Array.from(orderIdTotals.values()).reduce((sum, orderTotal) => sum + orderTotal, 0);
        setTotalPrice(total);

        // Today's Orders
        const today = getTodayDate();
        const todayOrders = customers.filter((customer) => {
          return formatDate(customer.created_at) === today;
        });
        
        // Unique Order Count for Today
        const todayUniqueOrderIds = new Set(todayOrders.map(customer => customer.OrderId));
        setTodayOrderCount(todayUniqueOrderIds.size); // Update today's order count
        
        // Total Price for Today
        const todayUniqueOrderTotals = todayOrders.reduce((acc, customer) => {
          const { OrderId, OverAllAmount } = customer;
          if (!acc.has(OrderId)) {
            acc.set(OrderId, parseFloat(OverAllAmount) || 0);
          }
          return acc;
        }, new Map());
        const todayTotal = Array.from(todayUniqueOrderTotals.values()).reduce((sum, orderTotal) => sum + orderTotal, 0);
        setTodayTotalPrice(todayTotal);

      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerList();
  }, []);

  // Handle month change
  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    if (month) {
      const filteredByMonth = filteredCustomers.filter(customer => {
        const customerMonth = new Date(customer.created_at).toLocaleString('default', { month: 'long' });
        return customerMonth === month;
      });

      const uniqueOrderIds = new Set(filteredByMonth.map(customer => customer.OrderId));
      setMonthOrderCount(prevCounts => ({
        ...prevCounts,
        [month]: uniqueOrderIds.size,
      }));

      const uniqueOrderTotals = filteredByMonth.reduce((acc, customer) => {
        const { OrderId, OverAllAmount } = customer;
        if (!acc.has(OrderId)) {
          acc.set(OrderId, parseFloat(OverAllAmount) || 0);
        }
        return acc;
      }, new Map());

      const monthTotal = Array.from(uniqueOrderTotals.values()).reduce((sum, orderTotal) => sum + orderTotal, 0);
      setMonthTotalPrice(monthTotal);
    } else {
      setMonthOrderCount({});
      setMonthTotalPrice(0);
    }
  };
  return (
    <>
      <div className="col-10">
        <div className="py-2"></div>

        {/* row-1 */}
        <div className="">
          <div className="row ms-5">
            <div className="row">
              <div className="col-12">
                <h5 className="ps-0">Total Order Details</h5>
              </div>
            </div>

            {/* Total Sales Card */}
            <div className="col-md-6 col-lg-4 col-4">
              <div className="card report-card">
                <div className="card-body pb-4">
                  <div className="row d-flex justify-content-center pb-3">
                    <div className="col">
                      <p className="text-dark mb-0 fw-semibold">Total Sales</p>
                      <h3 className="m-0">
                        <i className="bi bi-currency-rupee"></i>
                        <span className="text-warning">{totalPrice.toFixed(2)}</span>
                      </h3>
                      <p className="mb-0 text-truncate text-muted">
                        <div className="py-2"></div>
                        <span className="text-success">
                          <i className="mdi mdi-trending-up"></i>8.5%
                        </span>{" "}New Sessions Today
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

            {/* Month Sales Card with Dropdown */}
            <div className="col-md-6 col-lg-4 col-4">
      <div className="card report-card">
        <div className="card-body">
          <div className="row d-flex justify-content-center">
            <div className="col">
              <p className="text-dark mb-0 fw-semibold">Month Sales</p>
              <h3 className="m-0">
                <i className="bi bi-currency-rupee"></i>
                <span className="text-warning">{monthTotalPrice.toFixed(2)}</span>
              </h3>
              <p className="text-dark mb-0 fw-semibold">
                <select value={selectedMonth} onChange={handleMonthChange} className="form-select">
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </p>
              <p className="mb-0 text-truncate text-muted">
                <span className="text-success">
                  <i className="mdi mdi-trending-up"></i>1.5% Weekly Avg.Sessions
                </span>
              </p>
            </div>
            <div className="col-auto align-self-center">
              <div className="report-main-icon bg-light-alt">
                <i data-feather="clock" className="align-self-center text-muted icon-sm"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

            {/* Today's Total Sales Card */}
            <div className="col-md-6 col-lg-4 col-4">
              <div className="card report-card">
                <div className="card-body pb-4">
                  <div className="row d-flex justify-content-center pb-3">
                    <div className="col">
                      <p className="text-dark mb-0 fw-semibold">Today’s Sales</p>
                      <h3 className="m-0">
                        <i className="bi bi-currency-rupee"></i>
                        <span className="text-warning">{todayTotalPrice.toFixed(2)}</span>
                      </h3>
                      <p className="mb-0 text-truncate text-muted">
                        <span className="text-danger">
                          <div className="py-2"></div>
                          <i className="mdi mdi-trending-down"></i>35% Bounce Rate Weekly
                        </span>
                      </p>
                    </div>
                    <div className="col-auto align-self-center">
                      <div className="report-main-icon bg-light-alt">
                        <i data-feather="clock" className="align-self-center text-muted icon-sm"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


        {/* row -2  */}
        <div className="col-md-6 col-lg-4 col-4 pt-3">
              <div className="card report-card">
                <div className="card-body pb-4">
                  <div className="row d-flex justify-content-center pb-3">
                    <div className="col">
                      <p className="text-dark mb-0 fw-semibold">Total Order</p>
                      <h3 className="m-0">
                        <i className="bi bi-handbag"></i>
                        <span className="text-warning"> {totalOrderCount}</span> {/* Display unique OrderId count */}
                      </h3>
                      <p className="mb-0 text-truncate text-muted">
                        <div className="py-2"></div>
                        <span className="text-success">
                          <i className="mdi mdi-trending-up"></i>8.5%
                        </span>{" "}New Sessions Today
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
            {/* Month Order Card */}
            <div className="col-md-6 col-lg-4 col-4 pt-3">
        <div className="card report-card">
          <div className="card-body pb-4">
            <div className="row d-flex justify-content-center pb-3">
              <div className="col">
                <p className="text-dark mb-0 fw-semibold">Month Order <span className="text-info"></span></p>
                <h3 className="m-0">
                  <i className="bi bi-handbag"></i>
                  <span className="text-warning"> {monthOrderCount[selectedMonth] || 0}</span>
                </h3>
                <p className="mb-0 text-truncate text-muted">
                  <div className="py-2"></div>
                  <span className="text-success">
                    <i className="mdi mdi-trending-up"></i>1.5%
                  </span>{" "}Weekly Avg.Sessions
                </p>
              </div>
              <div className="col-auto align-self-center">
                <div className="report-main-icon bg-light-alt">
                  <i data-feather="clock" className="align-self-center text-muted icon-sm"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 

            {/* Today's Order Card */}
            <div className="col-md-6 col-lg-4 col-4 pt-3">
        <div className="card report-card">
          <div className="card-body pb-4">
            <div className="row d-flex justify-content-center pb-3">
              <div className="col">
                <p className="text-dark mb-0 fw-semibold">Today's Order</p>
                <h3 className="m-0">
                  <i className="bi bi-handbag"></i>
                  <span className="text-warning"> {todayOrderCount}</span>
                </h3>
                <p className="mb-0 text-truncate text-muted">
                  <div className="py-2"></div>
                  <span className="text-danger">
                    <i className="mdi mdi-trending-down"></i>35%
                  </span>{" "}Bounce Rate Weekly
                </p>
              </div>
              <div className="col-auto align-self-center">
                <div className="report-main-icon bg-light-alt">
                  <i data-feather="activity" className="align-self-center text-muted icon-sm"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default Body;
