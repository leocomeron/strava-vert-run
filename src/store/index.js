import { configureStore } from "@reduxjs/toolkit";

import activitiesReducer from "./activities";
import datesReducer from "./dates";

const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    dates: datesReducer,
  },
});

export default store;
