import { useState, useEffect } from "react";
import "./Ranking.css";

export default function Ranking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    fetch(`http://192.168.0.11:8080/api/top`)
      .then((res) => res.json())
      .then((data) => setRankingData(data))
      .catch((err) => console.error("랭킹 데이터 로딩 실패:", err));
  }, []);

  const filteredData = searchTerm
    ? rankingData.filter((player) =>
        player.phone.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : rankingData;

  return (
    <div className="ranking-page">
      <h1 className="title">🏆 실시간 랭킹</h1>

      <input
        type="text"
        placeholder="전화번호 뒷자리로 검색"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredData.length === 0 ? (
        <p className="no-results">랭킹 정보가 없습니다 😢</p>
      ) : (
        <ul className="ranking-list">
          {filteredData.map((player, index) => {
            const rank = index + 1; // 배열 순서대로 랭킹 부여

            let rankClass = "";
            if (rank === 1) rankClass = "first";
            else if (rank === 2) rankClass = "second";
            else if (rank === 3) rankClass = "third";

            return (
              <li
                key={player.id || index}
                className={`ranking-item ${rankClass}`}
              >
                <span className="rank">{rank}</span>
                <span className="name">{player.name}</span>
                <span className="score">{player.score} pts</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// [
//   { "id": 1, "name": "1234", "score": 1500 },
//   { "id": 2, "name": "5678", "score": 1490 },
//   { "id": 3, "name": "9012", "score": 1480 }
// 받는 형태 예시..]
