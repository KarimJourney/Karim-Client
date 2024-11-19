<script setup>
import { ref, onMounted } from "vue";
import { useMapStore } from "@/stores/mapStore";
import SearchKeywordInput from "@/components/items/SearchKeywordInput.vue";
import SearchSelect from "@/components/items/SearchSelect.vue";

const mapStore = useMapStore();

const searchParams = ref({
  area_code: "0",
  content_type_id: "0",
  title: "",
});

const siOptions = ref([]);
const contentTypeOptions = ref([
  { value: "0", label: "관광지 유형" },
  { value: "12", label: "관광지" },
  { value: "14", label: "문화시설" },
  { value: "15", label: "축제공연행사" },
  { value: "25", label: "여행코스" },
  { value: "28", label: "레포츠" },
  { value: "32", label: "숙박" },
  { value: "38", label: "쇼핑" },
  { value: "39", label: "음식점" },
]);

onMounted(async () => {
  try {
    // 초기 데이터 로드 (비동기 처리)
    await mapStore.fetchTrips();

    // siList를 store에서 가져와 options에 설정
    siOptions.value = mapStore.siList.map((si) => ({
      value: si.sido_code,
      label: si.sido_name,
    }));

    console.log(siOptions.value); // siOptions에 값이 제대로 들어오는지 확인
  } catch (error) {
    console.error("초기 데이터 로드 중 오류 발생:", error);
  }
});

const onSearch = () => {
  mapStore.searchParams = { ...searchParams.value };
  mapStore.searchTrips();
};
</script>
<template>
  <div>
    <form id="searchForm" @submit.prevent="onSearch">
      <SearchKeywordInput v-model="searchParams.title" />
      <div class="category-selector">
        <SearchSelect
          select-id="search-area"
          v-model="searchParams.area_code"
          :options="siOptions"
          placeholder="지역"
        />
        <SearchSelect
          select-id="search-content-id"
          v-model="searchParams.content_type_id"
          :options="contentTypeOptions"
          placeholder="관광지 유형"
        />
        <button
          id="btn-search"
          class="btnCustom search-btn"
          type="button"
          @click="onSearch"
        >
          검색
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
#searchForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.category-selector {
  width: 100%;
  display: flex;
  justify-content: center; /* 버튼과 드롭다운 중앙 정렬 */
  align-items: center; /* 세로 정렬 */
  gap: 10px; /* 요소 간 간격 */
}

.category-selector > select {
  min-width: 90px;
  height: 45px;
  border-radius: 20px;
  padding: 5px 10px;
  border: 1px solid var(--light-gray);
  box-shadow: 0px 0px 5px #b5b5b5; /* 약간의 그림자 추가 */
  background-color: white;
}

.category-selector > button {
  min-width: 90px; /* 버튼 크기 확대 */
  height: 45px;
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: var(--purple);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 약간의 그림자 추가 */
}

.category-selector > button:hover {
  background-color: var(--dark-purple); /* 호버 시 조금 더 진한 색상 */
  transform: scale(1.05); /* 호버 시 살짝 확대되는 효과 */
}

.btnCustom.search-btn {
  font-size: 1rem;
  width: auto; /* 버튼 크기를 내용에 맞게 자동 조정 */
  height: 45px;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--purple); /* 보라색으로 설정 */
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.btnCustom.search-btn:hover {
  background-color: var(--dark-purple); /* 호버 시 더 진한 색상 */
  transform: scale(1.05);
}
</style>
