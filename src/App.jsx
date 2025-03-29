// src/App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Control from './Control';         // Doğru import
import Communication from './Communication'; // Doğru import
import './Dashboard.css';

export default function Dashboard() {
  return (
    <Router>
      <div className="dashboard-container">
        <div className="nav-bar">
          <Link to="/" className="nav-button">Kontrol</Link>
          <Link to="/communication" className="nav-button">İletişim</Link>
          <button className="nav-button">Hakkında</button>
          <button className="nav-button">Log</button>
        </div>

        <Routes>
          <Route path="/" element={<Control />} />
          <Route path="/communication" element={<Communication />} />
        </Routes>
      </div>
    </Router>
  );
}
