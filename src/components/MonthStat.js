import React from "react";
import { Link } from "react-router-dom";

const MonthStat = (props) => {
  return (
    <div>
      <Link to="/">
        <h2>Month: {props.month}</h2>
      </Link>
      <h4>Distance: {props.totalDistance}km</h4>
      <h4>Time: {props.totalTime}</h4>
      <h4>Elevation Gain: {props.totalElevationGain}m</h4>
    </div>
  );
};

export default MonthStat;
