import React from "react";
import { Link } from "react-router-dom";

import { selectedMonthActions } from "../store/selectedMonth";
import { useDispatch } from "react-redux";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthHandler = (month) => {
  if (month >= 12) {
    return month - 12;
  } else return month;
};

const MonthStat = (props) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Link
        to="/"
        onClick={() =>
          dispatch(selectedMonthActions.selectSelectedMonth(props.month))
        }
      >
        <h2>Month: {monthNames[monthHandler(props.month)]}</h2>
      </Link>
      <h4>Distance: {props.totalDistance}km</h4>
      <h4>Time: {props.totalTime}</h4>
      <h4>Elevation Gain: {props.totalElevationGain}m</h4>
    </div>
  );
};

export default MonthStat;
