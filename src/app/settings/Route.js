import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import bsCustomFileInput from "bs-custom-file-input";
import { useSelector, useDispatch } from 'react-redux';

import { baseUrl } from '../utils/host';


import axios from 'axios';

function Route() {
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const routeList = useSelector((state) => state.routeList);
  const stationList = useSelector((state) => state.stationList);
  const [cost, setCost] = useState("");
  const [pickupStation, setPickupStation] = useState("");
  const [destinationStation, setDestinationStation] = useState("");
  const [currentRoute, setCurrentRoute] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    fetchRoutes();
    fetchStations();
  }, [false]);



  const fetchStations = async () => {
    axios
      .get(`${baseUrl}stations`)
      .then((response) => {
        dispatch({ type: 'SET_STATION_LIST', stationList:response.data });
      })
      .catch(console.log);
  };




  const fetchRoutes = async () => {
    axios
      .get(`${baseUrl}routes`)
      .then((response) => {
        dispatch({ type: 'SET_ROUTE_LIST', routeList:response.data });
      })
      .catch(console.log);
  };
  
  const handleCreateRoute = async () => {
    let payload = {
        "cost": cost,
        "destination_station": destinationStation,
        "pick_up_station": pickupStation,
    }
    axios
      .post(`${baseUrl}routes/create/`,payload)
      .then((response) => {
        Alert("A Route has been created ")
        fetchRoutes()
        handleClose()
      })
      .catch(handleClose);
  };


  const handleUpdateRoute = async () => {
    let payload = {
      "cost": cost,
      "destination_station": destinationStation,
      "pick_up_station": pickupStation,
  }
    axios
      .put(`${baseUrl}routes/${currentRoute.id}/update/`,payload)
      .then((response) => {
        Alert("Details have been updated ")
        handleClose()
      })
      .catch(handleClose);
  };

  const handleClickOpen = (route) => {
    setIsEdit(true)
    setCurrentRoute(route)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createRoute = (event) => {
    event.preventDefault()
    setIsEdit(false)
    setOpen(true);
  };

  const handleDialog = () => {
    if (!isEdit) {
      return (
        <>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Cost of  Route</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="cost of  Route"
              size="lg"
              onChange={(event)=>setCost(event.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <label htmlFor="exampleInputUsername1">Select Destination</label>
            <div className="col-sm-12">
              <select className="form-control" onChange={(event)=>setDestinationStation(event.target.value)}>
              <option value="">Select Destination</option>
              {stationList.map((station) => (
                      <option key={station.id} value={station.id}>{station.name }</option>
                    ))}
                
              </select>
            </div>
          </Form.Group>


          <Form.Group>
            <label htmlFor="exampleInputUsername1">Select Pickup station</label>
            <div className="col-sm-12">
              <select className="form-control" onChange={(event)=>setPickupStation(event.target.value)}>
              <option value="">Select Pickup station</option>
              {stationList.map((station) => (
                      <option key={station.id} value={station.id}>{station.name }</option>
                    ))}
                
              </select>
            </div>
          </Form.Group>
          
        </>
      );
    } else {
      return (
        <>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Cost of  Route</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="cost of  Route"
              size="lg"
              onChange={(event)=>setCost(event.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <label htmlFor="exampleInputUsername1">Select Destination</label>
            <div className="col-sm-12">
              <select className="form-control" onChange={(event)=>setDestinationStation(event.target.value)}>
              <option value="">Select Destination</option>
              {stationList.map((station) => (
                      <option key={station.id} value={station.id}>{station.name }</option>
                    ))}
                
              </select>
            </div>
          </Form.Group>


          <Form.Group>
            <label htmlFor="exampleInputUsername1">Select Pickup station</label>
            <div className="col-sm-12">
              <select className="form-control" onChange={(event)=>setPickupStation(event.target.value)}>
              <option value="">Select Pickup station</option>
              {stationList.map((station) => (
                      <option key={station.id} value={station.id}>{station.name }</option>
                    ))}
                
              </select>
            </div>
          </Form.Group>
        </>
      );
    }
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Route</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => createRoute(event)}>
                Create
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              refresh
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <div className="row">
          <div className="col grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Pickup station</th>
                        <th>Destination</th>
                        <th>Cost</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>

                    {routeList.map((route) => (
                      <tr >
                      <td>{route.pick_up_station.name}</td>
                      <td>{route.destination_station.name}</td>
                      <td>{route.cost}</td>
                      <td>
                        <button
                          onClick={()=>handleClickOpen(route)}
                          type="button"
                          className="btn btn-social-icon"
                        >
                          <i className="mdi mdi-border-color"></i>
                        </button>
                        <button type="button" className="btn btn-social-icon">
                          <i className="mdi mdi-delete"></i>
                        </button>
                      </td>
                    </tr>
                    ))}
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>New Route</DialogTitle>
              <DialogContent>
                <form className="forms-sample" style={{ width: "500px" }}>
                  {handleDialog()}
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={isEdit? handleUpdateRoute: handleCreateRoute}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Route;
