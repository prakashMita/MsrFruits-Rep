import React from "react";
import CusReportRight from "./CusReportRight";
import Leftnav from "../DashBoard/Leftnav";
function CusReport(){
    return(
        <>
<div className="row p-0 m-0 ">
        <div className="col-2">
        <Leftnav />
        </div>

       <div className="col-10">
        <div className="row">
            <div className="col-12 border-3 border-end px-3">
                <CusReportRight />
            </div>
            {/* <div className="col-3">
            <BodyRight />
            </div> */}
        </div>
       </div>

        </div>
        </>
    )
}
export default CusReport;