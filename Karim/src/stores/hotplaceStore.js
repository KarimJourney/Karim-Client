// store/hotplaceStore.js
import { defineStore } from "pinia";
import { useLoginStore } from "@/stores/login";
import axios from "@/utils/axios";
const userStore = useLoginStore();

export const useHotplaceStore = defineStore("hotplace", {
  state: () => ({
    hotplaceList: [],
    pageNavigation: "",
    currentPage: 1,
    searchParams: {
      sort: "",
      keyword: "",
    },
    markers: [], // 수정됨
    overlays: [], // 수정됨
    selectedLatitude: null, // 선택된 위도
    selectedLongitude: null, // 선택된 경도
  }),
  actions: {
    // 선택된 좌표 설정
    setSelectedCoordinates(lat, lng) {
      this.selectedLatitude = lat;
      this.selectedLongitude = lng;
    },

    // 선택된 좌표 초기화
    clearSelectedCoordinates() {
      this.selectedLatitude = null;
      this.selectedLongitude = null;
    },
    // 핫플레이스 목록 가져오기
    async fetchHotplaces(page = 1) {
      try {
        const response = await axios.get(
          `/hotplace/movehotlist/${page}/${userStore.id}`
        );
        if (response.data.res === "ok") {
          this.hotplaceList = response.data.hotplaceList.map((hp) => ({
            ...hp,
            //liked: hp.liked || false, // 좋아요 상태 추가
          }));
          this.pageNavigation = response.data.pageNavigation;
          this.currentPage = page;
        } else {
          this.hotplaceList = [];
          this.pageNavigation = "";
        }
      } catch (error) {
        console.error("Error fetching hotplaces:", error);
        alert("핫리스트를 불러오는데 실패했습니다.");
      }
    },

    // 핫플레이스 검색하기
    async searchHotplaces(page = 1) {
      try {
        const response = await axios.post(`/hotplace/hotplacelist`, {
          page,
          sort: this.searchParams.sort,
          keyword: this.searchParams.keyword,
          userId: userStore.id,
        });
        if (response.data.res === "ok") {
          this.hotplaceList = response.data.hotplaceList.map((hp) => ({
            ...hp,
            liked: hp.liked || false, // 좋아요 상태 추가
          }));
          this.pageNavigation = response.data.pageNavigation;
          this.currentPage = page;
        } else {
          this.hotplaceList = [];
          this.pageNavigation = "";
        }
      } catch (error) {
        console.error("Error searching hotplaces:", error);
        alert("핫리스트를 불러오는데 실패했습니다.");
      }
    },

    // 좋아요 상태 확인
    async checkLike(tripId) {
      try {
        const response = await axios.post(`/hotplace/like`, {
          no: tripId,
          userId: userStore.id,
        });
        const trip = this.hotplaceList.find((t) => t.no === tripId);
        if (trip) {
          console.log("hotplace toggle check : ", trip.no);
          if (response.data.msg === "ok") {
            // const heartElement = document.querySelector(
            //   `.hotplace[data-trip-id="${trip.no}"]`
            // );
            // if (heartElement) {
            //   heartElement.classList.add("active");
            //   console.log(`Overlay opened for Trip ID: ${trip.no}`);
            // }
            return true
          } else {
            // const heartElement = document.querySelector(
            //   `.hotplace[data-trip-id="${trip.no}"]`
            // );
            // if (heartElement) {
            //   heartElement.classList.remove("active");
            //   console.log(`Overlay closed for Trip ID: ${trip.no}`);
            // }
            return false
          }
        }
      } catch (error) {
        console.error("좋아요 확인 중 오류 발생", error);
        alert("좋아요 확인 중 에러 발생");
      }
    },

    // 좋아요 토글
    async toggleLike(tripId) {
      try {
        const response = await axios.post(`/hotplace/insertlike`, {
          no: tripId,
          userId: userStore.id,
        });
        console.log("Toggle Like Response:", response);
        const trip = this.hotplaceList.find((t) => t.no === tripId);
        if (trip) {
          console.log("Found Trip:", trip);
          if (response.data.res === "liked") {
            // trip.liked = true;
            // const heartElement = document.querySelector(
            //   `.hotplace[data-trip-id="${trip.no}"]`
            // );
            alert("좋아요 업데이트가 완료되었습니다.");
            // if (heartElement) {
            //   heartElement.classList.add("active");
            //   console.log("Added 'active' class to", heartElement);
            // } else {
            //   console.error(`Element with data-trip-id=${trip.no} not found.`);
            // }
            return true;
          } else if (response.data.res === "unliked") {
            // trip.liked = false;
            // const heartElement = document.querySelector(
            //   `.hotplace[data-trip-id="${trip.no}"]`
            // );
            alert("좋아요 삭제가 완료되었습니다.");
            // if (heartElement) {
            //   heartElement.classList.remove("active");
            //   console.log("Removed 'active' class from", heartElement);
            // } else {
            //   console.error(`Element with data-trip-id=${trip.no} not found.`);
            // }
            return false
          } else {
            alert("좋아요 상태 업데이트에 실패했습니다.");
          }
          console.log(
            `Like toggled for Trip ID ${tripId}: ${response.data.res}`
          );
        }
      } catch (error) {
        console.error("좋아요 상태 업데이트 중 오류 발생:", error);
        alert("좋아요 상태 업데이트 중 에러가 발생했습니다.");
      }
    },

    // 마커 및 오버레이 생성
    makeMarkers(map) {
      if (!map) {
        console.error("Map is null, cannot set center.");
        return;
      }

      //console.log("Clearing existing markers and overlays.");
      // 기존 마커 및 오버레이 클리어
      this.clearMarkers();
      this.clearOverlays();
      this.closeAllOverlays(); // 수정된 함수

      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      this.hotplaceList.forEach((data, index) => {
        //console.log(`Creating marker for trip ID: ${data.no}`);
        const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지 크기
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지 생성

        const position = new kakao.maps.LatLng(data.latitude, data.longitude);
        const marker = new kakao.maps.Marker({
          map: map, // 단일 지도 인스턴스 사용
          position: position,
          title: data.title,
          image: markerImage,
        });

        this.markers.push(marker); // 마커 배열에 추가
        console.log(`Marker created for ID ${data.no}`);

        // 오버레이 생성
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

        // 제목과 하트 아이콘을 포함하는 span
        const titleSpan = document.createElement("span");
        titleSpan.textContent = data.title;

        // 좋아요 버튼 추가 (SVG 사용)
        // const clickGoodDiv = document.createElement("div");
        // clickGoodDiv.setAttribute("class", "hotplace");
        // clickGoodDiv.setAttribute("id", "hotplace" + data.no);
        // clickGoodDiv.setAttribute("data-trip-id", data.no); // 'id' 대신 'data-trip-id' 사용

        // // heart.svg 삽입 (inline SVG)
        // clickGoodDiv.innerHTML = `
        //   <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2
        //              5.42 4.42 3 7.5 3c1.74 0 3.41 0.81
        //              4.5 2.09C13.09 3.81 14.76 3 16.5
        //              3 19.58 3 22 5.42 22 8.5c0 3.78-3.4
        //              6.86-8.55 11.54L12 21.35z"/>
        //   </svg>
        // `;

        // // 좋아요 버튼 클릭 이벤트 리스너 추가
        // clickGoodDiv.addEventListener("click", async (e) => {
        //   e.stopPropagation(); // 이벤트 버블링 방지
        //   const tripId = parseInt(e.currentTarget.getAttribute("data-trip-id"));
        //   console.log(`Like button clicked for Trip ID: ${tripId}`);
        //   await this.toggleLike(tripId);
        //   // 상태 변경 후 클래스 업데이트는 toggleLike 함수에서 처리
        // });

        titleDiv.appendChild(titleSpan);
        // titleDiv.appendChild(clickGoodDiv);
        info.appendChild(titleDiv);

        // 닫기 버튼 추가
        const closeDiv = document.createElement("div");
        closeDiv.setAttribute("class", "close");
        closeDiv.textContent = "×";
        // 닫기 버튼 클릭 이벤트 리스너 추가
        closeDiv.addEventListener("click", () => {
          overlay.setMap(null); // 오버레이 닫기
        });

        info.appendChild(closeDiv); // titleDiv를 다시 append하지 않도록 수정

        // 오버레이의 본문 내용 추가
        const bodyDiv = document.createElement("div");
        bodyDiv.setAttribute("class", "body");

        const img = document.createElement("img");
        img.setAttribute("class", "img");

        const imgSrcOverlay = data.img1
          ? data.img1
          : data.img2
          ? data.img2
          : "src/assets/img/default__background.svg"; // public 디렉토리 기준

        img.setAttribute("src", imgSrcOverlay);
        bodyDiv.appendChild(img);

        const desc = document.createElement("div");
        desc.setAttribute("class", "desc");

        const ellipsis = document.createElement("div");
        ellipsis.setAttribute("class", "ellipsis");
        ellipsis.textContent = data.addr1;

        const jibun = document.createElement("div");
        jibun.setAttribute("class", "jibun ellipsis");
        jibun.textContent = `(우) ${data.addr2}`;

        desc.appendChild(ellipsis);
        desc.appendChild(jibun);
        bodyDiv.appendChild(desc);
        info.appendChild(bodyDiv);
        wrap.appendChild(info);

        overlay.setContent(wrap);

        // 오버레이 데이터 추가 (instance 포함)
        this.overlays.push({
          no: data.no,
          title: data.title,
          addr1: data.addr1,
          addr2: data.addr2,
          img1: data.img1,
          img2: data.img2,
          liked: data.liked,
          latlng: position, // kakao.maps.LatLng 객체
          instance: overlay,
        });

        // // 초기 좋아요 상태 반영
        // if (data.liked) {
        //   clickGoodDiv.classList.add("active");
        // } else {
        //   clickGoodDiv.classList.remove("active");
        // }

        // 마커 클릭 시 오버레이 표시
        kakao.maps.event.addListener(marker, "click", () => {
          console.log(`Marker clicked for Trip ID: ${data.no}`);
          this.closeAllOverlays(); // 다른 오버레이 닫기
          overlay.setMap(map); // 오버레이를 지도에 표시
          this.checkLike(data.no); // 좋아요 상태 확인
        });
      });

      console.log("hotplaceStore markers:", this.markers);
      // 첫 번째 좌표로 지도 이동
      if (this.hotplaceList.length > 0 && this.markers[0].getPosition()) {
        map.setCenter(this.markers[0].getPosition());
        console.log("Map center moved to first trip item");
      }
    },

    // 마커 및 오버레이 제거
    clearMarkers() {
      this.markers.forEach((marker) => marker.setMap(null));
      this.markers = [];
    },
    clearOverlays() {
      this.overlays.forEach((overlayData) => {
        if (overlayData.instance) {
          overlayData.instance.setMap(null);
        }
      });
      // this.overlays = []; // overlays 배열을 비우지 않음
    },
    closeAllOverlays() {
      this.overlays.forEach((overlayData) => {
        if (overlayData.instance) {
          overlayData.instance.setMap(null);
          // overlayData.instance = null; // 제거
        }
      });
      // this.overlays = []; // overlays 배열을 비우지 않음
    },
  },
});
