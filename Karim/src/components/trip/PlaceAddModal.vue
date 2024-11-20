<script setup>
import { ref, onMounted } from "vue";
import planSelectList from "@/components/items/planSelectList.vue";
import { useLoginStore } from "@/stores/login";
import axios from "@/utils/axios";
import { defineComponent } from 'vue';

defineComponent({
  name: 'MaterialSymbolsTrip',
  name: 'LineMdCalendar',
  name: 'IonCalendarSharp',
});

const loginStore = useLoginStore();
const isCheck = ref(false);

const selectedTrip = ref("");
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

const selectPlan = () => {
  if (selectedDate.value) {
    console.log(planDto.value);
    emit("select-plan", planDto.value.id, selectedDate.value);
  } else {
    alert("날짜를 선택해주세요.");
  }
};

const changeCheck = (plan) => {
  isCheck.value = !isCheck.value;
  planDto.value = plan;
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
  <h6>추가할 계획을 선택한 후 날짜를 입력하세요.</h6>
        <div class="items">
          <div class="item" v-for="trip in trips" @click="selectedTrip = trip">
            {{ trip.name }}
            {{ trip.startDate }} - {{ trip.endDate }}
          </div>

          <div class="item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
		<path fill="currentColor" d="M32 456a24 24 0 0 0 24 24h400a24 24 0 0 0 24-24V176H32Zm320-244a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm-80-80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4Zm0 80a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4h-40a4 4 0 0 1-4-4ZM456 64h-55.92V32h-48v32H159.92V32h-48v32H56a23.8 23.8 0 0 0-24 23.77V144h448V87.77A23.8 23.8 0 0 0 456 64" />
	</svg></span>
            <input
              type="date"
              placeholder="날짜"
              v-model="selectedDate"
              required
            />
          </div>

          <button id="submit" @click="handleSubmit">저장</button>
        </div>
      </div>
    </div>
  </div>


<!-- 
  <div>
    <ul>
      <li
        class="list-item"
        v-for="plan in plans"
        :key="plan.id"
        @click="changeCheck(plan)"
        :class="{ active: planDto.id === plan.id }"
      >
        <h3 class="list-item-title">{{ plan.name }}</h3>
        <p class="list-item-date">{{ plan.startDate }} ~ {{ plan.endDate }}</p>
      </li>
    </ul>
    <div v-if="isCheck" class="date-selection">
      <p>{{ planDto.name }}</p>
      <input type="date" v-model="selectedDate" />
      <button @click="selectPlan()">추가하기</button>
    </div>
  </div> -->
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
  transform: translateY(-50%);
}

/* .list-item {
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.list-item.active {
  border-color: --purple;
  background-color: #faf6ff;
}

.list-item:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.list-item-title {
  font-size: 1.3em;
  font-weight: bold;
  margin-bottom: 8px;
}

.list-item-date {
  font-size: 0.95em;
  color: #666;
}

.date-selection {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-selection p {
  font-size: 1.1em;
  margin-bottom: 10px;
}

.date-selection input[type="date"] {
  padding: 10px;
  font-size: 1em;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.date-selection button {
  background-color: --purple;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.date-selection button:hover {
  background-color: #9271c4;
  transform: scale(1.05);
} */
</style>
