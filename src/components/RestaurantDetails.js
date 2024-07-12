import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/styles.css'; // 스타일 파일을 불러옵니다

const { kakao } = window;

function RestaurantDetails({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = data ? data.find(r => r.res_num === id) : null;

  useEffect(() => {
    if (restaurant) {
      const mapContainer = document.getElementById('map'); // 지도를 표시할 div
      const mapOption = {
        center: new kakao.maps.LatLng(restaurant.lat, restaurant.lon), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);

      // 마커가 표시될 위치입니다
      const markerPosition = new kakao.maps.LatLng(restaurant.lat, restaurant.lon);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: markerPosition
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

      const iwContent = '<div style="padding:5px; width:150px; text-align:center;">위치</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      const iwPosition = new kakao.maps.LatLng(restaurant.lat, restaurant.lon); // 인포윈도우 표시 위치입니다

      // 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent
      });

      // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
      infowindow.open(map, marker);
    }
  }, [restaurant]);

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  if (!restaurant) {
    return <div>레스토랑 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="restaurant-details-container">
      <h1>{restaurant.res_name}</h1>
      <div id="map"></div>
      <div className='resInfo'>

      <img src={restaurant.img} alt={restaurant.res_name} />
      <div className="info-section">
        <p><strong>전화번호</strong> <br/>{restaurant.tell}</p>
        <p><strong>주소</strong> <br/>{restaurant.address1}</p>
        <p><strong>주소</strong> <br/>{restaurant.address2}</p>
        <p><strong>종류</strong> <br/>{restaurant.type}</p>
        <p><strong>메뉴</strong> <br/>{restaurant.menu}</p>
        <p><strong>정보</strong> <br/>{restaurant.info}</p>
      </div>
      </div>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
}

export default RestaurantDetails;
