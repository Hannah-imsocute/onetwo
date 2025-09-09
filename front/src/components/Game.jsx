import React, { useEffect, useState } from "react";
import "./game.css";
import { useNavigate } from "react-router-dom";
import Menubar from "./Timer";
const ballImages = [
  "./img/img1.png",
  "./img/img2.png",
  "./img/img3.png",
  "./img/img4.png",
];

function Game() {
  const nav = useNavigate();
  const [balls, setBalls] = useState(generateRandomBalls());
  const [score, setScore] = useState(0); // 점수 상태
  const targetImage = ballImages[2]; // 정답 이미지 (img3)

  function generateRandomBalls() {
    const arr = [];
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * ballImages.length);
      arr.push(ballImages[randomIndex]);
    }
    return arr;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setBalls(generateRandomBalls());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (clickedImage) => {
    if (clickedImage === targetImage) {
      setScore((prev) => prev + 10); // 정답 → 점수 올리기
      setBalls(generateRandomBalls()); // 정답 맞추면 게임판 리셋
    } else {
      setScore((prev) => prev - 5); // 오답 → 점수 깎기
    }
  };

  return (
    <div className="Game">
      <Menubar />
      <img src="./img/img5.png" alt="화살표" className="back" />
      <h1>Score : {score}</h1>
      <div className="stage-container">
        <div className="stage-label">Stage 1</div>

        <div className="grid">
          {balls.map((ball, idx) => (
            <div key={idx} className="cell">
              <img
                src={ball}
                alt="soccer ball"
                onClick={() => handleClick(ball)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
