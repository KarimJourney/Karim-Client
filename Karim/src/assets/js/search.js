let markers = []; // 현재 지도에 표시된 마커들을 저장하는 배열
let overlays = []; // 현재 지도에 표시된 오버레이들을 저장하는 배열
let map;

// kakao.maps.load(() => {
// 		const container = document.getElementById("map");
// 		const center = new kakao.maps.LatLng(37.500613, 127.036431) // 지도의 초기 중심좌표
// 		const options = {
// 			center, // 지도의 초기 중심좌표
// 			level: 3, // 지도의 초기 확대 레벨
// 		};
// 		map = new kakao.maps.Map(container, options); // 단일 지도 인스턴스

// 	});
// Kakao 지도 초기화 함수
export function initializeMap(containerId, centerLat, centerLng, level = 3) {
  const container = document.getElementById(containerId);
  const options = {
    center: new kakao.maps.LatLng(centerLat, centerLng),
    level: level,
  };
  map = new kakao.maps.Map(container, options);
  return map; // 지도 인스턴스를 반환
}
//window.onload = () => {
document.addEventListener("DOMContentLoaded", () => {
  fetchPage(currentPage);
});

/*document.addEventListener("DOMContentLoaded", () => {
    fetchListPage(1);

    // 검색 버튼 클릭 이벤트
   /* document.getElementById("searchButton").addEventListener("click", () => {
        fetchListPage(1); // 검색 실행 시 첫 페이지부터 다시 조회
    });*/

// 정렬 옵션 변경 이벤트
/*document.getElementsByName("sortOptions").addEventListener("change", () => {
        fetchListPage(1); // 정렬 기준 변경 시 첫 페이지부터 다시 조회
    });*/
/*});*/

function renderPagination(navigatorHtml, paginationId = "pagination") {
  const paginationContainer = document.getElementById(paginationId);
  paginationContainer.innerHTML = navigatorHtml;

  // 페이지네이션 클릭 이벤트 추가
  paginationContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const pgNo = parseInt(e.target.getAttribute("data-pg"));
      if (!isNaN(pgNo)) {
        fetchListPage(pgNo);
      }
    }
  });
}

//맵

// 리스트를 생성하는 함수
function makeList(data) {
  let tripList = ""; // 리스트로 출력할 HTML
  let newPositions = []; // 마커를 표시할 좌표 리스트

  data.forEach((area) => {
    // 리스트에 HTML 추가
    const imgSrc = area.img1
      ? area.img1
      : area.img2
      ? area.img2
      : `${root}/assets/img/default__background.svg`;

    tripList += `
            <li class="result__item" onclick="moveCenter(${area.latitude}, ${area.longitude});">
                <div class="item__content">
                    <img src="${imgSrc}" alt="" class="item__img" />
                    <div class="content">
                        <span class="item__title">${area.title}</span>
                    </div>
                    <span class="item__address content">${area.addr1} ${area.addr2}</span>
                </div>
            </li>
        `;

    // 마커 정보 추가
    console.log(area);
    let markerInfo = {
      title: area.title,
      latlng: new kakao.maps.LatLng(area.latitude, area.longitude),
      area: area,
      area_no: area.no,
    };
    newPositions.push(markerInfo);
  });

  // 리스트를 HTML에 업데이트
  document.querySelector(".result_list").innerHTML = tripList;

  // 기존 마커와 오버레이 제거 후 새로운 마커 및 오버레이 표시
  displayMarker(newPositions);
}

