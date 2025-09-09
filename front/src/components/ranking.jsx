import { useState, useMemo } from "react";
import "./Ranking.css";
//더미데이터 생성
function generateUniquePhoneNumbers(count) {
  const set = new Set();
  while (set.size < count) {
    const phone = Math.floor(1000 + Math.random() * 9000).toString();
    set.add(phone);
  }
  return Array.from(set);
}

function generateRankingData(count) {
  const phoneNumbers = generateUniquePhoneNumbers(count);
  return phoneNumbers.map((phone, i) => ({
    id: i + 1,
    name: phone,
    score: 1500 - i * 10,
  }));
}

export default function Ranking() {
  const [searchTerm, setSearchTerm] = useState("");

  // 1000명 데이터 한 번만 생성
  const rankingData = useMemo(() => generateRankingData(1000), []);

  let filteredData;

  if (searchTerm) {
    // 검색어 있으면 전체에서 정확 일치하는 플레이어만 필터링
    filteredData = rankingData.filter(
      (player) => player.name.toLowerCase() === searchTerm.toLowerCase()
    );
  } else {
    // 검색어 없으면 100등까지만 보여줌
    filteredData = rankingData.slice(0, 100);
  }

  return (
    <div className="ranking-page">
      <h1 className="title">🏆 실시간 랭킹</h1>

      <input
        type="text"
        placeholder="전화번호 뒷자리 입력"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredData.length === 0 ? (
        <p className="no-results">검색 결과가 없습니다 😢</p>
      ) : (
        <ul className="ranking-list">
          {filteredData.map((player) => {
            const originalIndex = rankingData.findIndex(
              (p) => p.id === player.id
            );
            const rank = originalIndex + 1;

            let rankClass = "";
            if (rank === 1) rankClass = "first";
            else if (rank === 2) rankClass = "second";
            else if (rank === 3) rankClass = "third";

            return (
              <li key={player.id} className={`ranking-item ${rankClass}`}>
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
