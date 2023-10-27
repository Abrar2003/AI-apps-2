import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Emotions = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let out = "";
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://peach-tick-robe.cyclic.app/analyze",
        { text }
      );
      out = data.result;
    } catch (error) {
      console.log(error);
    } finally {
      setOutput(out);
      setIsLoading(false);
    }
  };

  return (
    <div className="analyze">
      <h1>Emotion Recognition Service</h1>
      <div className="input">
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Your message"
        />
        <button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit
        </button>
      </div>
      <div>
        {isLoading ? (
          "...Loading"
        ) : (
          <div className="output">
            <h3>Response</h3>
            <p>{output}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Emotions;
