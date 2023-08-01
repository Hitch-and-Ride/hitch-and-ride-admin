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

function Driver() {
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const vehicleList = useSelector((state) => state.vehicleList);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [user, setUser] = useState({});



  const dispatch = useDispatch();

  useEffect(() => {
    fetchDrivers()
    fetchVehicles()
  }, [false]);


  const fetchDrivers = async () => {
    axios
      .get(`${baseUrl}drivers`)
      .then((response) => {
        setDrivers(response.data)
        
      })
      .catch(console.log);
  };


  const handleUpdateUser = async () => {
    let payload = {
        "username": `${firstName}_${lastName}`,
        "first_name": firstName,
        "last_name": lastName,
        "gender": gender,
        "phone_numbers": [
          {
            "phone_number": phoneNumber,
            "primary": true
          }
        ],
        "wallet_balance": "500"
    }
    axios
      .put(`${baseUrl}users/${user.Id}/update/`,payload)
      .then((response) => {
        Alert("Details have been updated ")
        handleClose()
      })
      .catch(handleClose);
  };


  const fetchVehicles = async () => {
    axios
      .get(`${baseUrl}vehicles`)
      .then((response) => {
        console.log("my vehicles",response.data)
        dispatch({ type: 'SET_VEHICLE_LIST', vehicleList:response.data });
      })
      .catch(console.log);
  };


  const handleClickOpen = (user) => {
    setIsEdit(true)
    setUser(user)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createDriver = (event) => {
    event.preventDefault()
    setIsEdit(false)
    setOpen(true);
  };

  const handleCreateDriver = async () => {
    let payload = {
        "email": email,
        "vehicle": vehicle,
        "password": password,
    }
    axios
      .post(`${baseUrl}drivers/create/`,payload)
      .then((response) => {
        Alert("Driver has been created ")
        handleClose()
      })
      .catch(handleClose);
  };

  const handleDialog = () => {
    if (!isEdit) {
      return (
        <>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Email</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Email"
              size="lg"
              onChange={(event)=>setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Password</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Password"
              size="lg"
              onChange={(event)=>setPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Select Car</label>
            <div className="col-sm-12">
              <select className="form-control" onChange={(event)=>setVehicle(event.target.value)}>
              <option value="">Select Vehicle</option>
              {vehicleList.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>{vehicle.type_of_vehicle }|| {vehicle.brand }</option>
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
            <label htmlFor="exampleInputUsername1">First Name</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="First Name"
              size="lg"
              onChange={(event)=>setFirstName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Last Name </label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Last Name"
              size="lg"
              onChange={(event)=>setLastName(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Phone Number </label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Phone Number"
              size="lg"
              onChange={(event)=>setPhoneNumber(event.target.value)}
            />
          </Form.Group>
          {/* <Form.Group>
            <label htmlFor="exampleInputUsername1">Number</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Username"
              size="lg"
            />
          </Form.Group> */}
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Select Gender</label>
            <div className="col-sm-12">
              <select className="form-control" onChange={(event)=>setGender(event.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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
        <h3 className="page-title">Driver</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => createDriver(event)}>
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
                        <th>Email</th>
                        <th>First Name </th>
                        <th>Last Name </th>
                        <th>Phone Number </th>
                        <th>Car </th>
                        <th>Availability</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>

                      {drivers.map((driver)=>(
                        <tr key ={driver.id}>
                        <td>{driver.user.email}</td>
                        <td>{driver.user.first_name} </td>
                        <td>{driver.user.last_name} </td>
                        <td>{driver.user.phone_numbers.length > 0 ? driver.user.phone_numbers[0].phone_number:""} </td>
                        <td>{driver.vehicle.brand}</td>
                        <td>
                          {driver.is_available? (<label className="badge badge-success">Available</label>):(<label className="badge badge-danger">Unavailable</label>)}
                          
                        </td>
                        <td>
                          <button
                           onClick={()=>handleClickOpen(driver.user)}
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
              <DialogTitle>New Driver</DialogTitle>
              <DialogContent>
                <form className="forms-sample" style={{ width: "500px" }}>
                  {handleDialog()}
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={isEdit? handleUpdateUser: handleCreateDriver}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Driver;
