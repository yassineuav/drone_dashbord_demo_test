import React, { useEffect, useState } from "react";
import "./ControllDrone.scss";
import { CircularProgress } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import runing_gif from "../../assets/blink_green.gif";
import off_gif from "../../assets/blink_red.gif"



export const ControllDrone = () => {
  const [loading, setLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState(false);

  // const baseURL = "http://localhost:8000/dronetest/";

  const [data, setData] = useState({});

function connect()  {
    
  let socket = new WebSocket("ws://localhost:8000/ws/order/");

    socket.onopen = function (e) {
      setLoading(false);
      setServerStatus(true)
    
    console.log("ws send: ");
    socket.send(
      JSON.stringify({
        action: "list",
        request_id: "my_orders",
        // new Date().getTime(),
      })
    );
  };

  socket.onclose = function(e){
    setServerStatus(false)
  }

  socket.onerror = function(e){
    console.log("websocket error:", e);
    // socket.close();
  }

  socket.onmessage = function (e) {
    setLoading(false);
    setServerStatus(true)
    let allData = JSON.parse(e.data);
    console.log("on message data: ", allData);
    if (allData.action === "list") {
      setData(allData.data);
    } else if (allData.action === "create") {
      setData((data) => [...data, allData.data]);
    } else if (allData.action === "update") {
      let newData = data.map((item) => {
        if (item.id === allData.data.id) {
          item = allData.data;
        }
         return item;
      });

      setData(newData);

      // console.log("update data: ", newData);
    }
  };
  // if(socket.readyState === 1){}
  
  
}




  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }

    if (seconds < 10) return "just now";

    return Math.floor(seconds) + " seconds ago";
  };

  useEffect(() => {
    if(loading){
      setTimeout(function() {
        setLoading(false);  
      }, 2000);        
    }
    if(!serverStatus){
      console.log('Socket is closed. Reconnect will be attempted in 5 second.');
      // setTimeout(function() {
      //   connect();  
      // }, 5000);        
    }else{
      console.log('Socket is open');      
    }
    // connect();
  

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
            {/* header */}
            <div className="navbar">
              <div className="wrapper">
                <div className="header">
                  <h2>System Screener</h2>
                </div>
                <div className="items">
                  <div className="item">
                    <p className="status">Status:</p>
                  </div>
                  <div className="item">
                    { serverStatus ? <button
                      className="statusButtonRun"
                      type="button"
                      onClick={() => {}}
                    >running
                      <img src={runing_gif} alt="blink" className="icon" />
                    </button> :
                    <button
                      className="statusButtonClose"
                      type="button"
                      onClick={() => {connect()}}
                    >off
                      <img src={off_gif} alt="blink" className="icon" />
                    </button>}

                  </div>
                </div>
              </div>
            </div>
            {/*  fetch async commad and status info from server */}
            <div className="json_data">
              <h4>{JSON.stringify(data)}</h4>
              {data.length &&
                data?.map((item, index) => (
                  <div key={index}>
                    <h2>
                      Order ID: {item.id} |Weight: {item.weight} | Status: {item.status.status} | last update:
                      {timeAgo(new Date(item.updated_at))}
                    </h2>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
