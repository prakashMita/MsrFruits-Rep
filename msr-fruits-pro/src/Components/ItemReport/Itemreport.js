import React from "react";
import ReportRight from "./ReportRight";
import Leftnav from "../DashBoard/Leftnav";

function Itemreport(){
    return(
        <>
    

        <div className="row p-0 m-0 ">
        <div className="col-2">
        <Leftnav />
        </div>

       <div className="col-10">



        {/* <div className="row">
            <div className="col-12 border-3 border-end px-3">
            <div className="row">
                                <div className="col-12">
                                     <h5>Total Category</h5>
                                </div>
                            
                                <div class="col-md-6 col-lg-4 col-4">
                                    <div class="card report-card">
                                        <div class="card-body ">
                                            <div class="row d-flex justify-content-center">
                                                <div class="col">
                                                    <p class="text-dark mb-0 fw-semibold">Total Sales</p>
                                                    <h3 class="m-0"><i class="bi bi-currency-rupee"></i><span className="text-warning">10000</span></h3>
                                                    <p class="mb-0 text-truncate text-muted"><span class="text-success"><i class="mdi mdi-trending-up"></i>8.5%</span> New Sessions Today</p>
                                                </div>
                                                <div class="col-auto align-self-center">
                                                    <div class="report-main-icon bg-light-alt">
                                                        <i data-feather="users" class="align-self-center text-muted icon-sm"></i>  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="col-md-6 col-lg-4 col-4">
                                    <div class="card report-card ">
                                        <div class="card-body">
                                            <div class="row d-flex justify-content-center">                                                
                                                <div class="col">
                                                    <p class="text-dark mb-0 fw-semibold">Month Sales <span className="text-info">(Aug)</span></p>
                                                    <h3 class="m-0"><i class="bi bi-currency-rupee"></i><span className="text-warning">500</span></h3>
                                                    <p class="mb-0 text-truncate text-muted"><span class="text-success"><i class="mdi mdi-trending-up"></i>1.5%</span> Weekly Avg.Sessions</p>
                                                </div>
                                                <div class="col-auto align-self-center">
                                                    <div class="report-main-icon bg-light-alt">
                                                        <i data-feather="clock" class="align-self-center text-muted icon-sm"></i>  
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 col-4">
                                    <div class="card report-card">
                                        <div class="card-body">
                                            <div class="row d-flex justify-content-center">                                                
                                                <div class="col">
                                                    <p class="text-dark mb-0 fw-semibold">Year Sales <span className="text-info">(2024)</span></p>
                                                    <h3 class="m-0"><i class="bi bi-currency-rupee"></i><span className="text-warning">20000</span></h3>
                                                    <p class="mb-0 text-truncate text-muted"><span class="text-danger"><i class="mdi mdi-trending-down"></i>35%</span> Bounce Rate Weekly</p>
                                                </div>
                                                <div class="col-auto align-self-center">
                                                    <div class="report-main-icon bg-light-alt">
                                                        <i data-feather="activity" class="align-self-center text-muted icon-sm"></i>  
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                                </div>  


                                  row-2 


                            <div class="pt-3">
                            <div class="row justify-content-center">
                                <div class="col-md-6 col-lg-4 col-4">
                                    <div class="card report-card">
                                        <div class="card-body ">
                                            <div class="row d-flex justify-content-center">
                                                <div class="col">
                                                    <p class="text-dark mb-0 fw-semibold">Total Order</p>
                                                    <h3 class="m-0"><i class="bi bi-handbag"></i> <span className="text-warning">900</span></h3>
                                                    <p class="mb-0 text-truncate text-muted"><span class="text-success"><i class="mdi mdi-trending-up"></i>8.5%</span> New Sessions Today</p>
                                                </div>
                                                <div class="col-auto align-self-center">
                                                    <div class="report-main-icon bg-light-alt">
                                                        <i data-feather="users" class="align-self-center text-muted icon-sm"></i>  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="col-md-6 col-lg-4 col-4">
                                    <div class="card report-card ">
                                        <div class="card-body">
                                            <div class="row d-flex justify-content-center">                                                
                                                <div class="col">
                                                    <p class="text-dark mb-0 fw-semibold">Month Order <span className="text-info">(Aug)</span></p>
                                                    <h3 class="m-0"><i class="bi bi-handbag"></i> <span className="text-warning">500</span></h3>
                                                    <p class="mb-0 text-truncate text-muted"><span class="text-success"><i class="mdi mdi-trending-up"></i>1.5%</span> Weekly Avg.Sessions</p>
                                                </div>
                                                <div class="col-auto align-self-center">
                                                    <div class="report-main-icon bg-light-alt">
                                                        <i data-feather="clock" class="align-self-center text-muted icon-sm"></i>  
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4 col-4">
                                    <div class="card report-card">
                                        <div class="card-body">
                                            <div class="row d-flex justify-content-center">                                                
                                                <div class="col">
                                                    <p class="text-dark mb-0 fw-semibold">Year Order <span className="text-info">(2024)</span></p>
                                                    <h3 class="m-0"><i class="bi bi-handbag"></i> <span className="text-warning">20000</span></h3>
                                                    <p class="mb-0 text-truncate text-muted"><span class="text-danger"><i class="mdi mdi-trending-down"></i>35%</span> Bounce Rate Weekly</p>
                                                </div>
                                                <div class="col-auto align-self-center">
                                                    <div class="report-main-icon bg-light-alt">
                                                        <i data-feather="activity" class="align-self-center text-muted icon-sm"></i>  
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>  

                            </div>
                            </div> */}

                            
            <ReportRight/>
            </div>
            {/* <div className="col-3">
            <BodyRight />
            </div> */}
        </div>

        </>
    )
}
export default Itemreport;