<script setup>
import { ref, onMounted } from "vue";
import { useLoginStore } from "@/stores/login";
import axios from "@/utils/axios";
import { defineComponent } from 'vue';

defineComponent({
  name: 'MaterialSymbolsTrip',
  name: 'LineMdCalendar',
  name: 'IonCalendarSharp',
});

const props = defineProps({
  place: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits("close");
const loginStore = useLoginStore();
const selectedTrip = ref({
  name:"",
  startDate:"1970-01-01",
  endDate:"2099-12-31"
});
const selectedDate = ref("");
const trips = ref({});


onMounted(async () => {
  try {
    const userId = ref({
      userId: loginStore.getId,
    });
    const response = await axios.post(`/plan`, userId.value);
    trips.value = response.data.data;
  } catch (error) {
    console.error("여행 계획 목록을 가져오는 데 실패했습니다.", error);
  }
});

const addPlace = async () => {
  console.log(selectedTrip.value, selectedDate.value);
  try {
    const data = {
      planId: selectedTrip.value.id,
      attr_id: 3818, // props.place.id,
      planDate: selectedDate.value,
      order: 0, // 순서는 임시로 0 설정, 필요시 변경 가능
    };
    await axios.post(`/plan/${selectedTrip.value.id}/new`, data);
    closeModal(); // 장소 추가 후 모달 닫기
  } catch (error) {
    console.error("장소 추가 중 오류 발생", error);
  }
};

const closeModal = () => {
  selectedTrip.value = {
    name:"",
    startDate:"1970-01-01",
    endDate:"2099-12-31"
  };
  selectedDate.value = "";
  emit('close');
}
</script>

<template>
  <div id="modal-overlay">
    <div id="modal">
      <button id="close" @click="closeModal">X</button>
      <div id="modal-content">
        <h2><svg xmlns="http://www.w3.org/2000/svg" width="0.6em" height="0.6em" viewBox="0 0 24 24">
            <rect width="14" height="0" x="5" y="5" fill="currentColor">
              <animate fill="freeze" attributeName="height" begin="0.6s" dur="0.2s" values="0;3" />
            </rect>
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path stroke-dasharray="64" stroke-dashoffset="64"
                d="M12 4h7c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1v-14c0 -0.55 0.45 -1 1 -1Z">
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
        <h6>추가할 계획을 선택한 후 날짜를 입력하세요.</h6>
        <div class="items">
          <div class="item">
            <select v-model="selectedTrip">
              <option v-for="trip in trips" :value="trip">{{ trip.name }}</option>
            </select>
          </div>

          <div class="item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                <path fill="currentColor"
                  d="M32 456a24 24 0 0 0 24 24h400a24 24 0 0 0 24-24V176H32Zm320-244a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4ZM456 64h-55.92V32h-48v32H159.92V32h-48v32H56a23.8 23.8 0 0 0-24 23.77V144h448V87.77A23.8 23.8 0 0 0 456 64" />
              </svg></span>
            <input type="date" placeholder="날짜" v-model="selectedDate" :min="selectedTrip.startDate" :max="selectedTrip.endDate" required />
          </div>

          <button id="submit" @click="addPlace">저장</button>
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

h6 {
  transform: translateY(-100%);
}

.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.item:first-child {
  justify-content: center;
}

.item {
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.item select {
  width: 100%;
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
  transform: translateY(-50%);
  z-index: 5;
}
</style>
