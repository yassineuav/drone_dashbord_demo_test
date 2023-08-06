import "./GeoDrone.scss";

import React, { useEffect, useState  } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { CircularProgress } from "@mui/material";


const GeoDrone = ({ google }) => {

    const [location, setlocation]= useState({lat: 37.556375, lng: -122.0288935,})

   const  isLoaded  = { googleMapsApiKey: "AIzaSyBkNHGKQvy2wYp8n3apcN1-U84JHc7Ci44",};
 
 
  return (
    <div className="list">
      <Sidebar />
      {!isLoaded ? (
        <div className="listContainer">
          <Navbar />
          <div className="loading">
            <CircularProgress className="spinner" />
          </div>
        </div>
      ) : (
        <div className="listContainer">
          <Navbar />
          <h1>map</h1>
          <div style={{ height: "80vh", width: "100%" }}>
          </div>
        </div>
      )}
    </div>
  );
};



export default GeoDrone;
