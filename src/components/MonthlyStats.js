import { useEffect } from "react";

import MonthStat from "./MonthStat";

import { useDispatch, useSelector } from "react-redux";
import { activitiesActions } from "../store/activities";

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

const timeHandler = (time) => {
  return new Date(time * 1000).toISOString().substr(11, 8);
};

const RecentMonthsStats = () => {
  const data = useSelector((state) => state.activities);
  const dates = useSelector((state) => state.dates);
  const dispatch = useDispatch();

  const initialMonth = dates.dates; // have to store in redux from Activities.js

  let firstMonth = [];
  let secondMonth = [];
  let currentMonth = [];
  data.activities.map((activity) => {
    if (new Date(activity.start_date).getMonth() === initialMonth) {
      firstMonth.push(activity);
    } else if (new Date(activity.start_date).getMonth() === initialMonth + 1) {
      secondMonth.push(activity);
    } else {
      currentMonth.push(activity);
    }
  });

  const intialParameters = {
    distance: 0,
    moving_time: 0,
    total_elevation_gain: 0,
  };

  const monthsArray = [firstMonth, secondMonth, currentMonth];
  let unifiedData = [];

  for (let i = 0; i < monthsArray.length; i++) {
    let params = monthsArray[i].reduce((previousValue, currentValue) => {
      return {
        month: monthNames[i],
        distance: previousValue.distance + currentValue.distance,
        moving_time: previousValue.moving_time + currentValue.moving_time,
        total_elevation_gain:
          previousValue.total_elevation_gain +
          currentValue.total_elevation_gain,
      };
    }, intialParameters);
    unifiedData.push(params);
  }

  console.log(unifiedData);

  return (
    <div>
      {unifiedData.map((month) => {
        return (
          <MonthStat
            key={month.month}
            month={month.month}
            totalDistance={Math.round(month.distance / 1000)}
            totalTime={timeHandler(month.moving_time)}
            totalElevationGain={Math.round(month.total_elevation_gain)}
          />
        );
      })}
    </div>
  );
};

export default RecentMonthsStats;
