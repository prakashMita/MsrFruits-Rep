import React, { useState } from 'react';
import Button from '../../assets/js/Dashleft'; 
import '../../assets/style/DashLeftnav.css';
import Logo from "../../assets/img/Login/login logo 2.png";
import Logotext from "../../assets/img/Login/logotext-Photoroom 2.png";
import { Link, useLocation } from 'react-router-dom';

function Leftnav() {
    const [activeButton, setActiveButton] = useState('dashboard');
    const location = useLocation(); 

    const handleButtonClick = (buttonType) => {
        console.log(`Button clicked: ${buttonType}`);
        setActiveButton(buttonType);
    };

    // Update activeButton based on current location
    React.useEffect(() => {
        const path = location.pathname.substring(1); 
        setActiveButton(path);
    }, [location.pathname]);

    return (
        <div className='col-2 '>
            ni
            <header>
                <nav id="sidebarMenu" className="collapse d-lg-block sidebar leftnav bg-primary pt-0">
                    <div className="position-sticky">
                        <div className="list-group list-group-flush mx-3 mt-0 gap-3">
                            <img src={Logo} alt='logo'/>
                            <Link to='/Dashboard'>
                                <Button
                                    type={activeButton === 'Dashboard' ? 'primary' : 'default'}
                                    onClick={() => handleButtonClick('Dashboard')}
                                >
                                    <i className="bi bi-speedometer fa-fw float-start ps-3"></i><span className='pe-1'>Dashboard</span>
                                </Button>
                            </Link>
                            <Link to='/Category'>
                                <Button
                                    type={activeButton === 'Category' ? 'primary' : 'default'}
                                    onClick={() => handleButtonClick('Category')}
                                >
                                    <i className="bi bi-tags fa-fw float-start ps-3"></i><span className='pe-2'>Category</span>
                                </Button>
                            </Link>
                            <Link to='/Pos'>
                                <Button
                                    type={activeButton === 'Prodect' ? 'primary' : 'default'}
                                    onClick={() => handleButtonClick('Prodect')}
                                >
                                    <i className="bi bi-upc-scan float-start ps-3"></i><span className='pe-5'>Pos</span>
                                </Button>
                            </Link>
                            <Link to='/itemReport'>
                                <Button
                                    type={activeButton === 'Itemreport' ? 'primary' : 'default'}
                                    onClick={() => handleButtonClick('Itemreport')}
                                >
                                    <i className="bi bi-card-checklist float-start ps-3"></i><span className='ps-3'>Item Report</span>
                                </Button>
                            </Link>
                            <Link to='/CusReport'>
                                <Button
                                    type={activeButton === 'EmpManagement' ? 'primary' : 'default'}
                                    onClick={() => handleButtonClick('EmpManagement')}
                                >
                                    <i className="bi bi-person-check float-start ps-3"></i><span className='pe-2 ps-3'>Cust Report</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className='pt-5'></div>
                    <div className='pt-5'></div>
                    <div className='pt-5'></div>
                    <div className='text-center mt-5' >
                        <img src={Logotext} alt='logofooter' className='w-50'/>
                    </div>
                </nav>
                {/* <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                    <div className="container-fluid">
                     
                    </div>
                </nav> */}
            </header>
            <main style={{ marginTop: '58px' }}>
                <div className="container pt-4"></div>
            </main>
        </div>
    );
}

export default Leftnav;
