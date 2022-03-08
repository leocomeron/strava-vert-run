import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Activities from "./components/Activities";
import RecentMonthsStats from "./components/MonthlyStats";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Activities />} />
        <Route path="stats" element={<RecentMonthsStats />} />
      </Routes>
    </div>
  );
}

export default App;
