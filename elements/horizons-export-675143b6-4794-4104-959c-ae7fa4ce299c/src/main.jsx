import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { AudioProvider } from '@/context/AudioContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AudioProvider>
        <App />
      </AudioProvider>
    </Router>
  </React.StrictMode>
);