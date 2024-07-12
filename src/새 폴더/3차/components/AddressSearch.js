// AddressSearch.js
import React, { useState } from 'react';

const AddressSearch = ({ onAddressSelect }) => {
  const [zonecode, setZonecode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');

  const handleClick = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        const roadAddr = data.roadAddress;
        let extraRoadAddr = '';

        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }

        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }

        if (extraRoadAddr !== '') {
          extraRoadAddr = ' (' + extraRoadAddr + ')';
        }

        setZonecode(data.zonecode);
        setRoadAddress(roadAddr);
        setJibunAddress(data.jibunAddress);

        onAddressSelect({
          zonecode: data.zonecode,
          roadAddress: roadAddr,
          jibunAddress: data.jibunAddress
        });
      }
    }).open();
  };

  return (
    <div>
      <h2>주소 검색</h2>
      <input type="text" value={zonecode} placeholder="우편번호" disabled style={{ backgroundColor: '#f0f0f0' }} />
      <input type="button" onClick={handleClick} value="우편번호 찾기" /><br />
      <input type="text" value={roadAddress} placeholder="도로명주소" disabled style={{ backgroundColor: '#f0f0f0' }} />
      <input type="text" value={jibunAddress} placeholder="지번주소" disabled style={{ backgroundColor: '#f0f0f0' }} />
    </div>
  );
};

export default AddressSearch;
