// help-entry.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatBox from './ChatBox'; 

const container = document.getElementById('chatbox-root');
createRoot(container).render(<ChatBox />);
