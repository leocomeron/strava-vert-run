import { configureStore } from "@reduxjs/toolkit";

import activitiesReducer from "./activities";
import datesReducer from "./dates";
import selectedMonthReducer from "./selectedMonth";

const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    dates: datesReducer,
    selectedMonth: selectedMonthReducer,
  },
});

export default store;
