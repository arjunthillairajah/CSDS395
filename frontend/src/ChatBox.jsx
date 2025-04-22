import React, { useState } from 'react';
import './style.css';
import { callGPT } from './chat-gpt-api'; 

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Need help using the site? Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);


  const getResponse = async (userInput) => {
    try {
      const reply = await callGPT([{ role: 'user', content: userInput }]);
      return reply;
    } catch (err) {
      return "Sorry, I couldn't reach the AI assistant right now.";
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const botText = await getResponse(input);
    const botReply = { sender: 'bot', text: botText };
    setMessages((prev) => [...prev, botReply]);
  };

  return (
    <div className="chatbox-embedded-wrapper">
      <button className="chatbox-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✖' : '💬 Need Help?'}
      </button>

      {isOpen && (
        <div className="chatbox-container">
          <div className="chatbox-header">AI Assistant</div>
          <div className="chatbox-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
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
};

export default ChatBox;

