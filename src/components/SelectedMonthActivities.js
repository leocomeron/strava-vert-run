import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import TableData from "./TableData";
import TableHeader from "./TableHeader";
import { selectedMonthActions } from "../store/selectedMonth";

const dateHandler = (date) => {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);

  return `${day}-${month}-${year}`;
};

const timeHandler = (time) => {
  return new Date(time * 1000).toISOString().substr(11, 8);
};

const SelectedMonthActivities = (props) => {
  const data = useSelector((state) => state.activities);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Link to="./">
        <button
          onClick={() => {
            dispatch(selectedMonthActions.selectSelectedMonth(undefined));
          }}
        >
          Back to Initial Page
        </button>
      </Link>
      <table>
        <tbody>
          <TableHeader />
          {data.activities.map((activity) => {
            return (
              props.selectedMonth ===
                new Date(activity.start_date).getMonth() && (
                <TableData
                  key={activity.upload_id}
                  name={activity.name}
                  startDate={dateHandler(activity.start_date)}
                  distance={(activity.distance / 1000).toFixed(2)}
                  movingTime={timeHandler(activity.moving_time)}
                  totalElevationGain={Math.round(activity.total_elevation_gain)}
                />
              )
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default SelectedMonthActivities;
