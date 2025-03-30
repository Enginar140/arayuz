import React, { useState, useEffect, useRef } from 'react';

export default function Communication() {
  const [telemetryData, setTelemetryData] = useState({
    "iha_enlem": 0,
    "iha_boylam": 0,
    "iha_irtifa": 0,
    "iha_dikilme": 0,
    "iha_yonelme": 0,
    "iha_yatis": 0,
    "iha_hiz": 0,
    "iha_batarya": 0,
    "iha_otonom": 0,
    "iha_kilitlenme": 0,
    "hedef_merkez_X": 0,
    "hedef_merkez_Y": 0,
    "hedef_genislik": 0,
    "hedef_yukseklik": 0,
    "gps_saati": {
      "saat": 0,
      "dakika": 0,
      "saniye": 0,
      "milisaniye": 0
    }
  });

  const dataQueue = useRef([]);  // Veriyi doğrudan useRef ile saklıyoruz, render'ı tetiklemeden
  const [renderCounter, setRenderCounter] = useState(0); // Ekranı güncellemek için kullanılan sayaç

  // Veriyi kuyruğa ekleyip sadece son veriyi render edeceğiz
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/telemetry');

    eventSource.onmessage = function (event) {
      const data = JSON.parse(event.data);
      
      // Kuyruğa yeni veriyi ekle
      dataQueue.current = [...dataQueue.current, data];

      // Kuyruğa son 5 veriyi saklayalım
      if (dataQueue.current.length > 5) {
        dataQueue.current.shift();
      }

      // Veriyi yalnızca son gelen veriye göre render et
      setTelemetryData(dataQueue.current[dataQueue.current.length - 1]);
      setRenderCounter((prevCount) => prevCount + 1);  // Render sayacını arttır
    };

    eventSource.onerror = function () {
      console.error("Bir hata oluştu.");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="communication-container">
      <div className="camera-view">
        <h2>KAMERA GÖRÜNTÜSÜ</h2>
        <p>Burada kamera görüntüsü yer alacak.</p>
      </div>
      <div className="telemetry-view">
        <h2>TELEMETRİLER</h2>
        <div>
          <p><strong>Enlem:</strong> {telemetryData.iha_enlem}</p>
          <p><strong>Boylam:</strong> {telemetryData.iha_boylam}</p>
          <p><strong>İrtifa:</strong> {telemetryData.iha_irtifa} m</p>
          <p><strong>Dikilme (Pitch):</strong> {telemetryData.iha_dikilme}°</p>
          <p><strong>Yönelme (Yaw):</strong> {telemetryData.iha_yonelme}°</p>
          <p><strong>Yatış (Roll):</strong> {telemetryData.iha_yatis}°</p>
          <p><strong>Hız:</strong> {telemetryData.iha_hiz} m/s</p>
          <p><strong>Batarya:</strong> {telemetryData.iha_batarya}%</p>
          <p><strong>Otonomi Durumu:</strong> {telemetryData.iha_otonom === 1 ? 'Aktif' : 'Pasif'}</p>
          <p><strong>Kilitlenme Durumu:</strong> {telemetryData.iha_kilitlenme === 1 ? 'Kilitli' : 'Açık'}</p>

          <p><strong>Hedef Merkez X:</strong> {telemetryData.hedef_merkez_X}</p>
          <p><strong>Hedef Merkez Y:</strong> {telemetryData.hedef_merkez_Y}</p>
          <p><strong>Hedef Genişlik:</strong> {telemetryData.hedef_genislik}</p>
          <p><strong>Hedef Yükseklik:</strong> {telemetryData.hedef_yukseklik}</p>

          {/* GPS saatini kontrol etmeden kullanma, veri olup olmadığını kontrol et */}
          <p><strong>GPS Saati:</strong> 
            {telemetryData.gps_saati && telemetryData.gps_saati.saat !== undefined ? 
              `${telemetryData.gps_saati.saat}:${telemetryData.gps_saati.dakika}:${telemetryData.gps_saati.saniye}.${telemetryData.gps_saati.milisaniye}` : 
              "Veri yok"}
          </p>
        </div>
      </div>
    </div>
  );
}
