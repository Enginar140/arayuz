// src/Control.jsx
import React, { useState, useEffect } from 'react';

export default function Control() {
  const [status, setStatus] = useState("Durum bilgisi yükleniyor...");
  const [simulationData, setSimulationData] = useState("Simülasyon verisi yükleniyor...");
  const [log, setLog] = useState("Log bilgisi yükleniyor...");

  useEffect(() => {
    fetch("http://localhost:5000/status")
      .then((res) => res.json())
      .then((data) => setStatus(data.message));

    fetch("http://localhost:5000/simulation")
      .then((res) => res.json())
      .then((data) => setSimulationData(data.message));

    fetch("http://localhost:5000/log")
      .then((res) => res.json())
      .then((data) => setLog(data.message));
  }, []);

  return (
    <div className="control-container">
      <div className="status-screen">
        <h2>Durum Ekranı</h2>
        <p>{status}</p>
      </div>
      <div className="buttons-panel">
        <h2>Butonlar</h2>
        <button className="start-button">Başlat</button>
      </div>
      <div className="simulation-screen">
        <h2>Simülasyon Ekranı</h2>
        <p>{simulationData}</p>
      </div>
      <div className="log-panel">
        <h2>Log</h2>
        <p>{log}</p>
      </div>
    </div>
  );
}
