<!-- components/items/SearchKeywordInput.vue -->
<template>
  <input
    type="text"
    class="search__input"
    :value="modelValue"
    @input="updateValue($event.target.value)"
    placeholder="찾고 싶은 곳을 입력해주세요"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emit("update:modelValue", value);
};
</script>

<style scoped>
.input-container {
  position: relative;
  width: 70%;
}

.search__input {
  width: 80%; /* 검색 창 너비를 더 좁게 설정 */
  max-width: 400px; /* 최대 크기 제한 */
  height: 25px;
  font-size: 1rem;
  padding: 10px; /* 패딩으로 여유 추가 */
  border-radius: 20px;
  border: 1px solid lightgray;
  box-shadow: 0px 0px 5px #b5b5b5;
}

.search__input:focus {
  box-shadow: 0px 0px 10px #a088c5; /* 포커스 시 강조된 그림자 */
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: lightgray;
}
</style>
