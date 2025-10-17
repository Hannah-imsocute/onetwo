import React from "react";
import { useNavigate } from "react-router-dom";
import "./gameinfo.css";
import gameex from "../img/gameex.gif";

const targetBall = "./img/img3.png"; // Game.js의 targetImage와 동일하게 맞추세요

function GameInfo() {
  const nav = useNavigate();

  return (
    <div className="info-screen">
      <h1 className="info-title">⚽ 게임 설명</h1>

      {/* 기본 설명 박스 */}
      <div className="rule-box">
        <p className="rule-text">
          화면에 여러 개의 공이 랜덤으로 나타납니다.
          <br />
          아래에 제시된 <span className="highlight">정답 공</span>을 클릭하세요!
        </p>
        <p className="rule-text">
          잘 맞추면 <strong>점수 획득</strong>, 틀리면 <strong>감점</strong> 😢
        </p>
        <p className="rule-text">
          제한 시간 안에 <strong>목표 점수</strong>를 달성하면 <br />
          다음 스테이지로 넘어갑니다.
        </p>
      </div>

      {/* 정답 공 안내 */}
      <div className="target-box">
        <p className="target-label">스테이지의 정답 공</p>
        <img src={targetBall} alt="정답 공" className="target-ball" />
      </div>

      {/* 스테이지 규칙 안내 */}
      <div className="stage-rules">
        <h2 className="stage-title">📌 스테이지별 규칙</h2>
        <table className="stage-table">
          <thead>
            <tr>
              <th>Stage</th>
              <th>정답 / 오답 점수</th>
              <th>목표 점수</th>
              <th>제한 시간</th>
              <th>공 교체 속도</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>+10 / -4</td>
              <td>50점</td>
              <td>10초</td>
              <td>1초</td>
            </tr>
            <tr>
              <td>2</td>
              <td>+20 / -11</td>
              <td>150점</td>
              <td>8.5초</td>
              <td>0.9초</td>
            </tr>
            <tr>
              <td>3</td>
              <td>+40 / -23</td>
              <td>350점</td>
              <td>7.5초</td>
              <td>0.8초</td>
            </tr>
            <tr>
              <td>4</td>
              <td>+75 / -35</td>
              <td>600점</td>
              <td>6.5초</td>
              <td>0.6초</td>
            </tr>
            <tr>
              <td>5</td>
              <td>+125 / -60</td>
              <td>최종</td>
              <td>5초</td>
              <td>0.4초</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 게임 예시 섹션 */}
      <div className="game-demo-section">
        <h2 className="demo-title">게임예시</h2>
        <div className="demo-gif-wrapper">
          <img src={gameex} alt="게임 플레이 예시" className="demo-gif" />
        </div>
      </div>

      <button className="start-btn" onClick={() => nav("/game")}>
        게임 시작 ▶
      </button>
    </div>
  );
}

export default GameInfo;
