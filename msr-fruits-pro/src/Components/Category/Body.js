import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Exotic from '../../assets/img/Category/exotic.png';
import Dried from '../../assets/img/Category/dried.png'
import Citrus from '../../assets/img/Category/citrus-fruits.png'
import Berry from '../../assets/img/Category/Berry.png'
import Tropical from '../../assets/img/Category/tropical.png'
import Stone from '../../assets/img/Category/stone.jpg'
import Melon from '../../assets/img/Category/melon.png'
function Body() {
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({ name: '', mobile: '' });
    const [randomNumber, setRandomNumber] = useState(null);
    const [submit, setSubmit] = useState(false); // New state to trigger navigation
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // setShowPopup(true);
        navigate('/pos')
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 900) + 100;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Generate random number and set it
        const number = generateRandomNumber();
        setRandomNumber(number);
        console.log('Generated Random Number:', number);

        // Set submit to true to trigger navigation
        setSubmit(true);
        handleClosePopup();
    };

    useEffect(() => {
        if (submit && randomNumber !== null) {
            // Navigate to Product page after form submission
            navigate('/Prodect', { state: { ...formData, randomNumber } });
            setSubmit(false); // Reset submit state
        }
    }, [submit, randomNumber, navigate, formData]);

    return (
        <>
            <div className="col-9">
            <div className="py-4"></div>
                <div className="">
                    <div className="row justify-content-center ">
                        {/* Other buttons */}
                        <div className="col-md-6 col-lg-3 col-3">
                            <button type="button" className="category" onClick={handleButtonClick}>
                                <div className="card report-card p-2 px-3 cat-card">
                                    <div className="card-body exotic p-1">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col">
                                                <p className="text-dark mb-0 fw-semibold py-3"></p>
                                                <h3 className="m-0 border border-3 px-1 rounded name">Exotic Fruits</h3>
                                                <p className="mb-0 text-truncate text-muted">
                                                    <span className="text-success"><i className="mdi mdi-trending-up"></i>10.5%</span> Completions Weekly
                                                </p>
                                            </div>
                                            <div className="col-auto align-self-center">
                                                <div className="report-main-icon bg-light-alt">
                                                    <img src={Exotic} alt="Exotic" className="w-25" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="col-md-6 col-lg-3 col-3">
                            <button type="button" className="category" onClick={handleButtonClick}>
                                <div className="card report-card p-2 px-3 cat-card">
                                    <div className="card-body dried p-1">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col">
                                                <p className="text-dark mb-0 fw-semibold py-3"></p>
                                                <h3 className="m-0 border border-3 px-1 rounded name">Dried Fruits</h3>
                                                <p className="mb-0 text-truncate text-muted">
                                                    <span className="text-success"><i className="mdi mdi-trending-up"></i>10.5%</span> Completions Weekly
                                                </p>
                                            </div>
                                            <div className="col-auto align-self-center">
                                                <div className="report-main-icon bg-light-alt">
                                                    <img src={Dried} alt="Exotic" className="w-25" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="col-md-6 col-lg-3 col-3 ">
                            <button type="button" className="category" onClick={handleButtonClick}>
                                <div className="card report-card p-2 px-3 cat-card">
                                    <div className="card-body citrus p-1">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col">
                                                <p className="text-dark mb-0 fw-semibold py-3"></p>
                                                <h3 className="m-0 border border-3 px-1 rounded name">Citrus Fruits</h3>
                                                <p className="mb-0 text-truncate text-muted">
                                                    <span className="text-success"><i className="mdi mdi-trending-up"></i>10.5%</span> Completions Weekly
                                                </p>
                                            </div>
                                            <div className="col-auto align-self-center">
                                                <div className="report-main-icon bg-light-alt">
                                                    <img src={Citrus} alt="Exotic" className="w-25" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="col-md-6 col-lg-3 col-3">
                            <button type="button" className="category" onClick={handleButtonClick}>
                                <div className="card report-card p-2 px-3 cat-card">
                                    <div className="card-body berry p-1">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col">
                                                <p className="text-dark mb-0 fw-semibold py-3"></p>
                                                <h3 className="m-0 border border-3 px-1 rounded name">Berry Fruits</h3>
                                                <p className="mb-0 text-truncate text-muted">
                                                    <span className="text-success"><i className="mdi mdi-trending-up"></i>10.5%</span> Completions Weekly
                                                </p>
                                            </div>
                                            <div className="col-auto align-self-center">
                                                <div className="report-main-icon bg-light-alt">
                                                    <img src={Berry} alt="Exotic" className="w-25" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="col-md-6 col-lg-3 col-3">
                            <button type="button" className="category" onClick={handleButtonClick}>
                                <div className="card report-card p-2 px-3 cat-card">
                                    <div className="card-body tropical p-1">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col">
                                                <p className="text-dark mb-0 fw-semibold py-3"></p>
                                                <h3 className="m-0 border border-3 px-1 rounded name">Tropical Fruits</h3>
                                                <p className="mb-0 text-truncate text-muted">
                                                    <span className="text-success"><i className="mdi mdi-trending-up"></i>10.5%</span> Completions Weekly
                                                </p>
                                            </div>
                                            <div className="col-auto align-self-center">
                                                <div className="report-main-icon bg-light-alt">
                                                    <img src={Tropical} alt="Exotic" className="w-25" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="col-md-6 col-lg-3 col-3">
                            <button type="button" className="category" onClick={handleButtonClick}>
                                <div className="card report-card p-2 px-3 cat-card">
                                    <div className="card-body stone p-1">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col">
                                                <p className="text-dark mb-0 fw-semibold py-3"></p>
                                                <h3 className="m-0 border border-3 px-1 rounded name">Stone Fruits</h3>
                                                <p className="mb-0 text-truncate text-muted">
                                                    <span className="text-success"><i className="mdi mdi-trending-up"></i>10.5%</span> Completions Weekly
                                                </p>
                                            </div>
                                            <div className="col-auto align-self-center">
                                                <div className="report-main-icon bg-light-alt">
                                                    <img src={Stone} alt="Exotic" className="w-25" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="col-md-6 col-lg-3 col-3">
                            <button type="button" className="category" onClick={handleButtonClick}>
                                <div className="card report-card p-2 px-3 cat-card">
                                    <div className="card-body melons p-1">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col">
                                                <p className="text-dark mb-0 fw-semibold py-3"></p>
                                                <h3 className="m-0 border border-3 px-1 rounded name">Melon Fruits</h3>
                                                <p className="mb-0 text-truncate text-muted">
                                                    <span className="text-success"><i className="mdi mdi-trending-up"></i>10.5%</span> Completions Weekly
                                                </p>
                                            </div>
                                            <div className="col-auto align-self-center">
                                                <div className="report-main-icon bg-light-alt">
                                                    <img src={Melon} alt="Exotic" className="w-25" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="col-md-6 col-lg-3 col-3">
                            <button type="button" className="category" onClick={handleButtonClick}>
                                <div className="card report-card p-2 px-3 cat-card">
                                    <div className="card-body exotic p-1 py-2">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col">
                                                <p className="text-dark mb-0 fw-semibold py-3"></p>
                                                <h3 className="m-0 border border-3 px-1 rounded name">Exotic Fruits</h3>
                                                <p className="mb-0 text-truncate text-muted">
                                                    <span className="text-success"><i className="mdi mdi-trending-up"></i>10.5%</span> Completions Weekly
                                                </p>
                                            </div>
                                            <div className="col-auto align-self-center">
                                                <div className="report-main-icon bg-light-alt">
                                                    <img src={Exotic} alt="Exotic" className="w-25" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>




                    </div>
                </div>
            </div>


            {/* Popup Form */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-btn text-dark fw-bold" onClick={handleClosePopup}>×</button>
                        <h3>Enter Customer Details</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange} 
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile">Mobile Number</label>
                                <input
                                    type="number"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                        {randomNumber !== null && (
                            <div className="random-number">
                                <p>Random Number: {randomNumber}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Body;
