import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../models/Header.model';
import Login from '../../models/Login.model';
import RoutingTable from '../../_models/routing-table.model';

toast.configure();

const Admin = inject('adminStore', 'componentStore', 'routingStore')(observer((props) => {
    // Variable declarations
    let componentList;

    // Local Functions

        // Toasts
        const notify_success = () => toast("Success! File Upload Complete");
        const notify_fail = () => toast("Uh oh! Something went wrong");

    // Hooks



    // Conditional Renders or Operations

    // Routing
    if (props.routingStore.getCurrentRoutes.length > 0) {
        componentList = props.componentStore.createSelectEntries();
    }

    // JSX File Uploader
    if (props.componentStore.getLoadedStatus === 100) { // If status is 100 then operation must be complete
        notify_success(); // Set a toast for the client
        setTimeout(() => { // Wait a short time then reset the upload progress bar
            props.componentStore.setLoadedStatus(0);
        }, 2000);
    }

    return (
        <div className="main-container">
            <Login />
            <Header />
            <div className="jumbo-admin jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Admin Panel</h1>
                    <p className="lead">Here you will find all the configuration options for administration of the site.</p>
                </div>
            </div>
            <div className="accordion" id="accordionExample">
                <div className="admin-card">
                    <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                        <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Routing and Navigation
                        </button>
                    </h2>
                    </div>

                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="container card-body">
                        <h2>Routing</h2>
                        <h1>*note to self*  put all these instructions in tooltips</h1>
                        <br />
                        <p>Configure static routes for the site, you can select installed components and enter the route you want them to be accessible at.  It is important to note that these are not for nav-bars that actually appear on the site, as not all pages will always appear on the nav bar.  If you wanted to create a nav bar click *here*.</p>
                        <h5>Manage Currently Configured Routes</h5>
                        <p>Click the dropdown menu under Actions to see a list of actions available for each route.</p>
                        <RoutingTable/>
                        <form method="post" action="#" id="#">
                            <h5>Add New Route To Component</h5>
                            <p>Choose a name for your route, this is required, and will not be shown to the user.  This is a name for you to know what route it is. Enter the path you wish the component to be accessible at and then select the component from the drop down list.  Don't see what you need in the pre-installed componentes?  (Click here) to see the instructions on how to upload your own components.  In general you can usually copy and paste your JSX code directly, but there are some caveats.</p>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="new-route-name">Route Name</label>
                                        <input type="text" className="form-control" id="new-route-name" aria-describedby="name-help" value={props.adminStore.getRouteName} onChange={(e) => {props.adminStore.setRouteName(e.target.value)}}/>
                                        <small id="name-help" className="form-text text-muted">{`Enter a name for your route.`}</small>
                                    </div>
                                    <div className="col">
                                    <label htmlFor="new-route-path">Component</label>
                                    <select className="form-control" id="new-route-component-select" aria-describedby="component-help" onChange={(e) => {
                                        console.log(e.target.value);
                                    }}>
                                        {componentList}
                                    </select>
                                    <small id="component-help" className="form-text text-muted">{`Choose a component to route to.`}</small>
                                    </div>                              
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="new-route-path">Route Path</label>
                                        <input type="text" className="form-control" id="new-route-path" aria-describedby="path-help" value={props.adminStore.getRoutePath} onChange={(e) => {props.adminStore.setRoutePath(e.target.value)}}/>
                                        <small id="path-help" className="form-text text-muted">{`Define the path for your route.`}</small>
                                    </div>
                                </div>
                            </div>
                            <h5>Upload New Component</h5>
                            <p>To add a new component you can upload it here, you must upload .jsx files in the format described *insert link here*</p>
                            <div class="row justify-content-md-center">
                                <div class="col-md-6">
                                    <div className="form-group files">
                                        <input type="file" name="file" id="file" className="form-control" multiple="" onChange={(e) => {
                                            props.componentStore.setFileData(e.target.files[0]);
                                        }}/>
                                        <label for="file"><div className="inner-label"><p>Choose a file</p></div></label>
                                        <Progress max="100" color="success" value={props.componentStore.getLoadedStatus} >Progress: {Math.round(props.componentStore.getLoadedStatus, 2) }%</Progress>
                                    </div>
                                    <button type="button" class="btn btn-success btn-block" onClick={(e) => {
                                        props.componentStore.handleJSXFileUpload();
                                    }}>Upload</button> 
                                </div>
                            </div>
                        </form>  
                    </div>
                    </div>
                </div>

            </div>
        </div>
    );    
}));

export default Admin;