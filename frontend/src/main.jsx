import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './App.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
const navDomNode = document.getElementById('app');
const navRoot = createRoot(navDomNode); 
navRoot.render(<app />);
