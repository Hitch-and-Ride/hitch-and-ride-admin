import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form } from "react-bootstrap";
import axios from 'axios';
import { baseUrl } from '../utils/host';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from "@mui/material";


function Passenger() {
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);


  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [passengers, setPassengers] = useState([]);


  useEffect(() => {
    fetchPassengers()
  }, [false]);


  const fetchPassengers = async () => {
    axios
      .get(`${baseUrl}passengers`)
      .then((response) => {
        setPassengers(response.data)
        
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

  const createPassenger = (event) => {
    event.preventDefault()
    setIsEdit(false)
    setOpen(true);
  };


  const handleCreatePassenger = async () => {
    let payload = {
        "email": email,
        "password": password,
    }
    axios
      .post(`${baseUrl}passengers/create/`,payload)
      .then((response) => {
        Alert("Passenger has been created ")
        handleClose()
      })
      .catch(handleClose);
  };
  const handleUpdateUser = async () => {
    let payload = {
        "username": `${firstName}_${lastName}`,
        "first_name": firstName,
        "last_name": lastName,
        "gender": gender,
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
        <h3 className="page-title">Passenger</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => createPassenger(event)}>
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
                        <th>Availability</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>

                    {passengers.map((passenger)=>(
                        <tr key ={passenger.id}>
                        <td>{passenger.user.email}</td>
                        <td>{passenger.user.first_name} </td>
                        <td>{passenger.user.last_name} </td>
                        <td>
                          {passenger.is_available? (<label className="badge badge-success">Available</label>):(<label className="badge badge-danger">Unavailable</label>)}
                          
                        </td>
                        <td>
                          <button
                            onClick={()=>handleClickOpen(passenger.user)}
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
              <DialogTitle>New Passenger</DialogTitle>
              <DialogContent>
                <form className="forms-sample" style={{ width: "500px" }}>
                  {handleDialog()}
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={isEdit? handleUpdateUser: handleCreatePassenger}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Passenger;
