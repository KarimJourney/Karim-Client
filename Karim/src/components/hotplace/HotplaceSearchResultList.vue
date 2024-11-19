<script setup>
import { useHotplaceStore } from '@/stores/hotplaceStore';
import { onMounted } from 'vue';
import HotplaceSearchResultListItem from '@/components/hotplace/HotplaceSearchResultListItem.vue';
import PageNavigation from "@/components/common/PageNavigation.vue";

const hotplaceStore = useHotplaceStore();

onMounted(() => {
  hotplaceStore.fetchHotplaces();
});

const toggleLike = (attraction_id) => {
  hotplaceStore.toggleLike(attraction_id);
};


const onPageChange = (page) => {
  if (hotplaceStore.searchParams.keyword) {
    hotplaceStore.searchHotplaces(page);
  } else {
    hotplaceStore.fetchHotplaces(page);
  }
};

// 'move-center' 이벤트 처리
const handleMoveCenter = (lat, lng) => {
  hotplaceStore.setSelectedCoordinates(lat, lng);
};
</script>

<template>
  <div class="result">
    <h2>즐겨찾기 목록</h2>
    <div class="result_aside">
      <ul class="result_list">
        <HotplaceSearchResultListItem
          v-for="hotplace in hotplaceStore.hotplaceList"
          :key="hotplace.no"
          :hotplace="hotplace"
          @toggle-like="toggleLike"
          @move-center="handleMoveCenter"
        />
      </ul>
      <!-- 페이지네이션 추가 -->
      <PageNavigation
        :navigatorHtml="hotplaceStore.pageNavigation"
        @page-change="onPageChange"
        @move-center="handleMoveCenter()"
      />
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
