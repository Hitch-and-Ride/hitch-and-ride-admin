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

function Vehicle() {
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const vehicleList = useSelector((state) => state.vehicleList);
  const [brand, setBrand] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [seats, setSeats] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [typeOfCar, setTypeOfCar] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchVehicles();
  }, [false]);




  const fetchVehicles = async () => {
    const availableCars = [];
    axios
      .get(`${baseUrl}vehicles`)
      .then((response) => {
        console.log("my vehicles",response.data)
        response.data.map((x) => {
          const tempObj = {};
          tempObj.label = x.type_of_vehicle;
          tempObj.value = x.id;

          availableCars.push(tempObj);
          return availableCars;
        });
        dispatch({ type: 'SET_VEHICLE_LIST', vehicleList:response.data });
      })
      .catch(console.log);
  };
  
  const handleCreateVehicle = async () => {
    let payload = {
        "type_of_vehicle": typeOfCar,
        "brand": brand,
        "carrying_capacity": parseInt(seats),
        "is_available": true,
        "number_plate": numberPlate,
        "current_capacity": 0
    }
    axios
      .post(`${baseUrl}vehicles/create/`,payload)
      .then((response) => {
        Alert("A Vehicle has been created ")
        fetchVehicles()
        handleClose()
      })
      .catch(handleClose);
  };

  const handleClickOpen = (vehicle) => {
    setIsEdit(true)
    setVehicle(vehicle)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createVehicle = (event) => {
    event.preventDefault()
    setIsEdit(false)
    setOpen(true);
  };

  const handleUpdateVehicle = async () => {
    let payload = {
      "type_of_vehicle": typeOfCar,
      "brand": brand,
      "carrying_capacity": parseInt(seats),
      "is_available": true,
      "number_plate": numberPlate,
  }
    axios
      .put(`${baseUrl}vehicles/${vehicle.id}/update/`,payload)
      .then((response) => {
        Alert("Details have been updated ")
        handleClose()
      })
      .catch(handleClose);
  };

  const handleDialog = () => {
    if (!isEdit) {
      return (
        <>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Type Of Vehicle</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Type of Vehicle"
              size="lg"
              onChange={(event)=>setTypeOfCar(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Brand</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Brand"
              size="lg"
              onChange={(event)=>setBrand(event.target.value)}

            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Carrying Capacity</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Seats"
              size="lg"
              onChange={(event)=>setSeats(event.target.value)}

            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Number Plate</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Number Plate"
              size="lg"
              onChange={(event)=>setNumberPlate(event.target.value)}

            />
          </Form.Group>
        </>
      );
    } else {
      return (
        <>
           <Form.Group>
            <label htmlFor="exampleInputUsername1">Type Of Vehicle</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Type of Vehicle"
              size="lg"
              onChange={(event)=>setTypeOfCar(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Brand</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Brand"
              size="lg"
              onChange={(event)=>setBrand(event.target.value)}

            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Carrying Capacity</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Seats"
              size="lg"
              onChange={(event)=>setSeats(event.target.value)}

            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Number Plate</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Number Plate"
              size="lg"
              onChange={(event)=>setNumberPlate(event.target.value)}

            />
          </Form.Group>
        </>
      );
    }
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Vehicle</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => createVehicle(event)}>
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
                        <th>Type Of Vehicle</th>
                        <th>Brand </th>
                        <th>Carrying Capacity </th>
                        <th>Number Plate </th>
                        <th>Availability</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>

                    {vehicleList.map((vehicle) => (
                      <tr>
                      <td>{vehicle.type_of_vehicle}</td>
                      <td>{vehicle.brand} </td>
                      <td>{vehicle.carrying_capacity}</td>
                      <td>{vehicle.number_plate}</td>
                      <td>
                        <label className="badge badge-info">Available</label>
                      </td>
                      <td>
                        <button
                          onClick={()=>handleClickOpen(vehicle)}
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
              <DialogTitle>New Vehicle</DialogTitle>
              <DialogContent>
                <form className="forms-sample" style={{ width: "500px" }}>
                  {handleDialog()}
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={isEdit? handleUpdateVehicle: handleCreateVehicle} >Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
