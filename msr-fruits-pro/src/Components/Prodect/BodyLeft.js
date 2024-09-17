import React, { useState, useEffect,useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/style/Prodect.css'
import { Icon } from '@iconify/react';
import addCircleOutline from '@iconify/icons-ion/add-circle-outline';

function BodyLeft() {
  const location = useLocation();
  const { orderId } = location.state || {};
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(true);   // Tracks if data is saved
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [values, setValues] = useState({
    Fruit: '',
    Quantity: '1',
    Price: '',
    Amount: '',
    Comm: '',
    LorryRent: '',
    Cooly: '',
    NoteCash: '',
    CommTableTotal: '0.00',
  });
  
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues(prevValues => ({
  //     ...prevValues,
  //     [name]: value
  //   }));
  // };
  

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  // const [submit, setSubmit] = useState(false); 
  const [status, setStatus] = useState('Unpaid');

  const [popupVisible, setPopupVisible] = useState(false); // Popup state
  const [popupData, setPopupData] = useState(null); // Popup data
  
  // UseEffect to load data from localStorage
  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    const savedValues = localStorage.getItem('values');
  
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues);
      const comm = parseFloat(parsedValues.Comm) || 0;
      const lorryRent = parseFloat(parsedValues.LorryRent) || 0;
      const cooly = parseFloat(parsedValues.Cooly) || 0;
      const noteCash = parseFloat(parsedValues.NoteCash) || 0;
      parsedValues.CommTableTotal = (comm + lorryRent + cooly + noteCash).toFixed(2);
      setValues(parsedValues);
    }
  
    axios.get('http://localhost:8081/prodects')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  



  const handleInputChange = (e) => {
    const { name: inputName, value } = e.target;
  
    setValues(prevValues => {
      const newValues = {
        ...prevValues,
        [inputName]: value
      };
  
      // Save values to localStorage
      localStorage.setItem('values', JSON.stringify(newValues));
  
      // Calculate Amount if Quantity or Price changes
      if (inputName === 'Quantity' || inputName === 'Price') {
        const quantity = parseFloat(newValues.Quantity) || 0;
        const price = parseFloat(newValues.Price) || 0;
        newValues.Amount = (quantity * price).toFixed(2); // Ensure Amount is always a decimal
      }
  
      // Calculate CommTableTotal if any of the relevant fields change
      if (['Comm', 'LorryRent', 'Cooly', 'NoteCash'].includes(inputName)) {
        const comm = parseFloat(newValues.Comm) || 0;
        const lorryRent = parseFloat(newValues.LorryRent) || 0;
        const cooly = parseFloat(newValues.Cooly) || 0;
        const noteCash = parseFloat(newValues.NoteCash) || 0;
        newValues.CommTableTotal = (comm + lorryRent + cooly + noteCash).toFixed(2);
      }
  
      return newValues;
    });
  };
  
  

  
  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);

    // Save form data to localStorage
    localStorage.setItem('formData', JSON.stringify(newFormData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Log orderId for debugging
    console.log("Order ID:", orderId);
  
    if (!orderId) {
      alert('Please Generate Order ID');
      return;
    }
  
    if (!values.Fruit || !values.Quantity || !values.Price) {
      alert('Please fill out all required fields.');
      return;
    }
    // if (!values.Comm || !values.LorryRent || !values.Cooly || !values.NoteCash) {
    //   alert("Please fill out all required fields.");
    //   return;
    // }
  
    const totalAmount = data.reduce((total, item) => total + parseFloat(item.Amount || 0), 0).toFixed(2);
  
    // Log values to ensure correct data is being sent
    console.log({
      ...values,
      OrderID: orderId,
      TotalAmount: totalAmount,
    });
    // console.log(values)
  
    axios.post('http://localhost:8081/prodects', {
      ...values,
      OrderId: orderId,
      TotalAmount: totalAmount,
    }, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => axios.get('http://localhost:8081/prodects'))
    .then(response => {
      setData(response.data);
      // Optionally reset the form fields here
    })
    .catch(err => {
      alert('Error: ' + (err.response ? err.response.data.error : 'Unknown error'));
    });
  };
  

  const clearFormData = () => {
    setFormData({ name: '', mobile: '' });
    setValues({
      Fruit: '',
      Quantity: '',
      Price: '',
      Amount: '',
      TotalAmount: '',
      OrderID: '', // Reset OrderID here as well
    });
  
    // Clear localStorage
    localStorage.removeItem('formData');
    localStorage.removeItem('values');
  };
  // Calculate total amount before handleClick
  const totalAmount = data.reduce((total, item) => total + parseFloat(item.Price || 0), 0).toFixed(2);
  // const handleClick = () => {
  //   navigate('/invoice', {
  //     state: {
  //       tableData: data,
  //       orderId: randomNumber,
  //       totalAmount: data.reduce((total, item) => total + parseFloat(item.Amount || 0), 0).toFixed(2),
  //       totalItem: data.length,
  //     }
  //   });
  // };

  const clearData = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete all items?")) {
      setLoading(true);


      axios.delete('http://localhost:8081/prodects')
        .then(() => {

          setData([]);

          // alert('All items have been deleted successfully.');
        })
        .catch(err => {
          console.error('There was an error deleting the data!', err);
          alert('Failed to delete items. Please try again.');
        })
        .finally(() => {

    localStorage.removeItem('formData');
    localStorage.removeItem('values');
          setLoading(false);
        });
    }
  };
  

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };



  const handleDelete = async (id, e) => {
    e.preventDefault(); // Prevent default action
  
    console.log('ID for deletion:', id); // Debugging log
  
    if (!id || isNaN(id)) {
      console.error('Invalid id:', id);
      alert('Invalid id provided.');
      return;
    }
  
    setLoading(true); // Show loading state
  
    try {
      await axios.delete(`http://localhost:8081/prodects/${id}`);
      console.log('Delete successful');
      
      // Optionally, remove the item from state
      setData(prevData => prevData.filter(item => item.id !== id));
  
      // alert('Item deleted successfully.');
    } catch (err) {
      console.error('Error deleting the data!', err);
      alert('Failed to delete item. Please try again.');
    } finally {
      setLoading(false); // Hide loading state
    }
  };
  
  

  
  
  
  






  const handleClick = () => {
    const totalAmount = data.reduce((total, item) => total + parseFloat(item.Amount || 0), 0).toFixed(2);
    
    navigate('/Pos', {
      state: {
        tableData: data,
        OrderId: orderId,
        totalAmount: totalAmount,
        totalItem: data.length,
        UserName: formData.name,
        UserMobile: formData.mobile,
        status: status // Add status here
      }
    });
  };
  






  useEffect(() => {
    axios.get('http://localhost:8081/prodects')
      .then(response => {
        console.log('API response:', response.data); // Check if this is an array
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  

  // const [popupVisible, setPopupVisible] = useState(false); // Popup state
 

  const handleSave = async () => {
    const { Fruit, Quantity, Price, Amount, Comm, LorryRent, Cooly, NoteCash } = values;
  
    // Calculate TotalAmount by summing all item amounts
    const totalAmount = data.reduce((total, item) => total + parseFloat(item.Price || 0), 0).toFixed(2);
  
    // Perform validation
    if (!Fruit || !Quantity || !Price || !Amount) {
      alert("Please fill out all required fields.");
      return;
    }
  
    if (!orderId || !formData.name || !formData.mobile) {
      alert("Order ID, customer name, and mobile number are required.");
      return;
    }
  
    if (isChecked) {
      if (!Comm || !LorryRent || !Cooly || !NoteCash) {
        alert("Please fill out all required fields.");
        return;
      }
    } else {
      console.log('Checkbox is not checked');
    }
  
    // Calculate CommTableTotal
    const commTableTotal = [Comm, LorryRent, Cooly, NoteCash]
      .map(value => parseFloat(value) || 0)
      .reduce((acc, val) => acc + val, 0).toFixed(2);
  
    // Determine OverAllAmount by subtracting CommTableTotal from TotalAmount
    const overAllAmount = (parseFloat(totalAmount) - parseFloat(commTableTotal)).toFixed(2);
  
    // Determine orderType
    const orderType = isChecked ? 'Purchase Order' : 'Sale Order';
  
    setIsSaving(true);
    setIsSaved(false);
  
    try {
      // Post to customerlist table
      await axios.post('http://localhost:8081/customerlist', {
        OrderId: orderId,
        UserName: formData.name,
        UserMobile: formData.mobile,
        tableData: data.map(item => ({
          Fruit: item.Fruit,
          Quantity: item.Quantity,
          Price: item.Price,
          Amount: item.Amount,
          OrderStatus: status,
          OrderType: orderType,  // Include OrderType
        })),
        TotalAmount: totalAmount,
        TotalItem: data.length,
        OrderStatus: status,
        Comm: Comm,
        LorryRent: LorryRent,
        Cooly: Cooly,
        NoteCash: NoteCash,
        CommTableTotal: commTableTotal,
        OverAllAmount: overAllAmount, // Include OverAllAmount
        OrderType: orderType  // Include OrderType
      });
  
      // Post order status
      await axios.post('http://localhost:8081/orderstatus', {
        OrderId: orderId,
        OrderStatus: status,
      });
  
      setPopupData({ message: "Product added successfully" });
      setPopupVisible(true);
  
      setTimeout(() => {
        setPopupVisible(false);
      }, 1000);
  
    } catch (error) {
      console.error("Error storing customer and table data:", error);
      alert("Error saving the data. Please try again.");
    }
  };
  
  
  
  


  
  
  
  
  
  


  const handlePrint = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const customerName = formData.name || "Not Provided";
    const phone = formData.mobile || "Not Provided";
    const totalAmount = data.reduce((total, item) => total + parseFloat(item.Amount || 0), 0).toFixed(2);
  
    console.log("FormData:", formData); // Debugging statement
    console.log("Total Amount:", totalAmount); // Debugging statement
  
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Invoice</title>
        <style>
             body {
      font-family: Courier, monospace;
      width: 70mm;
      margin: 0;
      padding: 0;
      font-size: 10px;
    }
    .center {
      text-align: center;
    }
    .bold {
      font-weight: bold;
      padding-left:10px;

    }
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    .table th, .table td {
      border-bottom: 1px dashed #000;
      padding: 2px 0;
      // text-align: left;
      text-align: center;
    }
.row {
  display: flex;
  justify-content: space-between;
}

.col-6, .col-5 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.text-right {
  text-align: right;
}
    .footeritem {
      margin-top: 10px;
    }
    .total {
      font-size: 12px;
    }
    .comtitle {
      font-size: 14px;
    }
    .fullbody {
      margin: auto;
    }
      .topbody{
      margin:auto 
      }
      .border{
      width:270px
      }
 .table th{
 padding:5px
 }







 

        </style>
      </head>
      <body class='fullbody'>
        <div class="center bold comtitle">MSR.com</div>
        <div class='topbody'>
        <hr class='border'/>
        <div class="row ">
          <div class="col-6 text-left">
            <div>Invoice ID: ${orderId}</div>
            <div>Customer: ${customerName}</div>
            <div>Phone: ${phone}</div>
          </div>
          <div class="col-1"></div>
          <div class="col-5 text-right ">
            <div class='text-start'>Date: ${currentDate}</div>
            <div>Time: ${currentTime}</div>
            <div>Status: ${status}</div>
          </div>
        </div>
        <hr class='border' />
        </div>
        <table class="table">
          <thead>
            <tr>
              <th class='tablehead'>Fruit </th>
              <th class='tablehead'> Quantity </th>
              <th class='tablehead'> Price </th>
              <th class='tablehead'> Amount</th>
            </tr>
          </thead>
          <tbody>
            ${data.map(d => `
              <tr>
                <td>${d.Fruit}</td>
                <td>${d.Quantity}</td>
                <td>${d.Price}</td>
                <td>${d.Amount}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="row footeritem">
          <div class='col-4 text-left'>
            <div class='bold'>
              <span>Total Item: ${totalQuantity}</span>
            </div>
          </div>
          <div class='col-8 text-right'>
            <div class="total">
              <span class="bold">Total: $ ${parseFloat(totalAmount).toFixed(2)}</span>
            </div>
          </div>
        </div>
        <hr class='border' />
        <div class="center">Thank you for your purchase!</div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  
      // Calculate the total quantity
      const totalQuantity =data.reduce((total, customer) => 
        total + (customer.Quantity || 0), 0);



      // parchase / sale 
      const [isChecked, setIsChecked] = useState(false);
      const [orderType, setOrderType] = useState('Sale'); // Default state
    
      const handleToggle = () => {
        setIsChecked(!isChecked);
        setOrderType(!isChecked ? 'Purchase' : 'Sale'); // Update the order type based on the toggle
      };


        // Subtract CommTableTotal from totalAmount
  const finalAmount = (totalAmount - values.CommTableTotal).toFixed(2);

  return (
    <>
      <div className='row'>
        {/* col- 1 */}
        <div className='col-8 border-end pe-3 border-3'>
          <div className='row'>
            <div className='col-12'>
            <div className="row pt-2 pb-1">
              <div className="col-6">
                <h3 className='mb-0'>Customer Info</h3>
              </div>
              <div className="col-6 text-end">
  <div>
    <h5 className='mb-0'>
      Order Id: 
      <span className="rounded text-dark fw-bold fs-4 text-secondary px-3 border mx-1">
      {orderId || "No Order ID"}
      </span>
    </h5>
  </div>
</div>

            </div>
            </div>
          </div>
          <div className='row border border-2 rounded pt-0 mt-0'>
              <div className='col-6 '>
              <span className=' fw-bold col-8 fs-5 ps-6 text-end pe-0'><i className="bi bi-person-bounding-box px-2"></i><span className='fw-bold pt-1'>Name : </span><span className='text-secondary fw-bold fs-5'>{formData.name.toUpperCase()} </span></span>
              </div>
              <div className='col-6 text-center'>
                <span className='row'>
                <span className=' fw-bold col-8 fs-5 ps-6 text-end pe-0'><i className="bi bi-telephone-fill px-2"></i>Phone : <span className='text-dark pe-1'>+91</span></span><span className='text-secondary fw-bold fs-5 col-4 text-start ps-0'>{formData.mobile} <span className=''></span></span>
                </span>
              </div>
            </div>


    
 

          <form onSubmit={handleSubmit} className='px-1'>
                                      <div className='row  m-0'>
                            <div className="form-group col-4 m-0">
                                <label htmlFor="name" className='mb-0'>Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange} 
                                     className='p-1 m-0'
                                    required
                                />
                            </div>
                            <div className="form-group col-4 m-0">
                                <label htmlFor="mobile" className='mb-0'>Mobile Number</label>
                                <input
  type="text"
  id="mobile"
  name="mobile"
  value={formData.mobile}
  onChange={handleChange}
  onInput={(e) => {
    // Limit input to 12 characters
    if (e.target.value.length > 12) {
      e.target.value = e.target.value.slice(0, 12);
    }
    // Optionally, trigger change handler after restricting length
    handleChange(e);
  }}
  className='p-1 m-0'
  required
  pattern="\d*"
/>

                            </div>


 

      {/* Conditionally render the input box */}

        <div className='col-4 mx-auto px-4'>
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Order Type
        </label>
  
        <div className="form-check form-switch my-auto pt-1">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="flexSwitchCheckDefault" 
            checked={isChecked}
            onChange={handleToggle}
          />
  
          <span className='fw-bold'>
            {isChecked ? 'Purchase Order' : 'Sale Order'}
          </span>
        </div>
        </div>
  


                            </div>
  <div className="row pt-0 mx-auto">
    <div className="col-4 ">
      <label htmlFor="Fruit" className="">
        Category List <span className="text-danger">*</span>
      </label>
      <select
        className="form-select"
        id="Fruit"
        name="Fruit"
        value={values.Fruit}
        onChange={handleInputChange}
        required
      >
        <option value="">Category</option>
        <option value="Banana">Banana</option>
        <option value="Apple">Apple</option>
        <option value="Cherry">Cherry</option>
        <option value="Grape">Grape</option>
        <option value="Kiwi">Kiwi</option>
        <option value="Strawberry">Strawberry</option>
        <option value="Mango">Mango</option>
        <option value="Orange">Orange</option>
      </select>
    </div>
    <div className="col-3">
      <div className="form-outline">
        <label htmlFor="Quantity" className="">
          Quantity <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          id="Quantity"
          name="Quantity"
          className="form-control"
          value={values.Quantity}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
    <div className="col-3">
      <div className="form-outline">
        <label htmlFor="Price" className="">
          Price <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          id="Price"
          name="Price"
          className="form-control"
          value={values.Price}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
    <div className="col-2 text-end">
      <div className="p-1"></div>
      <button type="submit" className="btn btn-success w-75 m-0 my-3 p-1">ADD +</button>
    </div>
  </div>
</form>



          {/* ... (rest of your JSX) ... */}
          <div className="row bg-warning rounded ">
            <div className="col-3 my-auto pt-1">
              <h3>Add Item</h3>
            </div>
            <div className="col-3"></div>
            <div className="col-4 my-auto pt-2 text-end pe-0">
              <h6>Total Item <span className='border border-4 border-white px-3 rounded bg-white'>{totalQuantity}</span></h6>
            </div>
            <div className="col-2  my-auto text-end pe-0 ">
              <button onClick={clearData} className='border border-danger bg-danger'>Clear All</button>
            </div>
          </div>

          <div className="scrollable-table-container">
            {data.length === 0 ?
              <div className=''>
                <div className='py-5'></div>
                <div className='mx-auto text-center '>
                  <span className=''><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-bag-plus-fill text-secondary" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z" />
                  </svg></span>
                  <h4 className='fs-3 text-secondary'>Add Item</h4>
                </div>
              </div>
              :
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col" className='text-center'>Fruit</th>
                    <th scope="col" className='text-center'>Quantity</th>
                    <th scope="col" className='text-center'>Price</th>
                    {/* <th scope="col" className='text-center'>Amount</th> */}
                    <th scope="col" className='text-center'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {data.map((d) => (
  <tr scope="row" key={d.id}> {/* Ensure 'id' matches your data field */}
    <td className='text-center'>{d.Fruit}</td>
    <td className='text-center'>{d.Quantity}</td>
    <td className='text-center'>{d.Price}</td>
    <td className='text-center'>
      <i onClick={(e) => handleDelete(d.id, e)} className="bi bi-trash3 text-danger"></i> {/* Ensure 'id' matches your data field */}
    </td>
  </tr>
))}

                </tbody>
              </table>
            }
          </div>

          {/* commisstion */}
          {isChecked && (
          <div className='row p-0 pb-2 mt-3 border-4 border-top '>
  <form>
    <div className="form-row row p-0">
      <div className="form-group col-2 p-0 m-0 px-1">
        <label htmlFor="comm" className='fw-bold'>Commission</label>
        <input
          type="text"
          className="form-control p-1"
          id="comm"
          name="Comm"
          placeholder="Commission"
          value={values.Comm}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group col-2 p-0 m-0 px-1">
        <label htmlFor="lorry" className='fw-bold'>Lorry Rent</label>
        <input
          type="text"
          className="form-control p-1"
          id="lorry"
          name="LorryRent"
          placeholder="Lorry Rent"
          value={values.LorryRent}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group col-2 p-0 m-0 px-1">
        <label htmlFor="cooly" className='fw-bold'>Cooly</label>
        <input
          type="text"
          className="form-control p-1"
          id="cooly"
          name="Cooly"
          placeholder="Cooly"
          value={values.Cooly}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group col-2 p-0 m-0 px-1">
        <label htmlFor="notecash" className='fw-bold'>Note Cash</label>
        <input
          type="text"
          className="form-control p-1"
          id="notecash"
          name="NoteCash"
          placeholder="Note Cash"
          value={values.NoteCash}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='col-4 py-auto text-center'>
        <p className='fs-5 fw-bold my-4 pt-1'>CLCN Total<span>: {values.CommTableTotal}</span></p>
      </div>
    </div>
  </form>
</div>

)}









        </div>

        {/* col -2 */}
        <div className='col-4 p-0'>

              <div className="">
              <div style={{ fontFamily: 'monospace', width: '100mm', margin: 'auto', padding: '10px' }}>
      {/* Invoice Header */}
      <div style={{ marginBottom: '5px', borderBottom: '1px solid black', paddingBottom: '2px' }} className='row'>
        <p style={{ fontSize: '14px' }} className='col-6'>
          Invoice <strong>ID: {orderId}</strong>
        </p>
        <p style={{ fontSize: '14px' }} className='col-6'>
          Order Type <strong>: {orderType}</strong>
        </p>

      </div>

      {/* Store Information */}
      <div style={{ textAlign: 'center', marginBottom: '5px' }}>
        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>MSR.com</p>
      </div>

      {/* Customer Details */}
      <div style={{ marginBottom: '5px', borderBottom: '1px solid black', paddingBottom: '5px' }} className='row'>
        <div className='col-6'>
        <p style={{ fontSize: '12px' }}>To: <span className='fw-bold'>{formData.name.toUpperCase()}</span></p>
        <p style={{ fontSize: '12px' }}>Phone: <span className='fw-bold'>{formData.mobile}</span></p>
        <p style={{ fontSize: '12px' }}>
          Items: {totalQuantity}
        </p>
        </div>
        <div className='col-6'>
        <p style={{ fontSize: '12px' }} className=''>Status: <span className='fw-bold'>{status}</span></p>
        <div>
          <label style={{ fontSize: '12px' }}>
            <input type="radio" value="Unpaid" checked={status === 'Unpaid'} onChange={handleStatusChange} /> Unpaid
          </label>
          <label style={{ fontSize: '12px', marginLeft: '10px' }}>
            <input type="radio" value="Paid" checked={status === 'Paid'} onChange={handleStatusChange} /> Paid
          </label>
        </div>
        </div>
      </div>

      {/* Order Items Table */}
      <div style={{ marginBottom: '5px', borderBottom: '1px solid black', paddingBottom: '5px' ,maxHeight:'700px',overflowY:'auto',height:'323px'}}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ 
    position: 'sticky', 
    top: 0, 
    backgroundColor: '#f1f1f1', 
    zIndex: 1 
  }}>
            <tr>
              <th style={{ borderBottom: '1px solid black', fontSize: '12px' }}>Fruit</th>
              <th style={{ borderBottom: '1px solid black', fontSize: '12px' }}>Qty</th>
              <th style={{ borderBottom: '1px solid black', fontSize: '12px' }}>Price</th>
              {/* <th style={{ borderBottom: '1px solid black', fontSize: '12px' }}>Amount</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ fontSize: '12px' }}>{item.Fruit}</td>
                <td style={{ fontSize: '12px' }}>{item.Quantity}</td>
                <td style={{ fontSize: '12px' }}>{item.Price}</td>
                {/* <td style={{ fontSize: '12px' }}>{item.Amount}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='row'>
      {isChecked && (
        <div className='col-6'>
          <p  style={{ fontSize: '12px', margin: '0px' }}>Commission <span className='fw-bold'>: {values.Comm}</span></p>
          <p  style={{ fontSize: '12px', margin: '0px'  }}>Lorry Rent <span className='fw-bold'>: {values.LorryRent}</span></p>
          <p  style={{ fontSize: '12px', margin: '0px'  }}>Cooly <span className='fw-bold'>: {values.Cooly}</span></p>
          <p  style={{ fontSize: '12px' , margin: '0px' }}>Note Cash <span className='fw-bold'>: {values.NoteCash}</span></p>
          <p  style={{ fontSize: '12px', fontWeight: 'bold' }}>CLCN Total <span className='fw-bold'>: {values.CommTableTotal}</span></p>
        </div>
      )}
        <div className='col-6'>
      {/* Total Items and Amount */}
      <div style={{ marginBottom: '5px' }}>
        {/* <p style={{ fontSize: '12px' }}>
          Items: {totalQuantity}
        </p> */}
        <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
          Item Amount:$ {parseFloat(totalAmount).toFixed(2)}
        </p>
        <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
          CLCN Amount:$ {values.CommTableTotal}
        </p>
        <p style={{ fontSize: '12px', fontWeight: 'bold' }}>
        <span>Total Amount:$ {finalAmount}</span>
        </p>
      </div>
        </div>
      </div>



      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '5px', fontSize: '12px' }} className='row gap-2 mx-auto ms-4 ps-2'> 
  <button onClick={handlePrint} disabled={isSaved} style={{ width: '25mm', padding: '5px' }} className='col-4 bg-primary'>
    Print
  </button>
  <button onClick={handleSave} style={{ width: '25mm', padding: '5px' }} className='col-4 bg-warning' disabled={isSaving}>
    {isSaving ? 'Saving...' : 'Save'}
  </button>
  <button onClick={handleClick} disabled={isSaved} style={{ width: '25mm', padding: '5px' }} className='col-4 bg-danger'>
    Submit
  </button>
</div>


      {popupVisible && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '10px', border: '1px solid #000' }}>
          <h2>{popupData?.message}</h2>
        </div>
      )}

      <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '5px' }}>
        <p>Thank you for your purchase!</p>
      </div>
    </div>


</div>









        </div>
      </div>
    </>
  );
}

export default BodyLeft;

