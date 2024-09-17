import React from "react";
import Leftnav from "./Leftnav";
import Body from "./Body";
import Header from "../Prodect/Header";

function DashBoard(){
    return(
        <>
        <div className="row container">
        <Leftnav />
        <Body />
        </div>
        </>
    )
}
export default DashBoard