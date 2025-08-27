import "./Which.css";
import { useNavigate } from "react-router-dom";
const Which = () => {
  const nav = useNavigate();
  return (
    <div className="Which">
      <h1 className="which-title">Which Is My Ball?</h1>
      <button className="start" onClick={() => nav("/form")}>
        start
      </button>
    </div>
  );
};

export default Which;
