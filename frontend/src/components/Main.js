import "../App.css";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="main">
      <div className="btns">
        <Link className="link" to={"/text"}>
          <button>Text Generation</button>
        </Link>
        <Link className="link" to={"/summarization"}>
          <button>Multi Doc Summarization</button>
        </Link>
        <Link className="link" to={"/emotions"}>
          <button>Emotion Recognition</button>
        </Link>
      </div>
      <div className="home">
        <Link className="link" to={"/"}>
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
