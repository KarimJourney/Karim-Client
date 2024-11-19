<script setup>
import { ref } from "vue";
const isCheck = ref(false);
const props = defineProps({
  plans: Array,
});
const emit = defineEmits(["select-plan"]);

const selectedDate = ref("");

const planDto = ref({});

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
  </div>
</template>

<style scoped>
.list-item {
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
}
</style>
