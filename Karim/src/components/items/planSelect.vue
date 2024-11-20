<script setup>
import { ref, onMounted } from "vue";
import planSelectList from "@/components/items/planSelectList.vue";
import { useLoginStore } from "@/stores/login";
import axios from "@/utils/axios";

const props = defineProps({
  trip: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const plans = ref([]);
const loginStore = useLoginStore();
const userId = ref({
  userId: loginStore.getId,
});

onMounted(async () => {
  try {
    const response = await axios.post(`/plan`, userId.value);
    plans.value = response.data.data;
  } catch (error) {
    console.error("여행 계획 목록을 가져오는 데 실패했습니다.", error);
  }
});
const randOrder = Math.floor(Math.random() * 100) + 1;
const selectPlan = async (planId, planDate) => {
  console.log(props.trip.value);
  try {
    const placeDto = {
      planId: planId,
      attr_id: props.trip.no,
      planDate: planDate,
      order: randOrder, // 순서는 임시로 0 설정, 필요시 변경 가능
    };
    // console.log("아이디이다 ", planId);
    // console.log(placeDto);
    await axios.post(`/plan/${planId}/new`, placeDto);
    emit("close"); // 장소 추가 후 모달 닫기
  } catch (error) {
    console.error("장소 추가 중 오류 발생", error);
  }
};
</script>

<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3>여행일정 선택</h3>
      <planSelectList :plans="plans" @select-plan="selectPlan" />
      <button class="close" @click="$emit('close')">닫기</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 15px;
  width: 500px;
  text-align: center;
  position: relative; /* 닫기 버튼을 위치시키기 위해 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.modal-title {
  background-color: #f8f9fa; /* 제목 부분에 색상을 추가 */
  padding: 15px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

button.close {
  background: --purple;
  border: none;
  font-size: 1rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

button {
  background-color: --purple;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #9271c4;
  transform: scale(1.05);
}

button + button {
  margin-left: 8px;
}
</style>
