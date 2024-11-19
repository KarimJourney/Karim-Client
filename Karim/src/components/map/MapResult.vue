<!-- src/components/map/MapResult.vue -->
<script setup>
import { ref, onMounted, watch } from "vue";
import { useMapStore } from "@/stores/mapStore";
import { useHotplaceStore } from "@/stores/hotplaceStore";
import "@/assets/css/overlay.css"

const app_key = import.meta.env.VITE_MAPYOUR_API_KEY;

// props를 통해 dataList와 store 타입을 전달
const props = defineProps({
  dataList: {
    type: Array,
    required: true,
  },
  storeType: {
    type: String,
    required: true, // 'trip' 또는 'hotplace'
  },
});

const tripStore = useMapStore();
const hotplaceStore = useHotplaceStore();
const map = ref(null);

// 맵 초기화 함수
const initializeMap = () => {
  // 카카오 맵 스크립트 중복 로드 방지
  // if (document.getElementById("kakao-map-script")) {
  //   console.log("카카오 맵 스크립트가 이미 로드되었습니다.");
  //   return;
  // }

  const script = document.createElement("script");
  script.id = "kakao-map-script";
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${app_key}&autoload=false`;
  script.onload = () => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오 맵 API가 로드되지 않았습니다.");
      return;
    }

    // kakao.maps 객체를 사용하려면 반드시 kakao.maps.load 호출 필요
    kakao.maps.load(() => {
      const container = document.getElementById("map");
      if (!container) {
        console.error("#map 요소를 찾을 수 없습니다.");
        return;
      }

      const options = {
        center: new kakao.maps.LatLng(37.500613, 127.036431), // 초기 중심 좌표
        level: 3, // 확대 레벨
      };
      map.value = new kakao.maps.Map(container, options); // 지도 생성
      console.log("Map initialized:", map.value);
    });
  };
  script.onerror = () => {
    console.error("카카오 맵 스크립트 로드 오류");
  };
  document.head.appendChild(script);
};

/**
 * 맵 초기화 및 데이터 fetching 후 마커 생성
 */
onMounted(async () => {
  console.log("Initializing map...");
  initializeMap();

  // 카카오 맵 API 로드 대기
  await new Promise((resolve) => {
    const checkKakao = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        clearInterval(checkKakao);
        resolve();
      }
    }, 100);
  });

  if (props.storeType === "map") {
    await tripStore.fetchTrips();
    console.log("Trips fetched");
    tripStore.makeMarkers(map.value);
    console.log("Markers created for trips");

    // tripList이 변경될 때마다 마커 재생성
    watch(
      () => tripStore.tripList,
      async (newList) => {
        if (map.value) {
          tripStore.makeMarkers(map.value);
        }
      },
      { deep: true }
    );
  } else if (props.storeType === "hotplace") {
    await hotplaceStore.fetchHotplaces();
    console.log("Hotplaces fetched");
    hotplaceStore.makeMarkers(map.value);
    console.log("Markers created for hotplaces");

    // hotplaceList이 변경될 때마다 마커 재생성
    watch(
      () => hotplaceStore.hotplaceList,
      async (newList) => {
        if (map.value) {
          hotplaceStore.makeMarkers(map.value);
        }
      },
      { deep: true }
    );
  }
});

// 선택된 좌표를 감지하여 지도 중심 변경
// watch(
//   () => [tripStore.selectedLatitude, tripStore.selectedLongitude, hotplaceStore.selectedLatitude, hotplaceStore.selectedLongitude],
//   ([tripLat, tripLng, hotLat, hotLng]) => {
//     // 우선 순위: hotplace의 선택 좌표가 있을 경우
//     if (hotLat !== null && hotLng !== null && map.value) {
//       const newCenter = new kakao.maps.LatLng(hotLat, hotLng);
//       map.value.setCenter(newCenter);
//       console.log(`Map center moved to: ${hotLat}, ${hotLng}`);
//       // 선택 좌표 초기화
//       hotplaceStore.clearSelectedCoordinates();
//       return;
//     }

//     // 그 다음으로 trip의 선택 좌표가 있을 경우
//     if (tripLat !== null && tripLng !== null && map.value) {
//       const newCenter = new kakao.maps.LatLng(tripLat, tripLng);
//       map.value.setCenter(newCenter);
//       console.log(`Map center moved to: ${tripLat}, ${tripLng}`);
//       // 선택 좌표 초기화
//       tripStore.clearSelectedCoordinates();
//       return;
//     }
//   }
// );

// 선택된 좌표를 감지하여 지도 중심 변경
watch(
  () => [
    tripStore.selectedLatitude,
    tripStore.selectedLongitude,
    hotplaceStore.selectedLatitude,
    hotplaceStore.selectedLongitude,
  ],
  ([tripLat, tripLng, hotLat, hotLng]) => {
    if (props.storeType === "hotplace") {
      // 우선 순위: hotplace의 선택 좌표가 있을 경우
      if (hotLat !== null && hotLng !== null && map.value) {
        const newCenter = new kakao.maps.LatLng(hotLat, hotLng);
        map.value.setCenter(newCenter);
        console.log(`Map center moved to: ${hotLat}, ${hotLng}`);
        // 선택 좌표 초기화
        hotplaceStore.clearSelectedCoordinates();
        return;
      }
    } else {
      // 그 다음으로 trip의 선택 좌표가 있을 경우
      if (tripLat !== null && tripLng !== null && map.value) {
        const newCenter = new kakao.maps.LatLng(tripLat, tripLng);
        map.value.setCenter(newCenter);
        console.log(`Map center moved to: ${tripLat}, ${tripLng}`);
        // 선택 좌표 초기화
        tripStore.clearSelectedCoordinates();
        return;
      }
    }
  }
);
</script>

<template>
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
</template>

<style scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  margin-left: 10px;
}
#map {
  width: 100%;
  height: 100%;
}
/* Scoped CSS 내부에서 ::v-deep을 사용하여 동적 요소에 스타일 적용 */
::v-deep .hotplace {
  position: absolute;
  top: 11px;
  right: 25px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
  transition: color 0.3s;
}

::v-deep .hotplace.active {
  color: red;
}
</style>
