import React from "react";
import Leftnav from "../DashBoard/Leftnav";
import Body from "./Body";
function Category(){
    return(
        <>
        <div className="row container">
         <div className="col-3">
        <Leftnav />
        </div>
        <Body />
        </div>
        </>
    )
}
export default Category