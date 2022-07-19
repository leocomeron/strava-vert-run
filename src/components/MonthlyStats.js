import { useSelector } from "react-redux";
import MonthStat from "./MonthStat";
import { Grid, Typography } from "@mui/material";

const timeHandler = (time) => {
  return new Date(time * 1000).toISOString().substr(11, 8);
};

const RecentMonthsStats = () => {
  const data = useSelector((state) => state.activities);
  const dates = useSelector((state) => state.dates);

  const initialMonth = dates.dates;

  let firstMonth = [];
  let secondMonth = [];
  let currentMonth = [];
  data.activities.map((activity) => {
    if (new Date(activity.start_date).getMonth() === initialMonth) {
      return firstMonth.push(activity);
    } else if (new Date(activity.start_date).getMonth() === initialMonth + 1) {
      return secondMonth.push(activity);
    } else {
      return currentMonth.push(activity);
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
        month: i + initialMonth,
        distance: previousValue.distance + currentValue.distance,
        moving_time: previousValue.moving_time + currentValue.moving_time,
        total_elevation_gain:
          previousValue.total_elevation_gain + currentValue.total_elevation_gain,
      };
    }, intialParameters);
    unifiedData.push(params);
  }

  const images = ["./runner.jpg", "./mountain_bike.jpg", "./tennis_player.jpg"];

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h3">Select a month to see your stats</Typography>
      </Grid>
      {unifiedData.map((month, index) => {
        return (
          <Grid item key={index} justifyContent="center" margin={2}>
            <MonthStat
              key={index}
              image={images[index]}
              month={month.month}
              totalDistance={Math.round(month.distance / 1000)}
              totalTime={timeHandler(month.moving_time)}
              totalElevationGain={Math.round(month.total_elevation_gain)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default RecentMonthsStats;
