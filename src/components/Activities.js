import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { activitiesActions } from "../store/activities";
import { datesActions } from "../store/dates";
import TableHeader from "./TableHeader";
import TableData from "./TableData";

const Activities = () => {
  const [access_token, setAccess_token] = useState();
  const data = useSelector((state) => state.activities);
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
          getActivites();
        });
    };
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
          <TableHeader />
          {data.activities.map((activity) => {
            return (
              <TableData
                key={activity.upload_id}
                name={activity.name}
                startDate={dateHandler(activity.start_date)}
                distance={(activity.distance / 1000).toFixed(2)}
                movingTime={timeHandler(activity.moving_time)}
                totalElevationGain={Math.round(activity.total_elevation_gain)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Activities;
