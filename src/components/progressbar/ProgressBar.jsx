import React, { useState } from "react";
import "./progressbar.scss";

const ProgressBar = ({progress}) => {
  // const [progress, setProgress] = useState(progress);

  // const handleClick = () => {
  //   if (progress < 100) {
  //     setProgress(progress + 10);
  //   }
  // };

  // const handleReset = () => {
  //   setProgress(0);
  // };

  const getColor = () => {
    if (progress <= 10) {
      return "#ff0000";
    } else if (progress < 25) {
      return "#e46314";
    } else if (progress < 40) {
      return "#e30099";
    } else if (progress < 50) {
      return "#3365dc";
    } else if (progress < 60) {
      return "#04ff96";
    } else if (progress < 80) {
        return "#2ecc";
    } else {
      return "#2ecc72";
    }
  };

  return (
    <div className="container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%`, backgroundColor: getColor() }}
        ></div>
      </div>
      <div className="progress-label">{progress}%</div>
      {/* <button >Pregress</button>
      <button >Reset</button> */}
    </div>
  );
};

export default ProgressBar;
