import React, { useState } from "react";
import { ReactComponent as Droneicon } from "../../assets/Droneicon.svg";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { CircularProgress, Typography } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#dee",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  margin: 10,
  color: theme.palette.text.secondary,
}));

let socket = new WebSocket("ws://localhost:8000/ws/test/");


// const baseURL = "http://localhost:8000/dronetest/";

export const Drones = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  socket.onopen = function (e) {
    setLoading(false);
    console.log("ws send: ");
    socket.send(
      JSON.stringify({
        action: "list",
        request_id: new Date().getTime(),
      })
    );
  };

  socket.onmessage = function (e) {
    let allData = JSON.parse(e.data);
    console.log("on message data: ", allData.data);

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

      console.log("update data: ", newData);
      //   setData(allData.data)
    }
  };

  const handleOnClick = (droneStatus)  =>  {
  
    if (droneStatus.status === 1 || droneStatus.status === "ON"){
      droneStatus.status = 0;
    }else{
      droneStatus.status = 1;
    }
    console.log(droneStatus)
    axios.put(`http://localhost:8000/dronetest/${droneStatus.id}/`, droneStatus)
    .then((response) => {
      console.log(response)
    });

  };

  return (
    <div className="list">
      <Sidebar />
      {loading ? (
        <div className="listContainer">
          <Navbar />
          <div className="loading">
            <CircularProgress className="spinner" />
          </div>
        </div>
      ) : (
        <div className="listContainer">
          <Navbar />
          <h1>drones details:</h1>
          <div className="datatableTitle">
            List of data
            <button className="link" onClick={() => {}}>
              Add Drone
            </button>
          </div>
          <h4>{JSON.stringify(data)}</h4>

          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {data.length &&
                data?.map((item, index) => (
                  <Grid item xs={1} sm={2} md={2} key={index}>
                    <Item>
                      <Typography variant="h6">{item.name}</Typography>
                      <Droneicon
                        fill={item.status === 1 || item.status === "ON"
                            ? "green" : "red"}
                        strock="green"
                        width="150px"
                        height="150px"
                      />
                      <Grid container spacing={2}>
                        <Grid item xs sm md>
                          <Item>
                        
                            <Button
                            startIcon={<PowerSettingsNewOutlinedIcon />}
                              size="small"
                              variant="contained"
                              onClick={()=>{handleOnClick(item)}}
                              color={item.status === 1 || item.status === "ON"
                                ? "success"
                                : "error"}
                              >
                              Status: {item.status === 1 || item.status === "ON"
                                ? "ON"
                                : "OFF"}
                            </Button>
                          </Item>
                          <Item>
                            <Typography>Battery: {item.battery}%</Typography>
                            
                          </Item>
                        </Grid>
                       
                      </Grid>
                    </Item>
                  </Grid>
                ))}
            </Grid>
          </Box>
          <div></div>
        </div>
      )}
    </div>
  );
};
