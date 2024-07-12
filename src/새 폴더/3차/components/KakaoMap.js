import React, { useEffect, useRef } from 'react';
const { kakao } = window;

export default function KakaoMap({ data, selectedAddress, radius, onNearbyMarkers }) {
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
  const circleRef = useRef(null);
  const openInfowindowRef = useRef(null);

  useEffect(() => {
    const centerCoords = new kakao.maps.LatLng(36.060417, 128.033972);
    const mapOption = {
      center: centerCoords,
      level: 13
    };

    if (!mapRef.current) {
      mapRef.current = new kakao.maps.Map(mapContainerRef.current, mapOption);

      const zoomControl = new kakao.maps.ZoomControl();
      mapRef.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      kakao.maps.event.addListener(mapRef.current, 'click', function() {
        markersRef.current.forEach(markerObj => {
          markerObj.infowindow.close();
        });
        if (openInfowindowRef.current) {
          openInfowindowRef.current.close();
        }
      });

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

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;">${position.title}</div>`
      });

      kakao.maps.event.addListener(marker, 'click', function() {
        markersRef.current.forEach(markerObj => {
          markerObj.infowindow.close();
        });
        if (openInfowindowRef.current) {
          openInfowindowRef.current.close();
        }
        infowindow.open(mapRef.current, marker);
        openInfowindowRef.current = infowindow;
      });

      markersRef.current.push({ marker, infowindow });
    }

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
          addressMarkerRef.current = marker;

          if (circleRef.current) {
            circleRef.current.setMap(null);
          }
          drawCircle(coords, radius);

          const nearbyMarkers = markersRef.current.filter(markerObj => {
            const distance = calculateDistance(coords.getLat(), coords.getLng(), markerObj.marker.getPosition().getLat(), markerObj.marker.getPosition().getLng());
            return distance <= radius / 1000;
          });

          onNearbyMarkers(nearbyMarkers);
        }
      });
    }

    function drawCircle(centerCoords, radius) {
      const circle = new kakao.maps.Circle({
        center: centerCoords,
        radius: radius,
        strokeWeight: 1,
        strokeColor: '#00a0e9',
        strokeOpacity: 0.5,
        fillColor: '#00a0e9',
        fillOpacity: 0.3
      });
      circle.setMap(mapRef.current);
      circleRef.current = circle;
    }

    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    }

  }, [data, selectedAddress, radius]);

  return (
    <>
      <div id="map" style={style} ref={mapContainerRef}></div>
      <p id="result"></p>
    </>
  );
}
