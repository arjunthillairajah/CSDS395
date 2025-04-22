// frontend/src/ChatBox.jsx
import React, { useState } from "react";
import { callGPT }       from "./chat-gpt-api.js";  
import "./style.css";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Need help using the site? Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((m) => [...m, userMessage]);
    setInput("");

    const botText = await callGPT([{ role: "user", text: input }]);
    setMessages((m) => [...m, { sender: "bot", text: botText }]);
  };

  return (
    <div className="chatbox-embedded-wrapper">
      <button
        className="chatbox-toggle-btn"
        onClick={() => setIsOpen((o) => !o)}
      >
        {isOpen ? "✖" : "💬 Need Help?"}
      </button>

      {isOpen && (
        <div className="chatbox-container">
          <div className="chatbox-header">AI Assistant</div>
          <div className="chatbox-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="chatbox-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about the site..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
