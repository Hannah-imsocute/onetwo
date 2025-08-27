import "./App.css";
import Form from "./components/Form";
import Which from "./components/Which";
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Which />}></Route>
        <Route path="/form" element={<Form />}></Route>
      </Routes>
    </>
  );
}

export default App;
