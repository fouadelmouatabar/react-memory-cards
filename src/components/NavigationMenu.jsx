import React from "react";
import { Link } from "react-router-dom";

function NavigationMenu() {
  return (
    <nav className="navigation-menu">
      <Link to="/">Game</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/history">History</Link>
    </nav>
  );
}

export default NavigationMenu;
