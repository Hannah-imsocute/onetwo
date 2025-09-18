import "./App.css";
import GameInfo from "./components/GameInfo";
import GameEnd from "./components/Gameend";
import Form from "./components/Form";
import Which from "./components/Which";
import Game from "./components/Game";
import Game2 from "./components/Game2";
import Game3 from "./components/Game3";
import Game4 from "./components/Game4";
import Game5 from "./components/Game5";
import Ranking from "./components/Ranking";
import { Routes, Route, Link } from "react-router-dom";
import { useState, createContext } from "react";

export const UseStateContext = createContext(); //데이터 공유
export const UseDispatchContext = createContext(); //데이터 변경 함수

function App() {
  const [userInfo, setUserInfo] = useState({
    id: null,
    name: "",
    fullNumber: "",
    hak: "",
    type: "",
    score: 0,
  });
  return (
    <UseStateContext.Provider value={userInfo}>
      <UseDispatchContext.Provider value={setUserInfo}>
        <Routes>
          <Route path="/" element={<Which />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/game" element={<Game />}></Route>
          <Route path="/game2" element={<Game2 />}></Route>
          <Route path="/game3" element={<Game3 />}></Route>
          <Route path="/game4" element={<Game4 />}></Route>
          <Route path="/game5" element={<Game5 />}></Route>
          <Route path="/ranking" element={<Ranking />}></Route>
          <Route path="/gameend" element={<GameEnd />}></Route>
          <Route path="/gameinfo" element={<GameInfo />}></Route>
        </Routes>
      </UseDispatchContext.Provider>
    </UseStateContext.Provider>
  );
}

export default App;
