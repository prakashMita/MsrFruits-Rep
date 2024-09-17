import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from "../../assets/img/Login/login logo 2.png";
import Logotext from "../../assets/img/Login/logotext-Photoroom 2.png";

function Login() {
  const navigate = useNavigate();

  // Hardcoded correct credentials for demonstration purposes
  const correctUsername = "admin";
  const correctPassword = "admin";

  const [values, setValues] = useState({
    visitorEmail: '',
    visitorPassword: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate if the entered credentials are correct
    if (values.visitorEmail === correctUsername && values.visitorPassword === correctPassword) {
      console.log('Login successful');
      navigate('/Dashboard'); // Navigate to the dashboard on successful login
    } else {
      alert('Incorrect username or password'); // Show an alert if credentials are wrong
    }
  };

  return (
    <>
      <div className="login-wrapper d-flex align-items-center justify-content-center text-center bg-white h-100">
        <div className="background-shape"></div>
        <div className="h-100 w-50 pt-1">
          <div className="row justify-content-center pt-3">
            <div className="col-10 col-lg-8">
              <img className="big-logo w-50" src={Logo} alt="logo" />
              <div className='pt-0'>
                <img className="big-logo-title w-25 h-25" src={Logotext} alt="logotext" />
              </div>
              <div className="register-form border-dark p-3 border-5 rounded-5 pt-5">
                <form onSubmit={handleSubmit}>
                  <div className="form-group text-start mb-4">
                    <span>Username</span>
                    <label htmlFor="username"><i className="bi bi-person-circle text-secondary ps-2"></i></label>
                    <input
                      className="form-control my-3"
                      id="username"
                      name="visitorEmail"
                      type="text"
                      value={values.visitorEmail}
                      onChange={handleChange}
                      placeholder="Mita"
                      required
                    />
                  </div>
                  <div className="form-group text-start mb-4">
                    <span>Password</span>
                    <label htmlFor="password"><i className="bi bi-key text-secondary ps-2"></i></label>
                    <input
                      className="form-control my-3"
                      id="password"
                      name="visitorPassword"
                      type="password"
                      value={values.visitorPassword}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      required
                    />
                  </div>
                  <button className="btn btn-lg w-50 border border-5 rounded-5 text-dark mt-2" type="submit">
                    Log In
                  </button>
                </form>
              </div>
              {/* <div className="login-meta-data pb-2">
                <a className="forgot-password d-block mt-3 mb-1" href="#">Forgot Password?</a>
                <p className="mb-0">Don't have an account?<a className="mx-1" href="#">Register Now</a></p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
