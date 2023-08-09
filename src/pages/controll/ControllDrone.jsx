import React, { useEffect, useState } from "react";
import "./ControllDrone.scss";
import { CircularProgress } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import runing_gif from "../../assets/blink_green.gif";
import off_gif from "../../assets/blink_red.gif";
import { timeAgo } from "../../components/utils/TimeAgo";

let socket = new WebSocket("ws://localhost:8000/ws/order/");

export const ControllDrone = () => {
  const [loading, setLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState(false);
  const [data, setData] = useState([]);

  function connect() {
    console.log("my data ", data);
  }

  socket.onopen = function (e) {
    setLoading(false);
    setServerStatus(true);

    console.log("ws send: ");
    socket.send(
      JSON.stringify({
        action: "list",
        request_id: "my_orders",
        // new Date().getTime(),
      })
    );
  };

  socket.onclose = function (e) {
    setServerStatus(false);
  };

  socket.onerror = function (e) {
    console.log("websocket error:", e);
    // socket.close();
  };

  socket.onmessage = function (e) {
    // setLoading(false);
    // setServerStatus(true)

    let allData = JSON.parse(e.data);

    console.log("on message all data: ", allData);

    if (allData.action === "list") {
      setData(allData.data);
    } else if (allData.action === "create") {
      setData((data) => [...data, allData.data]);
    } else if (allData.action === "update") {
      // setData(prevData => ([...prevData, ...allData.data]));
      let newData = data.map((item) => {
        if (item.id === allData.data.id) {
          item = allData.data;
        }
        return item;
      });

      setData(newData);
    }
  };
  // if(socket.readyState === 1){}

  // }

  useEffect(() => {
    if (loading) {
      setTimeout(function () {
        setLoading(false);
      }, 2000);
    }
    // const socket = new WebSocket('ws://localhost:8000/ws/order/');

    // Listen for messages from the WebSocket server
    // socket.addEventListener("message", (event) => {
    //   const updatedData = JSON.parse(event.data);
      
    //   console.log("add event listerner:  updated data", updatedData)
    //   console.log("add event listerner:  old data", data)
    //   let newData = data.map((item) => {
    //     console.log("data new data ", item);
    //     if (item.id === updatedData.data.id) {
    //       item = updatedData.data;
    //     }
    //     console.log("item ", item)
    //     return item;
    //   });

      //   console.log("add event listerner: after new data", newData)
      // setData(newData);
      //setData(updatedData); // Update the state with the new data
    // });

    // // Clean up the WebSocket connection when the component unmounts
    // return () => {
    //   // socket.close();
    // };
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
                    {serverStatus ? (
                      <button
                        className="statusButtonRun"
                        type="button"
                        onClick={() => {}}
                      >
                        running
                        <img src={runing_gif} alt="blink" className="icon" />
                      </button>
                    ) : (
                      <button
                        className="statusButtonClose"
                        type="button"
                        onClick={() => {
                          connect();
                        }}
                      >
                        off
                        <img src={off_gif} alt="blink" className="icon" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/*  fetch async commad and status info from server */}
            <div className="json_data">
              {data.length &&
                data?.map((item, index) => (
                  <div key={index}>
                    <h3>
                      Order ID: {item.id} | Weight: {item.weight} | Description
                      : {item.description} | Status: {item.status} | Status id : {item.status_id} | order last
                      update:
                      {timeAgo(item.updated_at)} 
                    </h3>
                    <div>
                      status histories:
                      {item.status_history.length &&
                        item?.status_history.map((status) => (
                          <h4 key={status.id} className="status_color">
                            {status.id} - {status.status} - last update {timeAgo(status.updated_at)}
                          </h4>
                        ))}
                    </div>
                  </div>
                ))}
              <br />
              <p>{JSON.stringify(data)}</p>
              {/* {console.log("on message data>>: ", data)} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
