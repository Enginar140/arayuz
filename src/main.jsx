// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './App';
import './Dashboard.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>
);
