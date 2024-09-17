import React, { useState, useEffect } from 'react';
import '../../assets/style/Invoice.css';
import '../../assets/style/print.css'; // Import the print styles
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Invoice() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tableData, customerName, orderId, phone, totalAmount, totalItem } = location.state || {};

  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [status, setStatus] = useState('Unpaid'); // Default status

  useEffect(() => {
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(now);
    const formattedTime = now.toLocaleTimeString();

    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.delete('http://localhost:8081/prodects')
      .then(response => {
        console.log('Data deleted successfully:', response.data);
        navigate('/Category'); // Navigate to Category.js page
      })
      .catch(error => {
        console.error('There was an error deleting the data!', error);
      });
  };


  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            width: 300px; /* Typical width for thermal printers */
            margin: 0;
            padding: 0;
            font-size: 12px;
          }
          .center {
            text-align: center;
          }
          .bold {
            font-weight: bold;
          }
          .text-right {
            text-align: right;
          }
          .text-left {
            text-align: left;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
          }
          .table th, .table td {
            border: 1px solid #000;
            padding: 5px;
            text-align: center;
          }
          .table th {
            background-color: #f2f2f2;
          }
          .row {
            display: flex;
            justify-content: space-between;
          }
          .col-6 {
            flex: 1;
            margin: 0 5px;
          }
            .footeritem{
            padding-top:12px;
            }
            .total{
            font-size: 18px;
            }
            .comtitle{
            font-size: 18px;
            }
        </style>
      </head>
      <body>
        <div class="center bold comtitle">MSR.com</div>
        <hr />
        <div class="row">
          <div class="col-6 text-left">
            <div>Invoice ID: ${orderId}</div>
            <div>Customer: ${customerName}</div>
            <div>Phone: ${phone}</div>
          </div>
          <div class="col-1"></div>
          <div class="col-5 text-left">
            <div>Date: ${currentDate}</div>
            <div>Time: ${currentTime}</div>
            <div>Status: ${status}</div>
          </div>
        </div>
        <hr />
        <table class="table">
          <thead>
            <tr>
              <th>Fruit</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${tableData.map(d => `
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
        <span>Total Item : ${totalItem}</span>
        </div>
        </div>
        <div class='col-8 text-right'>
 <div class="total">
        <span class="bold">Total: $ ${parseFloat(totalAmount).toFixed(2)}</span>
        </div>
        </div>
        </div>
       
        <hr />
        <div class="center">Thank you for your purchase!</div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return ( 

    <div className="container printable-area mx-auto">
<div className="card border border-3 ">
  <div className="card-body">
    <div className="container mb-2 mt-3">
      <div className="row d-flex align-items-baseline mx-5">
        <div className="col-6">
          <p style={{ color: '#7e8d9f', fontSize: '20px' }}>
            Invoice <span></span> <strong>ID: {orderId}</strong>
          </p>
        </div>
        <div className='col-6 text-end'>
          <p style={{ color: '#7e8d9f', fontSize: '20px' }}>
            Name : <span></span> <strong>{customerName}</strong>
          </p>
        </div>
        <hr />
      </div>

      <div className="container ">
        <div className=" text-center w-25 mx-auto mb-3 py-1">
          <div className='rainbow mx-auto p-0 py-0'>
          <p className=" fs-4 fw-bold pb-0 mb-0"><span className='px-0 rounded rounded-2 text-dark'>MSR.com</span></p>
          </div>
        </div>
        <div className="row mx-auto ps-4 border border-5 py-3 rounded-5 ">
          <div className="col-4">
            <ul className="list-unstyled">
              <li className="text-muted fw-bold">To: <span style={{ color: '#5d9fc5' }}>{customerName}</span></li>
              <li className="text-muted"><i className="bi bi-telephone-fill"></i> : {phone}</li>
              <li className="text-muted"><span className='fw-bold'>Total Item : </span><span>{totalItem}</span></li>
            </ul>
          </div>
          <div className='col-3'></div>
          <div className="col-5">
            <ul className="list-unstyled">
              <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span className="fw-bold">Date: </span>{currentDate}</li>
              <li className="text-muted"><i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span className="fw-bold">Time: </span>{currentTime}</li>
              <li className="text-muted row">
                <div className='col-4'>
                <i className="fas fa-circle" style={{ color: '#84B0CA' }}></i> <span className="me-1 fw-bold">Status:</span>
                <span className={`badge ${status === 'Unpaid' ? 'bg-warning text-black' : 'bg-success text-white'} fw-bold`}>{status}</span>
                </div>
                <div className='col-7 text-start'>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="statusUnpaid"
                    value="Unpaid"
                    checked={status === 'Unpaid'}
                    onChange={handleStatusChange}
                  />
                  <label className="form-check-label" htmlFor="statusUnpaid">Unpaid</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="statusPaid"
                    value="Paid"
                    checked={status === 'Paid'}
                    onChange={handleStatusChange}
                  />
                  <label className="form-check-label" htmlFor="statusPaid">Paid</label>
                </div>
                </div>
                <div className='col-1'></div>
              </li>
            </ul>
          </div>
        </div>

        <div className="row my-2 mx-1 justify-content-center invoicetable">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" className='text-center'>Fruit</th>
                <th scope="col" className='text-center'>Quantity</th>
                <th scope="col" className='text-center'>Price</th>
                <th scope="col" className='text-center'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((d, index) => (
                <tr scope="row" key={index}>
                  <td className='text-center'>{d.Fruit}</td>
                  <td className='text-center'>{d.Quantity}</td>
                  <td className='text-center'>{d.Price}</td>
                  <td className='text-center'>{d.Amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row mb-0 mx-2">
          <div className="col-6">
            <ul className="list-unstyled">
              <li className="text-muted ms-3"><span className="text-black me-4">SubTotal</span>{totalAmount}</li>
            </ul>
          </div>
          <div className='col-6'>
            <p className="text-black float-end">
              <span className="text-black me-3 fw-bold text-muted"> Total Amount</span>
              <span style={{ fontSize:'18px' }} className='fw-bold '>$ {parseFloat(totalAmount).toFixed(2)}</span>
            </p>
          </div>
        </div>
        <hr />
      </div>
      <div className="row py-1 mb-0 mx-auto text-center footer">
        <div className="col-4 p-0">
          <button type="button" className="btn btn-primary inbtn p-0 py-1" style={{ width: "120px" }} onClick={handlePrint}>Print</button>
        </div>
        <div className="col-4 p-0">
          <button type="button" className="btn btn-warning inbtn p-0 py-1" style={{ width: "120px" }}>Save</button>
        </div>
        <div className="col-4 p-0">
          <button type="button" className="btn btn-danger inbtn py-1 p-0" style={{ width: "120px" }} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <div className='row mt-5 fw-bold'>
        <div className='col-12 text-center'>
          <p>Thank you for your purchase!</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>




  );
}

export default Invoice;
