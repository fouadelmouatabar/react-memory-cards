import React, { useState, useEffect } from "react";

function Settings() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [gameMode, setGameMode] = useState(16);

  // Load settings from local storage on mount
  useEffect(() => {
    const storedColor = localStorage.getItem("backgroundColor");
    const storedMode = localStorage.getItem("gameMode");
    if (storedColor) setBackgroundColor(storedColor);
    if (storedMode) setGameMode(Number(storedMode));
  }, []);

  // Save settings to local storage
  const saveSettings = () => {
    localStorage.setItem("backgroundColor", backgroundColor);
    localStorage.setItem("gameMode", gameMode);
    alert("Settings saved!");
  };

  return (
    <div className="content-wrap">
      <div className="settings">
        <h1>Settings</h1>
        <label>
          Background Color:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </label>
        <br />
        <label>
          Game Mode:
          <select
            value={gameMode}
            onChange={(e) => setGameMode(Number(e.target.value))}
          >
            <option value={4}>Mode 4 (2x2)</option>
            <option value={16}>Mode 16 (4x4)</option>
            <option value={36}>Mode 36 (6x6)</option>
          </select>
        </label>
        <br />
        <button onClick={saveSettings}>Save Settings</button>
      </div>
    </div>
  );
}

export default Settings;
