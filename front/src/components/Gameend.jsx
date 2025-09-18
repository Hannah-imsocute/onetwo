import React from "react";
import { useNavigate } from "react-router-dom";
import "./gameend.css";
import { UseDispatchContext, UseStateContext } from "../App";
import { useContext } from "react";

function GameEnd() {
  const nav = useNavigate();
  const userInfo = useContext(UseStateContext);

  return (
    <div className="Game end-screen">
      <h1 className="end-title">게임 종료 🎉</h1>
      <div className="score-box">
        <span className="final-score">{userInfo.score}</span>
        <p className="score-label">최종 점수 </p>
      </div>

      <div className="end-actions">
        <button className="main-btn" onClick={() => nav("/")}>
          메인으로
        </button>
        <button className="rank-btn" onClick={() => nav("/ranking")}>
          랭킹 페이지
        </button>
      </div>
    </div>
  );
}

export default GameEnd;
