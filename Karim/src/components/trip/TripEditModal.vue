<script setup>
import { ref } from "vue";
import { useLoginStore } from "@/stores/login";
import axios from "@/utils/axios"; // axios 임포트
import { useRouter } from "vue-router";

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  trip: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "editPlan"]);

const loginStore = useLoginStore();
const router = useRouter();

// 여행 계획 삭제 처리
const deletePlan = async () => {
    try {
      const response = await axios.delete(`/plan/${loginStore.getId}/${props.plan.id}`);
      emit("close");
      router.push({name:'mypage'});
    } catch (error) {
      console.error("여행 계획을 삭제하는 데 실패했습니다.", error);
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
              v-model="trip.name"
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
              v-model="trip.startDate"
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
              v-model="trip.endDate"
              required
            />
          </div>
          
          <div class="item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
              viewBox="0 0 576 512">
              <path fill="currentColor"
                d="M564 192c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-48l18.6-80.6c1.7-7.5-4-14.7-11.7-14.7h-46.1c-5.7 0-10.6 4-11.7 9.5L450.7 128H340.8l-19.7-86c-1.3-5.5-6.1-9.3-11.7-9.3h-44c-5.6 0-10.4 3.8-11.7 9.3l-20 86H125l-17.5-85.7c-1.1-5.6-6.1-9.6-11.8-9.6H53.6c-7.7 0-13.4 7.1-11.7 14.6L60 128H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h62.3l7.2 32H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h83.9l40.9 182.6c1.2 5.5 6.1 9.4 11.7 9.4h56.8c5.6 0 10.4-3.9 11.7-9.3L259.3 288h55.1l42.4 182.7c1.3 5.4 6.1 9.3 11.7 9.3h56.8c5.6 0 10.4-3.9 11.7-9.3L479.1 288H564c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-70.1l7.4-32zM183.8 342c-6.2 25.8-6.8 47.2-7.3 47.2h-1.1s-1.7-22-6.8-47.2l-11-54h38.8zm27.5-118h-66.8l-6.5-32h80.8zm62.9 0l2-8.6c1.9-8 3.5-16 4.8-23.4h11.8c1.3 7.4 2.9 15.4 4.8 23.4l2 8.6zm130.9 118c-5.1 25.2-6.8 47.2-6.8 47.2h-1.1c-.6 0-1.1-21.4-7.3-47.2l-12.4-54h39.1zm25.2-118h-67.4l-7.3-32h81.6z" />
            </svg></span>
            <input
              type="number"
              v-model="trip.cost"
              placeholder="총 경비"
            />
          </div>

          <div class="item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13V4H6v16h12V9zM6 4v5zv16z" />
	</svg></span>
            <input
              type="text"
              v-model="trip.content"
              placeholder="설명"
            />
          </div>

          <button id="submit" @click="$emit('editPlan', trip)">저장</button>
          <p id="delete-plan" @click="deletePlan">여행 삭제</p>
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

#delete-plan {
  font-size: 0.8em;
}
</style>
