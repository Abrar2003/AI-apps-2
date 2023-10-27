import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chat = async (value) => {
  const { data } = await axios.post("https://peach-tick-robe.cyclic.app/text", {
    messages: value,
  });
  return data.message;
};

const Text = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textConvoRef = useRef(null); // Create a ref for the conversation container

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { role: "user", content: value };
    const updatedMessages = [...messages, newMessage];
  
    try {
      setIsLoading(true)
      const data = await Chat(updatedMessages);
      const assistantMessage = { role: "assistant", content: data };
      updatedMessages.push(assistantMessage); // Add the assistant's response to the messages
    } catch (error) {
      console.error("Error in chat:", error);
      // Handle the error as needed (e.g., show an error message to the user)
    } finally {
      setMessages(updatedMessages); // Update the messages state with both user and assistant messages
      setIsLoading(false);
    }
  
  };

  useEffect(() => {
    // Scroll to the bottom when the component mounts or when messages change
    if (textConvoRef.current) {
      textConvoRef.current.scrollTop = textConvoRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="text">
      <div
        ref={textConvoRef}
        className="text-convo"
        style={{
          maxHeight: "600px",
          overflowY: "scroll",
        }}
      >
        {messages.length
          ? messages.map((el, i) => (
              <div key={i} className="message">
                <p>
                  <span>{el.role}: </span>
                  {el.content}
                </p>
              </div>
            ))
          : "Please start your conversation"}
      </div>

      {isLoading && <div className="loading-indicator">Loading...</div>}

      <div className="input">
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Your message"
        />
        <button
          type="submit"
          onClick={(e) => {
            setMessages([...messages, { role: "user", content: value }]);
            handleSubmit(e);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Text;
