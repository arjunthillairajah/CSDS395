import React, { useState } from 'react';
import './style.css'; 

const ChatBox = () => {
  
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Need help using the site? Ask me anything!' }
  ]);

 
  const [input, setInput] = useState('');

  
  const [isOpen, setIsOpen] = useState(false);

  
  const responses = {
  hi: 'Hello there! 😊 How can I assist you today?',
  hello: 'Hey! Let me know if you have any questions.',
  upload: 'To upload an image, click the upload button on the homepage and select a clear photo of your skin condition.',
  result: 'Once uploaded, the system will analyze the image and return a result with confidence scores.',
  privacy: 'Your data is encrypted and anonymized. We do not store identifying information.',
  care: 'We provide general skin care advice, but always consult a medical professional if needed.',
  symptoms: 'If you notice itching, redness, or unusual skin texture, it\'s best to consult a dermatologist.',
  dangerous: 'Some skin conditions may be dangerous. If a mole changes in shape, size, or color, see a doctor.',
  treatment: 'Treatment depends on the condition. Our system gives general insight, but please consult a medical professional.',
  accuracy: 'Our model gives a preliminary analysis. Always follow up with a licensed dermatologist.',
  cost: 'This service is currently free to use for initial diagnosis.',
  cancer: 'If you are concerned about skin cancer, please contact a licensed medical professional immediately.',
  location: 'We don’t use your location. Your images are private and secure.',
  time: 'Results usually appear within a few seconds after upload.',
  insurance: 'No insurance is needed — this AI tool is accessible to everyone.',
  languages: 'We currently support English. More languages will be supported soon!',
};

  
  const getResponse = (userInput) => {
    const lower = userInput.toLowerCase();
    for (const keyword in responses) {
      if (lower.includes(keyword)) {
        return responses[keyword];
      }
    }
    return "Sorry, I didn't understand that. Try asking about uploading, results, or privacy.";
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    
    const userMessage = { sender: 'user', text: input };
    
    const botReply = { sender: 'bot', text: getResponse(input) };

   
    setMessages([...messages, userMessage, botReply]);
    setInput('');
  };

  return (
    
    <div className="chatbox-embedded-wrapper">
      {/* Button to open/close the chat */}
      <button className="chatbox-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✖' : '💬 Need Help?'}
      </button>

      {/* Conditionally render the chat window */}
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


