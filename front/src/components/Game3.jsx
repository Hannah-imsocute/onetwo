import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import { UseStateContext, UseDispatchContext } from "../App";
import { useNavigate, useLocation } from "react-router-dom";
import Timer from "./Timer"; // 컴포넌트 이름을 Menubar로 수정했습니다.
import "./game.css";

const ballImages = [
  "./img/img1.png",
  "./img/img2.png",
  "./img/img3.png",
  "./img/img4.png",
];

function Game3() {
  const userInfo = useContext(UseStateContext);
  const setUserInfo = useContext(UseDispatchContext);
  const [balls, setBalls] = useState(generateRandomBalls());
  const location = useLocation();
  const game2Score = location.state?.game2Score;
  const [score, setScore] = useState(game2Score);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100); // UI 타이머용 상태
  const targetImage = ballImages[2];
  const intervalRef = useRef(null); // 공 섞기용
  const timerRef = useRef(null); // 타이머바 및 게임 종료용

  // ★★★ 추가된 부분: 오디오 레퍼런스 ★★★
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  const nav = useNavigate();

  // ★★★ 추가된 부분: 컴포넌트 마운트 시 오디오 객체 생성 ★★★
  useEffect(() => {
    correctSoundRef.current = new Audio("./sounds/correct.mp3"); // 정답 소리
    wrongSoundRef.current = new Audio("./sounds/wrong.mp3"); // 오답 소리

    // 볼륨 설정 (선택사항)
    correctSoundRef.current.volume = 0.5;
    wrongSoundRef.current.volume = 0.5;
  }, []); // 마운트 시 한 번만 실행

  function generateRandomBalls() {
    const arr = [];
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * ballImages.length);
      arr.push(ballImages[randomIndex]);
    }
    return arr;
  }

  // ★★★ 추가된 부분: 소리 재생 함수 ★★★
  const playSound = (isCorrect) => {
    try {
      if (isCorrect) {
        correctSoundRef.current.currentTime = 0; // 처음부터 재생
        correctSoundRef.current.play();
      } else {
        wrongSoundRef.current.currentTime = 0;
        wrongSoundRef.current.play();
      }
    } catch (error) {
      console.log("소리 재생 실패:", error);
    }
  };

  // 백엔드로 점수 전송 함수
  const sendScoreToBackend = useCallback(
    async (finalScore) => {
      try {
        const response = await fetch(
          `http://172.30.1.49:8080/api/save?id=${userInfo.id}&score=${finalScore}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log("점수가 성공적으로 전송되었습니다:", finalScore);
          setUserInfo((prev) => ({
            ...prev,
            score: finalScore,
          }));

          console.log("Context 점수 업데이트 완료:", finalScore);
        } else {
          console.error("점수 전송 실패:", response.statusText);
        }
      } catch (error) {
        console.error("점수 전송 중 오류 발생:", error);
      }
    },
    [userInfo.id, setUserInfo]
  );
  // 공 섞기 타이머
  const startBallTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setBalls(generateRandomBalls());
    }, 800);
  };

  // 타이머바 및 게임 로직 타이머
  const startTimeBarAndGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(100); // 타이머 초기화
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);

          // 타임 오버 시 점수 전송 및 페이지 이동
          sendScoreToBackend(score);
          nav("/gameend", { replace: true });

          return 0;
        }
        return prev - 1;
      });
    }, 75); // 100ms마다 1씩 줄어들어 총 10초 타이머
  };

  // 게임 시작 시 타이머 실행
  useEffect(() => {
    if (!gameOver) {
      startBallTimer();
      startTimeBarAndGame();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameOver]); // 의존성 배열에 score, nav 대신 gameOver만 남김 (score, nav는 sendScoreToBackend, nav 호출 시점에만 필요)

  // 점수 달성 시 게임 종료 및 페이지 이동
  useEffect(() => {
    if (score >= 350) {
      setGameOver(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);

      // 점수 달성 시 점수 전송 및 페이지 이동
      nav("/game4", { replace: true, state: { game3Score: score } });
    }
  }, [score, nav]); // sendScoreToBackend를 의존성 배열에 추가

  const handleClick = (clickedImage) => {
    if (gameOver || timeLeft <= 0) return;

    if (clickedImage === targetImage) {
      setScore((prev) => prev + 40);
      playSound(true); // ★★★ 추가된 부분: 정답 소리 재생 ★★★
    } else {
      setScore((prev) => prev - 23);
      playSound(false); // ★★★ 추가된 부분: 오답 소리 재생 ★★★
    }

    // 클릭 시 타이머 리셋
    setBalls(generateRandomBalls());
    startBallTimer();
  };

  return (
    <div className="Game">
      <Timer score={score} timeLeft={timeLeft} />
      <img src="./img/img5.png" alt="화살표" className="back" />
      <h1>Score : {score}</h1>

      {gameOver && <h2 className="game-over">🎉 게임 종료!</h2>}

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
                  cursor: gameOver || timeLeft <= 0 ? "not-allowed" : "pointer",
                  opacity: timeLeft <= 0 ? 0.5 : 1,
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
