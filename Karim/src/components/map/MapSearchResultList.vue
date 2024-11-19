<script setup>
import { onMounted } from "vue";
import { useMapStore } from "@/stores/mapStore";
import MapSearchResultListItem from "@/components/map/MapSearchResultListItem.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";

const mapStore = useMapStore();

// // 중심 이동 함수
// const moveCenter = (lat, lng) => {
//   mapStore.setSelectedCoordinates(lat, lng);
// };

const onPageChange = (page) => {
  mapStore.fetchTrips(page);
};
// 'move-center' 이벤트 처리
const handleMoveCenter = (lat, lng) => {
  mapStore.setSelectedCoordinates(lat, lng);
};
</script>
<template>
  <div class="result">
    <h2>검색 결과</h2>
    <div class="result_aside">
      <ul class="result_list">
        <MapSearchResultListItem
          v-for="trip in mapStore.tripList"
          :key="trip.no"
          :trip="trip"
          @move-center="handleMoveCenter"
          @toggle-like="toggleLike"
        />
      </ul>
      <!-- 페이지네이션 추가 -->
      <div>
        <PageNavigation
        :navigatorHtml="mapStore.pageNavigation"
        @page-change="onPageChange"
        @move-center="handleMoveCenter()"
      />
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin: 5px;
}
.result {
  box-sizing: border-box;
}

.result_aside {
  padding: 0 0 5px 0;
  margin: 0;
  list-style: none;
  gap: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 50vh;
}

.result_list {
  padding: 5px;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  /* height: 50vh; */
}

.result_list::-webkit-scrollbar {
  width: 8px; /* 스크롤바의 너비 */
}

.result_list::-webkit-scrollbar-thumb {
  height: 30%; /* 스크롤바의 길이 */
  background: gray; /* 스크롤바의 색상 */
  border-radius: 10px;
}

.result_list::-webkit-scrollbar-track {
  background: lightgrey; /* 스크롤바 뒷 배경 색상 */
}
</style>
