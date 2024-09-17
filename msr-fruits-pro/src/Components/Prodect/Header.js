import React from "react";
import Logo from "../../assets/img/Login/login logo 2.png"
function Header(){
    return(
        <>
        <div className="row p-0 py-2 m-0  border-bottom border-4">
            <div className="col-3 p-0">
                <img src={Logo} alt="Logo" className="w-25" /><span className="fw-bold fs-4">Fruits</span>
            </div>
            <div className="col-9">

            </div>
        </div>
        </>
    )
}
export default Header