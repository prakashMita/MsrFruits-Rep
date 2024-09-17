import React from "react";
import BodyLeft from "./BodyLeft";
import BodyRight from "./BodyRight";
// import Header from "./Header";
import Leftnav from "../DashBoard/Leftnav";

function Body(){
    return(
        <>
<div className="pt-0">
        <div className="row p-0 m-0 ">
        <div className="col-2">
        <Leftnav />
        </div>

       <div className="col-10">
        <div className="row">
            <div className="col-12 border-3 border-end px-3">
                <BodyLeft />
            </div>
            {/* <div className="col-3">
            <BodyRight />
            </div> */}
        </div>
       </div>

        </div>
        </div>
        </>
    )
}
export default Body