import React, { useState } from 'react';
import FileRead from './components/FileRead';
import AddressSearch from './components/AddressSearch';
import KakaoMap from './components/KakaoMap';

function App() {
  const [data, setData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [nearbyMarkers, setNearbyMarkers] = useState([]);
  const [radius, setRadius] = useState(30000); // 기본 반경 30km

  return (
    <div className="App">
      <AddressSearch onAddressSelect={setSelectedAddress} />
      <FileRead onDataLoad={setData} />
      <div>
        <label>반경 선택: </label>
        <select value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
          <option value={10000}>10km</option>
          <option value={20000}>20km</option>
          <option value={30000}>30km</option>
        </select>
      </div>
      {data && <KakaoMap data={data} selectedAddress={selectedAddress} radius={radius} onNearbyMarkers={setNearbyMarkers} />}
      <div>
        <h3>선택된 반경 내의 마커 리스트</h3>
        <ul>
          {nearbyMarkers.map((markerObj, index) => (
            <li key={index}>{markerObj.marker.getTitle()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
