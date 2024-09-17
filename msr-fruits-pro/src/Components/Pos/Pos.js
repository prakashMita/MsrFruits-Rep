import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Leftnav from "../DashBoard/Leftnav";
import axios from 'axios';  
import PosRight from '../Pos/PosRight'

function Pos() {
  const [randomNumber, setRandomNumber] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Clear localStorage when the component mounts
    localStorage.removeItem('formData');
    localStorage.removeItem('values');
  }, []); // Empty dependency array means this runs once on mount

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 900) + 100;
  };

  const NameNumSubmit = (e) => {
    e.preventDefault();
    const number = generateRandomNumber();
    setRandomNumber(number);
    console.log("Generated Random Number:", number);
  
    // Navigate to Bodyleft component with the generated random number as state
    navigate("/Prodect", { state: { orderId: number,name:'',mobile:'' } });




          axios.delete('http://localhost:8081/prodects')
            .then(() => {
    

            })
            .catch(err => {
              console.error('There was an error deleting the data!', err);
            })
            .finally(() => {
    
     
            });










  };


  return (
    <>
      <div className="m-0 p-0">
        <div className="row m-0">
          <div className="col-2 p-0 m-0">
            <Leftnav />
          </div>
          <div className="col-10">
            {/* Display Order ID */}
            {/* <h5>
              Order Id:
              <span className="rounded text-dark fw-bold fs-4 text-secondary px-3 border mx-1">
                {randomNumber || "?"}
              </span>
            </h5> */}

            {/* Add customer */}
            <div className="row bg-light mx-auto me-3 mt-3 rounded border border-3">
              <div className="col-6 my-auto">
                <h4>Add New Customer</h4>
              </div>
              <div className="col-6 text-end pe-0">
                <button type="button" onClick={NameNumSubmit}>
                  NEW CUSTOMER +
                </button>
              </div>
            </div>

    
            {/* <div className="row mt-3 mx-auto">
              <div className="col-12">
                <h4>All Customer List</h4>
              </div>
              <div className="h-100 border">
                <p>customer 1</p>
              
              </div>
            </div> */}


        <div className="row">
            <div className="col-12 border-3 border-end px-3">
                <PosRight />
            </div>
            {/* <div className="col-3">
            <BodyRight />
            </div> */}
        </div>
   









          </div>
        </div>
      </div>
    </>
  );
}

export default Pos;
