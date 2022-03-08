import { createSlice } from "@reduxjs/toolkit";

const initialActivitiesState = {
  activities: [],
};

const activitiesSlice = createSlice({
  name: "fetchedActivities",
  initialState: initialActivitiesState,
  reducers: {
    selectActivities(state, action) {
      state.activities = action.payload;
    },
  },
});

export const activitiesActions = activitiesSlice.actions;

export default activitiesSlice.reducer;
