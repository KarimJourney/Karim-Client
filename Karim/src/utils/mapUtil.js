// src/utils/mapUtil.js

/**
 * 마커를 생성하는 함수
 * @param {Object} map - 카카오 맵 인스턴스
 * @param {Object} position - 위도(latitude)와 경도(longitude)
 * @param {String} title - 마커의 타이틀
 * @param {Number} no - 마커의 고유 ID
 * @param {Object} markerImage - 마커 이미지 객체
 * @param {Function} onClick - 마커 클릭 시 호출되는 함수
 * @returns {Object} marker - 생성된 마커 객체
 */
export function createMarker(map, position, title, no, markerImage, onClick) {
  const marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(position.latitude, position.longitude),
    title: title,
    no: no,
    image: markerImage,
  });

  if (onClick) {
    kakao.maps.event.addListener(marker, "click", () => {
      onClick(position.latitude, position.longitude, title, no);
    });
  }

  return marker;
}

/**
 * 오버레이를 생성하는 함수
 * @param {Object} map - 카카오 맵 인스턴스
 * @param {Object} position - 위도(latitude)와 경도(longitude)
 * @param {HTMLElement} content - 오버레이에 표시할 HTML 콘텐츠
 * @returns {Object} overlay - 생성된 오버레이 객체
 */
export function createOverlay(map, position, content) {
  const overlay = new kakao.maps.CustomOverlay({
    map: map, // 초기에는 숨김
    position: new kakao.maps.LatLng(position.latitude, position.longitude),
    content: content,
    xAnchor: 0.5,
    yAnchor: 1.0,
  });

  return overlay;
}
