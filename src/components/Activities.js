import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { activitiesActions } from "../store/activities";
import { datesActions } from "../store/dates";

const Activities = () => {
  const data = useSelector((state) => state.activities);
  const dates = useSelector((state) => state.dates);

  const dispatch = useDispatch();

  const fetchData = async () => {
    const auth_link = "https://www.strava.com/oauth/token";

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

      const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=7902148a7d7c4547c245f5948905f57f422f2024&per_page=${maxNumOfActivities}&before=${todayInEpoch}&after=${initialDateInEpoch}`;

      await axios.get(activities_link).then(function (response) {
        dispatch(activitiesActions.selectActivities(response.data));
      });
    };

    function reAuthorize() {
      axios
        .post(auth_link, {
          client_id: "78996",
          client_secret: "9e34535d5f6e344afe518fdfcfdd1044e8fffd49",
          refresh_token: "5bc757936d9ce7231fae7938d3fdd5db7565c540",
          grant_type: "refresh_token",
        })
        .then(function (response) {
          getActivites(response);
        });
    }
    reAuthorize();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dateHandler = (date) => {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);

    return `${day}-${month}-${year}`;
  };

  const timeHandler = (time) => {
    return new Date(time * 1000).toISOString().substr(11, 8);
  };

  return (
    <div>
      <Link to="/stats">
        <button>See last 3 month stats</button>
      </Link>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Distance (km)</th>
            <th>Time</th>
            <th>Elevation gain (m)</th>
          </tr>

          {data.activities.map((workout) => {
            return (
              <tr key={workout.upload_id}>
                <td>{workout.name}</td>
                <td>{dateHandler(workout.start_date)}</td>
                <td>{(workout.distance / 1000).toFixed(2)}</td>
                <td>{timeHandler(workout.moving_time)}</td>
                <td>{Math.round(workout.total_elevation_gain)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Activities;
