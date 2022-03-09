import { createSlice } from "@reduxjs/toolkit";

const initialSelectedMonthState = {
  selectedMonth: undefined,
};

const selectedMonthSlice = createSlice({
  name: "ImportatDates",
  initialState: initialSelectedMonthState,
  reducers: {
    selectSelectedMonth(state, action) {
      state.selectedMonth = action.payload;
    },
  },
});

export const selectedMonthActions = selectedMonthSlice.actions;

export default selectedMonthSlice.reducer;
