import { createSlice } from "@reduxjs/toolkit";

const initialDatesState = {
  dates: [],
};

const datesSlice = createSlice({
  name: "ImportatDates",
  initialState: initialDatesState,
  reducers: {
    selectDates(state, action) {
      state.dates = action.payload;
    },
  },
});

export const datesActions = datesSlice.actions;

export default datesSlice.reducer;
