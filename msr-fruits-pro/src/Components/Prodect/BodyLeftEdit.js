import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/style/Prodect.css';
import { Icon } from '@iconify/react';
import addCircleOutline from '@iconify/icons-ion/add-circle-outline';

function BodyLeftEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { customerData, selectedOrderData } = location.state || {};

  const [formData, setFormData] = useState({
    OrderId: '',
    UserName: '',
    UserMobile: '',
  });

  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (customerData) {
      setFormData({
        OrderId: customerData.OrderId || '',
        UserName: customerData.UserName || '',
        UserMobile: customerData.UserMobile || '',
      });
    }
    if (selectedOrderData) {
      console.log('Selected Order Data:', selectedOrderData); // Verify data here
      setOrderItems(selectedOrderData);
    }
  }, [customerData, selectedOrderData]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOrderChange = (index, field, value) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index] = { ...newOrderItems[index], [field]: value };
    setOrderItems(newOrderItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/customerlist/${formData.OrderId}`, {
        ...formData,
        orderItems
      });
      alert('Order updated successfully.');
      navigate('/posright');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update the order.');
    }
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    Fruit: '',
    Quantity: '',
    Price: '',
    Amount: '',
    TotalAmount: '',
    OrderId:'',
  });

  useEffect(() => {
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

      if (inputName === 'Quantity' || inputName === 'Price') {
        const quantity = parseFloat(newValues.Quantity) || 0;
        const price = parseFloat(newValues.Price) || 0;
        newValues.Amount = (quantity * price).toFixed(2);
      }

      return newValues;
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
      OrderID: '',
    });
    localStorage.removeItem('formData');
    localStorage.removeItem('values');
  };

  const handleSave = () => {
    const fruit = values.Fruit;
    const quantity = values.Quantity;
    const price = values.Price;
    const amount = values.Amount;
  
    // Validate that none of these fields are null or empty
    if (!fruit || !quantity || !price || !amount) {
      alert("Please fill out all required fields.");
      return;
    }
  
    if (!formData.OrderId || !formData.UserName || !formData.UserMobile) {
      alert("Order ID, customer name, and mobile number are required.");
      return;
    }
  
    storeCustomerAndTableData(fruit, quantity, price, amount);
  };
  
  const storeCustomerAndTableData = async (fruit, quantity, price, amount) => {
    try {
      // Assuming you are sending this data to update an existing order
      await axios.put(`http://localhost:8081/customerlist/${formData.OrderId}`, {
        OrderId: formData.OrderId,
        UserName: formData.UserName,
        UserMobile: formData.UserMobile,
        orderItems: orderItems.map(item => ({
          ...item,
          Fruit: item.Fruit || '', // Ensure Fruit is not NULL
          Quantity: item.Quantity || 0, // Ensure Quantity is not NULL
          Price: item.Price || 0, // Ensure Price is not NULL
          Amount: item.Amount || 0 // Ensure Amount is not NULL
        })),
      });
      alert('Product added successfully');
    } catch (error) {
      console.error("Error storing customer and table data:", error);
      alert("Error saving the data. Please try again.");
    }
  };
  

  // Calculate total amount
  const totalAmount = data.reduce((total, item) => total + parseFloat(item.Amount || 0), 0).toFixed(2);
  useEffect(() => {
    if (selectedOrderData) {
      console.log('Selected Order Data:', selectedOrderData);
      setOrderItems(selectedOrderData);
    }
  }, [selectedOrderData]);




  const transformOrderItems = (items) => {
    return items.map(item => ({
      ...item,
      Fruit: item.Fruit || '',
      Quantity: item.Quantity || 0,
      Price: item.Price || 0,
      Amount: item.Amount || 0
    }));
  };
  
  // Use this function to set order items
  setOrderItems(transformOrderItems(selectedOrderData));
  localStorage.removeItem('formData');
localStorage.removeItem('values');

  return (


    <div className="body-left-edit">
    <form onSubmit={handleSubmit}>
      <div>
        <label>Order ID:</label>
        <input type="text" name="OrderId" value={formData.OrderId} onChange={handleChange} />
      </div>
      <div>
        <label>User Name:</label>
        <input type="text" name="UserName" value={formData.UserName} onChange={handleChange} />
      </div>
      <div>
        <label>User Mobile:</label>
        <input type="text" name="UserMobile" value={formData.UserMobile} onChange={handleChange} />
      </div>


        {/* Form fields */}
    
  
      <h2>Order Items</h2>
      <table>
  <thead>
    <tr>
      <th>Fruit</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {orderItems.length === 0 ? (
      <tr>
        <td colSpan="4">No order items available</td>
      </tr>
    ) : (
      orderItems.map((item, index) => (
        <tr key={index}>
          <td>{item.Fruit || 'N/A'}</td>
          <td>{item.Quantity || 'N/A'}</td>
          <td>{item.Price || 'N/A'}</td>
          <td>{item.Amount || 'N/A'}</td>
        </tr>
      ))
    )}
  </tbody>
</table>

      <button type="submit">Update Order</button>
      </form>
    </div>
  );
}

export default BodyLeftEdit;
