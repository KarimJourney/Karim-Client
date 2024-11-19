<script setup>
import { ref } from "vue";
import { useLoginStore } from "@/stores/login";
import axios from "@/utils/axios"; // axios 임포트
import { useRouter } from "vue-router";

const props = defineProps({
  // 부모 컴포넌트에서 모달을 제어하기 위한 'showModal' prop이 필요
  showModal: {
    type: Boolean,
    required: true,
  },
  plan: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "editPlan"]);

const loginStore = useLoginStore();
const router = useRouter();

// 모달 닫기
const closeModal = () => {
  emit("close");
};

// 여행 계획 삭제 처리
const deletePlan = async () => {
    try {
      const response = await axios.delete("/plan", {data: {id: props.plan.id, userId: loginStore.getId}}); // 서버에 여행 계획 추가
      closeModal(); // 저장 후 모달 닫기
      router.push({name:'mypage'});
    } catch (error) {
      console.error("여행 계획을 삭제하는 데 실패했습니다.", error);
    }
};
</script>

<template>
  <div id="modal-overlay">
    <div id="modal">
      <h2>여행 편집</h2>
      <div id="modal-content">
        <div class="items">
          <div class="item">
            <label for="name">여행 제목</label>
            <input
              id="name"
              name="name"
              type="text"
              v-model="plan.name"
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
              v-model="plan.startDate"
              required
            />
          </div>

          <div class="item">
            <label for="endDate">종료 날짜</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              v-model="plan.endDate"
              required
            />
          </div>
        </div>

        <div class="btn">
          <button @click="$emit('editPlan', plan)">저장</button>
          <button @click="deletePlan">여행 삭제</button>
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
