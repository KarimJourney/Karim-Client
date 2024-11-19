<script setup>
import { ref } from 'vue';
import { useHotplaceStore } from '@/stores/hotplaceStore';
import SearchKeywordInput from '@/components/items/SearchKeywordInput.vue';
import SearchSelect from '@/components/items/SearchSelect.vue';

const hotplaceStore = useHotplaceStore();

const searchParams = ref({
  sort: '',
  keyword: '',
});

const sortOptions = [
  { value: '', label: '정렬' },
  { value: 'title', label: '이름순' },
  { value: 'area', label: '지역순' },
];

const onSearch = () => {
  hotplaceStore.searchParams = { ...searchParams.value };
  hotplaceStore.searchHotplaces();
};
</script>

<template>
  <div>
    <form id="searchForm" @submit.prevent="onSearch">
      <SearchKeywordInput v-model="searchParams.keyword" />
      <div class="category-selector">
        <SearchSelect
          select-id="search-area"
          v-model="searchParams.sort"
          :options="sortOptions"
          placeholder="정렬"
        />
        <button
          id="searchButton"
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