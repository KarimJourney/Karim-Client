<script setup>
import { ref } from "vue";
import { useLoginStore } from "@/stores/login";
import axios from "@/utils/axios"; // axios 임포트
import { defineComponent } from 'vue';

defineComponent({
  name: 'MaterialSymbolsTrip',
  name: 'LineMdCalendar',
  name: 'IonCalendarSharp',
});

defineProps({
  // 부모 컴포넌트에서 모달을 제어하기 위한 'showModal' prop이 필요
  showModal: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "addPlan"]);

const loginStore = useLoginStore();
const minDate = ref("1970-01-01");

const form = ref({
  userId: loginStore.getId,
  name: "",
  startDate: "",
  endDate: "",
});

// 여행 계획 추가 처리
const handleSubmit = async () => {
  // 폼 데이터를 부모로 전달
  if (form.value.name && form.value.startDate && form.value.endDate) {
    try {
      const newPlan = { ...form.value };
      const response = await axios.post("/plan", newPlan); // 서버에 여행 계획 추가
      console.log(response.data);
      emit("close"); // 추가된 계획을 부모로 전달
    } catch (error) {
      console.error("여행 계획을 추가하는 데 실패했습니다.", error);
    }
  }
};
</script>

<template>
  <div id="modal-overlay">
    <div id="modal">
      <button id="close" @click="$emit('close')">X</button>
      
      <div id="modal-content">
        <h2><svg xmlns="http://www.w3.org/2000/svg" width="0.6em" height="0.6em" viewBox="0 0 24 24">
		<rect width="14" height="0" x="5" y="5" fill="currentColor">
			<animate fill="freeze" attributeName="height" begin="0.6s" dur="0.2s" values="0;3" />
		</rect>
		<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
			<path stroke-dasharray="64" stroke-dashoffset="64" d="M12 4h7c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1v-14c0 -0.55 0.45 -1 1 -1Z">
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
			</path>
			<path stroke-dasharray="4" stroke-dashoffset="4" d="M7 4v-2M17 4v-2">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="4;0" />
			</path>
			<path stroke-dasharray="12" stroke-dashoffset="12" d="M7 11h10">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="12;0" />
			</path>
			<path stroke-dasharray="8" stroke-dashoffset="8" d="M7 15h7">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="8;0" />
			</path>
		</g>
	</svg></h2>
        <div class="items">
          <div class="item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path fill="currentColor" d="M18 21V6h2q.825 0 1.413.588T22 8v11q0 .825-.587 1.413T20 21zM10 6h4V4h-4zM8 21V4q0-.825.588-1.412T10 2h4q.825 0 1.413.588T16 4v17zm-4 0q-.825 0-1.412-.587T2 19V8q0-.825.588-1.412T4 6h2v15z" />
	</svg></span>
            <input
              type="text"
              v-model="form.name"
              required
              placeholder="여행 이름"
            />
          </div>

          <div class="item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
		<path fill="currentColor" d="M32 456a24 24 0 0 0 24 24h400a24 24 0 0 0 24-24V176H32Zm320-244a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4ZM456 64h-55.92V32h-48v32H159.92V32h-48v32H56a23.8 23.8 0 0 0-24 23.77V144h448V87.77A23.8 23.8 0 0 0 456 64" />
	</svg></span>
            <input
              type="date"
              placeholder="시작 날짜"
              v-model="form.startDate"
              @change="minDate = form.startDate"
              required
            />
          </div>

          <div class="item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
		<path fill="currentColor" d="M32 456a24 24 0 0 0 24 24h400a24 24 0 0 0 24-24V176H32Zm320-244a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4ZM456 64h-55.92V32h-48v32H159.92V32h-48v32H56a23.8 23.8 0 0 0-24 23.77V144h448V87.77A23.8 23.8 0 0 0 456 64" />
	</svg></span>
            <input
              type="date"
              placeholder="종료 날짜"
              v-model="form.endDate"
              required
              :min="minDate"
            />
          </div>

          <button id="submit" @click="handleSubmit">저장</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#modal {
  display: flex;
  align-items: center;
}

#close {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}

h2 {
  color: var(--navy);
  cursor: pointer;
  font-weight: 500;
  font-family: "dongle", sans-serif;
  font-size: 60px;
}

.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.item {
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.item input {
  padding: 10px 40px;
  font-size: 16px;
  background-color: #F4F4F4;
}

.item .icon {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-40%);
  z-index: 5;
}

#submit {
  background-color: var(--navy);
  color: var(--white);
  width: 100%;
}
</style>
