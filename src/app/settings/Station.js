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

function Station() {
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const stationList = useSelector((state) => state.stationList);
  const [cost, setCost] = useState("");
  const [stationName, setStationName] = useState("");
  const [currentStation, setCurrentStation] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchStations();
  }, [false]);




  const fetchStations = async () => {
    const availableCars = [];
    axios
      .get(`${baseUrl}stations`)
      .then((response) => {
        console.log("my stations",response.data)
        response.data.map((x) => {
          const tempObj = {};
          tempObj.label = x.name;
          tempObj.value = x.id;

          availableCars.push(tempObj);
          return availableCars;
        });
        dispatch({ type: 'SET_STATION_LIST', stationList:response.data });
      })
      .catch(console.log);
  };
  
  const handleCreateStation = async () => {
    let payload = {
        "name": stationName,
    }
    axios
      .post(`${baseUrl}stations/create/`,payload)
      .then((response) => {
        Alert("A Station has been created ")
        fetchStations()
        handleClose()
      })
      .catch(handleClose);
  };

  const handleUpdateStation = async () => {
    let payload = {
        "name": stationName,
    }
    axios
      .put(`${baseUrl}stations/${currentStation.id}/update/`,payload)
      .then((response) => {
        Alert("Details have been updated ")
        handleClose()
      })
      .catch(handleClose);
  };

  const handleClickOpen = (station) => {
    setIsEdit(true)
    setCurrentStation(station)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createStation = (event) => {
    event.preventDefault()
    setIsEdit(false)
    setOpen(true);
  };

  const handleDialog = () => {
    if (!isEdit) {
      return (
        <>
          <Form.Group>
            <label htmlFor="exampleInputUsername1">Name of  Station</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Name of  Station"
              size="lg"
              onChange={(event)=>setStationName(event.target.value)}
            />
          </Form.Group>
          
        </>
      );
    } else {
      return (
        <>
           <Form.Group>
            <label htmlFor="exampleInputUsername1">Name of  Station</label>
            <Form.Control
              type="text"
              id="exampleInputUsername1"
              placeholder="Name of  Station"
              size="lg"
              onChange={(event)=>setStationName(event.target.value)}
            />
          </Form.Group>
        </>
      );
    }
  };

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Station</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => createStation(event)}>
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
                        <th>Name Of Station</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>

                    {stationList.map((station) => (
                      <tr>
                      <td>{station.name}</td>
                      <td>
                        <button
                          onClick={()=>handleClickOpen(station)}
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
              <DialogTitle>New Station</DialogTitle>
              <DialogContent>
                <form className="forms-sample" style={{ width: "500px" }}>
                  {handleDialog()}
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={isEdit? handleUpdateStation: handleCreateStation}>Submit</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Station;
