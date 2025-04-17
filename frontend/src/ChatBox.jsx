// frontend/src/ChatBox.jsx
import React, { useState } from 'react';
import './style.css';
import { callGPT } from './chat-gpt-api';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! Need help using the site? Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const formatMessagesForAPI = (msgs) =>
    msgs.map(m => ({ role: m.role, content: m.text }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await callGPT(formatMessagesForAPI(newMessages));
      const botMessage = { role: 'assistant', text: reply };
      setMessages([...newMessages, botMessage]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', text: 'Something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbox-embedded-wrapper">
      <div className="chatbox-header">AI Assistant</div>
      <div className="chatbox-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role === 'user' ? 'user' : 'bot'}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message bot">Typing...</div>}
      </div>
      <form onSubmit={handleSubmit} className="chatbox-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
