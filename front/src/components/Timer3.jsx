import React, { useState, useEffect, useCallback, useContext } from "react";
import { UseStateContext, UseDispatchContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Timer.css";

export default function Menubar({ score }) {
  const [time, setTime] = useState(100); // 시작값 100
  const nav = useNavigate();
  const userInfo = useContext(UseStateContext);
  const setUserInfo = useContext(UseDispatchContext);
  // 백엔드로 점수 전송 함수
  const sendScoreToBackend = useCallback(
    async (finalScore) => {
      try {
        console.log("전송할 데이터:", { id: userInfo.id, score: finalScore });
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

  useEffect(() => {
    // 타이머 시작 (100ms마다 1씩 줄어듦)
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // 0 되면 멈춤
          // 타이머 종료 시 점수를 백엔드로 전송
          sendScoreToBackend(score);
          nav("/gameend", { replace: true }); // 페이지 이동
          return 0;
        }
        return prev - 1;
      });
    }, 100);

    // 컴포넌트가 사라질 때 interval 정리
    return () => clearInterval(timer);
  }, [nav, score, sendScoreToBackend]);

  // (선택) 타이머를 다시 100으로 초기화하고 싶으면
  // setTime(100); 을 특정 이벤트(게임 시작 버튼, stage 시작 등)에서 호출하면 됨.

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
