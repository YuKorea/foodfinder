import React, { useEffect, useRef } from 'react';
const { kakao } = window;

export default function KakaoMap({ data, selectedAddress }) {
  // 스타일 설정
  const style = {
    width: '1000px',
    height: '400px',
    border: '1px solid black',
    margin: '0 auto'
  };

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const addressMarkerRef = useRef(null);

  useEffect(() => {
    // 한반도의 정중앙 지점 좌표 설정
    const centerCoords = new kakao.maps.LatLng(36.060417, 128.033972);

    // 지도 옵션 설정 (초기 중심 좌표와 확대 레벨)
    const mapOption = {
      center: centerCoords,
      level: 13
    };

    // 지도 생성 (한 번만 생성되도록 함)
    if (!mapRef.current) {
      mapRef.current = new kakao.maps.Map(mapContainerRef.current, mapOption);

      // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
      const zoomControl = new kakao.maps.ZoomControl();
      mapRef.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 지도 클릭 이벤트를 등록하여 인포윈도우 닫기
      kakao.maps.event.addListener(mapRef.current, 'click', function() {
        markersRef.current.forEach(markerObj => {
          markerObj.infowindow.close();
        });
      });

      // 지도가 확대 또는 축소되면 마커 이미지와 크기를 변경
      kakao.maps.event.addListener(mapRef.current, 'zoom_changed', function() {
        updateMarkers();
      });
    }

    function updateMarkers() {
      const level = mapRef.current.getLevel();
      const { src, size } = getImageProps(level);

      markersRef.current.forEach(markerObj => {
        const markerImage = new kakao.maps.MarkerImage(src, size);
        markerObj.marker.setImage(markerImage);
      });

      const message = `현재 지도 레벨은 ${level} 입니다`;
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = message;
    }

    // 마커 이미지 URL 및 크기 설정 함수
    function getImageProps(level) {
      if (level <= 10) {
        return {
          src: "/images/markerStar.png",
          size: new kakao.maps.Size(24, 35)
        };
      } else {
        return {
          src: "/images/markertest.png",
          size: new kakao.maps.Size(3, 3)
        };
      }
    }

    // 마커 생성 함수
    function createMarker(position) {
      const { src, size } = getImageProps(mapRef.current.getLevel());
      const markerImage = new kakao.maps.MarkerImage(src, size);
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: position.latlng,
        title: position.title,
        image: markerImage,
        clickable: true
      });

      // 마커에 표시할 인포윈도우를 생성
      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${position.title}</div>`
      });

      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, 'click', function() {
        markersRef.current.forEach(markerObj => {
          markerObj.infowindow.close();
        });
        infowindow.open(mapRef.current, marker);
      });

      markersRef.current.push({ marker, infowindow });
    }

    // 데이터가 있을 경우, 해당 데이터로 마커 생성
    if (data) {
      markersRef.current.forEach(markerObj => {
        markerObj.marker.setMap(null);
      });
      markersRef.current = [];

      const positions = data.map(item => ({
        title: item.name,
        latlng: new kakao.maps.LatLng(item.lat, item.lon)
      }));

      positions.forEach(position => createMarker(position));
    }

    // 선택된 주소가 있을 경우, 해당 주소로 지도 이동 및 마커 생성
    if (selectedAddress) {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(selectedAddress.roadAddress, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          if (addressMarkerRef.current) {
            addressMarkerRef.current.setMap(null);
          }
          const marker = new kakao.maps.Marker({
            map: mapRef.current,
            position: coords,
            clickable: true
          });
          mapRef.current.setCenter(coords);

          // 주소 마커를 설정하고 기존 마커 제거
          addressMarkerRef.current = marker;
        }
      });
    }

  }, [data, selectedAddress]);

  return (
    <>
      <div id="map" style={style} ref={mapContainerRef}></div>
      <p id="result"></p>
    </>
  );
}
