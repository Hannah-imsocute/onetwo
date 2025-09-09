import "./App.css";
import Form from "./components/Form";
import Which from "./components/Which";
import Game from "./components/Game";
import Ranking from "./components/Ranking";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Which />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="/ranking" element={<Ranking />}></Route>
      </Routes>
    </>
  );
}

export default App;
