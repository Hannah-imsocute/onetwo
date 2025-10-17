import React from "react";
import "./Timer.css";

export default function Timer({ timeLeft }) {
  return (
    <div className="menubar-container">
      <div className="menubar-top">
        <div className="timebar">
          <div className="timebar-fill" style={{ width: `${timeLeft}%` }}></div>
        </div>
      </div>
    </div>
  );
}
