import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from '@context/index';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
