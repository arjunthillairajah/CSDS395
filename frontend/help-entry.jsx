
import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatBox from './ChatBox';

const root = createRoot(document.getElementById('chatbox-root'));
root.render(<ChatBox />);

