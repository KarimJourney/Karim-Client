<script setup>
import { ref } from "vue";
import { useLoginStore } from "@/stores/login";
import axios from "@/utils/axios"; // axios 임포트

defineProps({
  // 부모 컴포넌트에서 모달을 제어하기 위한 'showModal' prop이 필요
  showModal: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "addPlan"]);

const loginStore = useLoginStore();

const form = ref({
  userId: loginStore.getId,
  name: "",
  startDate: "",
  endDate: "",
});

// 모달 닫기
const closeModal = () => {
  emit("close");
};

// 여행 계획 추가 처리
const handleSubmit = async () => {
  // 폼 데이터를 부모로 전달
  if (form.value.name && form.value.startDate && form.value.endDate) {
    try {
      const newPlan = { ...form.value };
      const response = await axios.post("/plan/new", newPlan); // 서버에 여행 계획 추가
      emit("addPlan", response.data); // 추가된 계획을 부모로 전달
      closeModal(); // 저장 후 모달 닫기
    } catch (error) {
      console.error("여행 계획을 추가하는 데 실패했습니다.", error);
    }
  }
};
</script>

<template>
  <div id="modal-overlay">
    <div id="modal">
      <h2>새 여행 계획 추가</h2>
      <div id="modal-content">
        <div class="items">
          <div class="item">
            <label for="name">여행 제목</label>
            <input
              id="name"
              name="name"
              type="text"
              v-model="form.name"
              required
              placeholder="여행 제목을 입력하세요"
            />
          </div>

          <div class="item">
            <label for="startDate">시작 날짜</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              v-model="form.startDate"
              required
            />
          </div>

          <div class="item">
            <label for="endDate">종료 날짜</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              v-model="form.endDate"
              required
            />
          </div>
        </div>

        <div class="btn">
          <button @click="handleSubmit">저장</button>
          <button @click="closeModal">닫기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-weight: 800;
}

.items {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;
}

.field {
  width: 70%;
  min-width: 100px;
}
</style>
