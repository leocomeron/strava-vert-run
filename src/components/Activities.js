import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { activitiesActions } from "../store/activities";
import { datesActions } from "../store/dates";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { Button, Grid, Box } from "@mui/material";
import TableHeader from "./TableHeader";
import { dateHandler, timeHandler } from "../helpers";

const Activities = () => {
  const [access_token, setAccess_token] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const data = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const auth_link = "https://www.strava.com/oauth/token";
    setIsLoading(true);

    const getActivites = async () => {
      const maxNumOfActivities = 100;
      const daysbefore = 60 * 24 * 60 * 60000; //looking for a date 60 days before
      const todayInEpoch = Date.now() / 1000; // The API accepts Epoch in seconds (not miliseconds)
      const startDate = (todayInEpoch * 1000 - daysbefore) / 1000;
      const startMonth = new Date(startDate * 1000).getMonth();
      const startYear = new Date(startDate * 1000).getYear();
      dispatch(datesActions.selectDates(startMonth));

      const initialDate = new Date(startYear + 2000 - 100, startMonth, "01");
      const initialDateInEpoch = Date.parse(initialDate) / 1000;

      const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}&per_page=${maxNumOfActivities}&before=${todayInEpoch}&after=${initialDateInEpoch}`;

      access_token &&
        (await axios.get(activities_link).then(function (response) {
          dispatch(activitiesActions.selectActivities(response.data));
          setIsLoading(false);
        }));
    };

    const reAuthorize = async () => {
      await axios
        .post(auth_link, {
          client_id: "78996",
          client_secret: "9e34535d5f6e344afe518fdfcfdd1044e8fffd49",
          refresh_token: "f5e5b5376063fc05507641d6a54f23e10b838644",
          grant_type: "refresh_token",
        })
        .then(function (response) {
          setAccess_token(response.data.access_token);
          getActivites(response);
        });
    };
    reAuthorize();
  };

  useEffect(() => {
    fetchData();
  }, [access_token]);

  return (
    <Grid>
      <Link to="/stats" style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={{ mt: 2 }}>
          last 3 months
        </Button>
      </Link>
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
          <CircularProgress size={30} />
        </Box>
      )}
      <TableContainer sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650, maxWidth: 900, margin: "auto" }} aria-label="simple table">
          <TableHeader />
          <TableBody>
            {data.activities.map((activity, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {activity.name}
                </TableCell>
                <TableCell align="center">{dateHandler(activity.start_date)}</TableCell>
                <TableCell align="center">{(activity.distance / 1000).toFixed(2)}</TableCell>
                <TableCell align="center">{timeHandler(activity.moving_time)}</TableCell>
                <TableCell align="center">{Math.round(activity.total_elevation_gain)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Activities;
