import React, { useEffect, useState, useRef } from "react";
import Menuba from "./Timer";
import "./game.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const ballImages = [
  "./img/img1.png",
  "./img/img2.png",
  "./img/img3.png",
  "./img/img4.png",
];

function Game3() {
  const [balls, setBalls] = useState(generateRandomBalls());
  const [gameOver, setGameOver] = useState(false); // 점수 달성 → 게임 종료
  const [timeLeft, setTimeLeft] = useState(100); // 타이머바 진행도
  const [timeOver, setTimeOver] = useState(false); // 타이머만 끝난 상태
  const targetImage = ballImages[2];
  const intervalRef = useRef(null); // 공 섞기용
  const timerRef = useRef(null); // 타이머바용

  const location = useLocation();
  const game2Score = location.state?.game2Score;
  const [score, setScore] = useState(game2Score);

  const nav = useNavigate();

  function generateRandomBalls() {
    const arr = [];
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * ballImages.length);
      arr.push(ballImages[randomIndex]);
    }
    return arr;
  }

  // 공 섞기 타이머
  const startBallTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setBalls(generateRandomBalls());
    }, 800);
  };

  // 타이머바 시작
  const startTimeBar = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(100);
    setTimeOver(false); // 새 라운드 시작 시 다시 활성화
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setTimeOver(true); // 타이머 끝 → 클릭 불가
          return 0;
        }
        return prev - 1;
      });
    }, 75); // 100ms마다 1씩 줄이면 10초짜리 타이머
  };

  // 게임 시작 시
  useEffect(() => {
    if (!gameOver) {
      startBallTimer();
      startTimeBar();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameOver]);

  // 점수 달성 → 게임 종료
  useEffect(() => {
    if (score >= 350) {
      setGameOver(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      nav("/game4", { replace: true, state: { game3Score: score } });
    }
  }, [score, nav]);

  const handleClick = (clickedImage) => {
    if (gameOver || timeOver) return; // 게임 끝 or 타임오버면 클릭 불가

    if (clickedImage === targetImage) {
      setScore((prev) => prev + 40);
    } else {
      setScore((prev) => prev - 23);
    }

    setBalls(generateRandomBalls());

    // 클릭 시 타이머 리셋
    startBallTimer();
    startTimeBar();
  };

  return (
    <div className="Game">
      <Menuba score={score} />

      <h1>Score : {score}</h1>

      {gameOver && <h2 className="game-over">🎉 게임 종료!</h2>}

      {/* 타이머바 */}
      <div className="timer-bar">
        <div className="timer-fill" style={{ width: `${timeLeft}%` }}></div>
      </div>

      <div className="stage-container">
        <div className="stage-label">Stage 3</div>
        <div className="grid">
          {balls.map((ball, idx) => (
            <div key={idx} className="cell">
              <img
                src={ball}
                alt="soccer ball"
                onClick={() => handleClick(ball)}
                style={{
                  cursor: gameOver || timeOver ? "not-allowed" : "pointer",
                  opacity: timeOver ? 0.5 : 1, // 타이머 끝났을 때 흐리게
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game3;
