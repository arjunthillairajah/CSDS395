import React, { useState } from 'react';
import { callGPT } from './chat‑gpt‑api';
import './style.css';

export default function ChatBox() {
  const [msgs, setMsgs] = useState([
    { role:'assistant', text:'Hi! Ask me anything about the site.' }
  ]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const send = async e => {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;
    setMsgs(prev => [...prev, {role:'user',text:t}]);
    setInput('');
    try {
      const reply = await callGPT([{role:'user',text:t}]);
      setMsgs(prev => [...prev, {role:'assistant',text:reply}]);
    } catch(err) {
      console.error(err);
      setMsgs(prev => [...prev, {role:'assistant',text:"Sorry, error reaching the model."}]);
    }
  };

  return (
    <div className="chatbox-embedded-wrapper">
      <button className="chatbox-toggle-btn" onClick={()=>setOpen(!open)}>
        {open?'✖':'💬 Need Help?'}
      </button>
      {open && (
        <div className="chatbox-container">
          <div className="chatbox-header">AI Assistant</div>
          <div className="chatbox-messages">
            {msgs.map((m,i)=>(
              <div key={i} className={`message ${m.role==='user'?'user':'bot'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={send} className="chatbox-form">
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              placeholder="Ask about the site..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}


