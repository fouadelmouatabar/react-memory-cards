import React, { useState, useEffect } from "react";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <div className="content-wrap">
      <div className="history">
        <h1>Game History</h1>
        {history.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Game Mode</th>
                <th>Moves</th>
                <th>Time (seconds)</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.mode}</td>
                  <td>{record.moves}</td>
                  <td>{record.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No history available yet.</p>
        )}
      </div>
    </div>
  );
}

export default History;