// 마커와 오버레이를 표시하는 함수
function displayMarker(newPositions) {
  clearMarkers(); // 기존 마커 제거
  clearOverlays(); // 기존 오버레이 제거

  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  newPositions.forEach((positionInfo, index) => {
    let num = positionInfo.area_no;
    const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지 크기
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

    const marker = new kakao.maps.Marker({
      map: map, // 단일 지도 인스턴스 사용
      position: positionInfo.latlng,
      title: positionInfo.title,
      image: markerImage,
    });

    markers.push(marker); // 마커를 배열에 추가

    // 마커 클릭 시 커스텀 오버레이 표시
    const overlay = new kakao.maps.CustomOverlay({
      map: null, // 초기에는 숨김
      position: marker.getPosition(),
    });

    // 오버레이 내용 설정
    const wrap = document.createElement("div");
    wrap.setAttribute("class", "wrap");

    const info = document.createElement("div");
    info.setAttribute("class", "info");

    const titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "title");
    titleDiv.textContent = positionInfo.title;

    //좋아요 추가
    const clickGoodDiv = document.createElement("div");
    clickGoodDiv.setAttribute("class", "hotplace");
    clickGoodDiv.setAttribute("id", "hotplace" + num);
    /*//clickGoodDiv.innerHTML = '<button class="fas fa-heart"/button>'; // Font Awesome 하트 아이콘 추가
		clickGoodDiv.innerHTML = '<object data="${root}/webapp/assets/img/heart.svg" type="image/svg+xml" width="10px" height="1opx"></object>'
		*/
    // 초기 좋아요 상태 확인
    console.log(positionInfo.area_no);

    clickGoodDiv.addEventListener("click", function () {
      /*const isActive = clickGoodDiv.classList.contains('active');
			const newLikeStatus = !isActive;*/
      fetch(`${root}/hotplace/likeinsert/${positionInfo.area_no}`, {
        method: "POST", // POST 메서드로 변경
      })
        .then((response) => response.json()) // 응답을 JSON으로 파싱
        .then((data) => {
          console.log(data.res);
          if (data.res === "liked") {
            document.getElementById("hotplace" + num).classList.add("active");
          } else if (data.res === "unliked") {
            document
              .getElementById("hotplace" + num)
              .classList.remove("active");
          } else {
            alert("좋아요 상태 업데이트에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("에러 발생:", error);
          alert("좋아요 상태 업데이트 중 에러가 발생했습니다.");
        });
    });

    titleDiv.appendChild(clickGoodDiv);
    info.appendChild(titleDiv);

    const closeDiv = document.createElement("div");
    closeDiv.setAttribute("class", "close");
    //closeDiv.textContent = "닫기";
    closeDiv.addEventListener("click", function () {
      overlay.setMap(null); // 오버레이 닫기
    });

    titleDiv.appendChild(closeDiv);
    info.appendChild(titleDiv);

    const bodyDiv = document.createElement("div");
    bodyDiv.setAttribute("class", "body");

    const img = document.createElement("img");
    img.setAttribute("class", "img");

    const imgSrcOverlay = positionInfo.area.img1
      ? positionInfo.area.img1
      : positionInfo.area.img2
      ? positionInfo.area.img2
      : `${root}/assets/img/default__background.svg`;

    img.setAttribute("src", imgSrcOverlay);
    bodyDiv.appendChild(img);

    const desc = document.createElement("div");
    desc.setAttribute("class", "desc");

    const ellipsis = document.createElement("div");
    ellipsis.setAttribute("class", "ellipsis");
    ellipsis.textContent = positionInfo.area.addr1;

    const jibun = document.createElement("div");
    jibun.setAttribute("class", "jibun ellipsis");
    jibun.textContent = `(우) ${positionInfo.area.addr2}`;

    desc.appendChild(ellipsis);
    desc.appendChild(jibun);
    bodyDiv.appendChild(desc);
    info.appendChild(bodyDiv);
    wrap.appendChild(info);

    overlay.setContent(wrap);

    // 마커 클릭 시 오버레이를 표시
    kakao.maps.event.addListener(marker, "click", function () {
      closeAllOverlays(); // 다른 오버레이 닫기
      overlay.setMap(map); // 오버레이를 지도에 표시
      overlays.push(overlay);

      fetch(`${root}/hotplace/like/${positionInfo.area_no}`, {
        method: "POST", // POST 메서드로 변경
      })
        .then((response) => response.json()) // 응답을 JSON으로 파싱
        .then((success) => {
          console.log(success.msg);

          if (success.msg === "ok") {
            document.getElementById("hotplace" + num).classList.add("active");
            //document.getElementById("hotplace"+num).style.color = "red";
          } else if (success.msg === "no") {
            document
              .getElementById("hotplace" + num)
              .classList.remove("active");
          } else {
            alert("rkqtdl jasg");
          }
        })
        .catch((error) => {
          console.error("에러 발생:", error);
          alert("좋아요 상태 업데이트 중 에러가 발생했습니다.");
        });
    });
  });

  // 첫 번째 좌표로 지도 이동
  if (newPositions.length > 0) {
    map.setCenter(newPositions[0].latlng);
  }
}

// 마커 제거 함수
function clearMarkers() {
  markers.forEach((marker) => marker.setMap(null)); // 모든 마커를 지도에서 제거
  markers = []; // 배열 초기화
}

// 오버레이 제거 함수
function clearOverlays() {
  overlays.forEach((overlay) => overlay.setMap(null)); // 모든 오버레이를 지도에서 제거
  overlays = []; // 배열 초기화
}

// 모든 오버레이를 닫는 함수
function closeAllOverlays() {
  overlays.forEach((overlay) => overlay.setMap(null));
  overlays = [];
}

// 오버레이를 닫는 함수 (필요 시 사용)
function closeOverlay(overlay) {
  overlay.setMap(null); // 오버레이를 지도에서 제거
}

// 지도 중심 이동 함수
function moveCenter(lat, lng) {
  map.setCenter(new kakao.maps.LatLng(lat, lng));
}
