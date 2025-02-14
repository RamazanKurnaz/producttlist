import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root')!;
rootElement.style.width = '100%';
rootElement.style.maxWidth = '100%';
rootElement.style.margin = '0';
rootElement.style.padding = '0';
rootElement.style.overflow = 'hidden';

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
