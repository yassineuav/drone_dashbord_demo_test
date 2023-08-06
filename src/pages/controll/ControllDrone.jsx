import React, { useEffect, useState } from "react";
import "./ControllDrone.scss";
import { CircularProgress } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

export const ControllDrone = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {loading ? (
          <div className="loading">
            <CircularProgress className="spinner" />
          </div>
        ) : (
          <div className="systemScreener">
            <div className="navbar">
              <div className="wrapper">
                <div className="header">
                  <h2>System Screener</h2>
                </div>
                <div className="items">
                  <div className="item">
                    Status:
                  </div>
                  <div className="item">
                    <button 
                      className="statusButton"
                      type="button" onClick={() => {}}>
                      running ...
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
