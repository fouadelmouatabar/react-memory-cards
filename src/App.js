import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import Settings from "./components/Settings";
import History from "./components/History";
import NavigationMenu from "./components/NavigationMenu";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
