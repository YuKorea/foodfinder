// App.js
import React, { useState } from 'react';
import FileRead from './components/FileRead';
import AddressSearch from './components/AddressSearch';
import KakaoMap from './components/KakaoMap';

function App() {
  const [data, setData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <div className="App">
      <AddressSearch onAddressSelect={setSelectedAddress} />
      <FileRead onDataLoad={setData} />
      {data && <KakaoMap data={data} selectedAddress={selectedAddress} />}
    </div>
  );
}

export default App;
