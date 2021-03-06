import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
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
    <>
      <Card sx={{ maxWidth: 275, margin: 2, borderRadius: 4, boxShadow: 8 }}>
        <CardContent>
          <Link
            to="/"
            onClick={() => dispatch(selectedMonthActions.selectSelectedMonth(props.month))}
            style={{ textDecoration: "none", color: "#4DA1A9" }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={props.image}
              sx={{ borderRadius: 2 }}
            />
            <Typography variant="h5">Month: {monthNames[monthHandler(props.month)]}</Typography>
          </Link>
          <Typography>Distance: {props.totalDistance}km</Typography>
          <Typography>Time: {props.totalTime}</Typography>
          <Typography>Elevation Gain: {props.totalElevationGain}m</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default MonthStat;
