import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form ,Alert} from "react-bootstrap";
import DatePicker from "react-datepicker";
import bsCustomFileInput from "bs-custom-file-input";
import axios from 'axios';
import { baseUrl } from '../utils/host';


function Trip() {
  const [open, setOpen] = React.useState(false);
  const [trips, setTrips] = useState([]);
  const [trip, setTrip] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState("");
  const [isEdit, setIsEdit] = React.useState(false);

  const handleClickOpen = (trip) => {
    setIsEdit(true)
    setTrip(trip)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchTrips()
    fetchDrivers()
  }, [false]);

  const fetchDrivers = async () => {
    axios
      .get(`${baseUrl}drivers/available`)
      .then((response) => {
        setDrivers(response.data) 
      })
      .catch(console.log);
  };

  const handleUpdatePassengerTrip = async () => {

    let payload = {
      "driver": driver,
      "pick_up_location": trip.trip.route.pick_up_station.name,
      "destination": trip.trip.route.destination_station.name,
      "date": trip.trip.date,
      "trip":trip.trip.id
      
  }
    axios
      .put(`${baseUrl}passengertrips/${trip.passenger.id}/${trip.id}/update/`,payload)
      .then((response) => {
        Alert("Details have been updated ")
        handleClose()
      })
      .catch(handleClose);
  };

  const handleEditDialog = () => {
      return (
        <>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Select Driver</label>
            <div className="col-sm-12">
              <select className="form-control" onChange={(event)=>setDriver(event.target.value)}>
              <option value="">Select Destination</option>
              {drivers.map((driver) => (
                      <option key={driver.id} value={driver.id}>{`${driver.user.first_name} ${driver.user.last_name}  || ${driver.vehicle.type_of_vehicle}` }</option>
                    ))}
                
              </select>
            </div>
          </Form.Group>
        </>
      );
  };


  const fetchTrips = async () => {
    axios
      .get(`${baseUrl}passengertrips`)
      .then((response) => {
        setTrips(response.data)
        
      })
      .catch(console.log);
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Trip</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
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
                        <th>Brand Name</th>
                        <th>Unit Type</th>
                        <th>Passenger</th>
                        <th>Driver</th>
                        <th>Pickup Location</th>
                        <th>Date/Time</th>
                        <th>Destination</th>
                        {/* <th>Drop/Return</th> */}
                        <th>Progress</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {trips.map((trip)=>(
                      <tr>
                      <td>{trip.trip.driver?trip.trip.driver.vehicle.brand:"not Assigned"} </td>
                      <td>{trip.trip.driver?trip.trip.driver.vehicle.type_of_vehicle:"not Assigned"}</td>
                      <td>{trip.passenger.user.email}</td>
                      <td>{trip.trip.driver?trip.trip.driver.user.email:"not Assigned"}</td>
                      <td>{trip.trip.route.pick_up_station.name}</td>
                      <td>{trip.trip.date}</td>
                      <td>{trip.trip.route.destination_station.name}</td>
                      {/* <td className="text-danger">
                        {" "}
                        <i className="mdi mdi-arrow-up"></i>Drop
                      </td>*/}
                      <td>
                        <label className="badge badge-success">{trip.trip.status}</label>
                      </td> 
                      <td>
                        <button type="button" className="btn btn-social-icon" onClick={()=>handleClickOpen(trip)}>
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
              <DialogTitle>New Trip</DialogTitle>
              <DialogContent>
                <form className="forms-sample" style={{ width: "500px" }}>
                {handleEditDialog()}
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={ handleUpdatePassengerTrip}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trip;
