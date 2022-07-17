import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TableHeader from "./TableHeader";
import { Table, TableBody, TableContainer, TableCell, TableRow } from "@mui/material";
import { selectedMonthActions } from "../store/selectedMonth";
import { Button } from "@mui/material";
import { dateHandler, timeHandler } from "../helpers";

const SelectedMonthActivities = (props) => {
  const data = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Link to="./" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => {
            dispatch(selectedMonthActions.selectSelectedMonth(undefined));
          }}
        >
          Back to Initial Page
        </Button>
      </Link>
      <TableContainer sx={{ marginTop: 4 }}>
        <Table sx={{ minWidth: 650, maxWidth: 900, margin: "auto" }} aria-label="simple table">
          <TableHeader />
          <TableBody>
            {data.activities.map(
              (activity, index) =>
                props.selectedMonth === new Date(activity.start_date).getMonth() && (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {activity.name}
                    </TableCell>
                    <TableCell align="center">{dateHandler(activity.start_date)}</TableCell>
                    <TableCell align="center">{(activity.distance / 1000).toFixed(2)}</TableCell>
                    <TableCell align="center">{timeHandler(activity.moving_time)}</TableCell>
                    <TableCell align="center">
                      {Math.round(activity.total_elevation_gain)}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default SelectedMonthActivities;
