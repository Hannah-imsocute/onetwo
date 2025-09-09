import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Timer.css";

export default function Menubar() {
  const [time, setTime] = useState(100); // 시간바 퍼센트
  const [score, setScore] = useState(100);
  const nav = useNavigate();

  useEffect(() => {
    if (time === 0) {
      nav("/ranking", { replace: true });
    }

    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 100);

    return () => clearInterval(timer);
  }, [time, nav]);

  return (
    <div className="menubar-container">
      {/* 상단 메뉴바 */}
      <div className="menubar-top">
        {/* 시간바 */}
        <div className="timebar">
          <div className="timebar-fill" style={{ width: `${time}%` }}></div>
        </div>
      </div>
    </div>
  );
}
