// apps/web/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import "./App.css";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      console.log('Service Worker registrado!');
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
