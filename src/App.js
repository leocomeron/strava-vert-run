import { Routes, Route } from "react-router-dom";

import "./App.css";
import Activities from "./components/Activities";
import RecentMonthsStats from "./components/MonthlyStats";

import { useSelector } from "react-redux";
import SelectedMonthActivities from "./components/SelectedMonthActivities";

function App() {
  const month = useSelector((state) => state.selectedMonth);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            month.selectedMonth === undefined ? (
              <Activities />
            ) : (
              <SelectedMonthActivities selectedMonth={month.selectedMonth} />
            )
          }
        />

        <Route path="stats" element={<RecentMonthsStats />} />
      </Routes>
    </div>
  );
}

export default App;
