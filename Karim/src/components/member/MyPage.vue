<script setup>
import { ref, onMounted } from "vue";
import PlanModal from "@/components/trip/TripModal.vue"; // 여행 계획을 추가하는 모달 컴포넌트
import { useRouter } from "vue-router";
import axios from "@/utils/axios"; // axios 임포트
import { useLoginStore } from "@/stores/login";

const showModal = ref(false);
const loginStore = useLoginStore();

const userId = loginStore.getId;
const member = ref({}); // 사용자 정보를 저장할 ref
const plans = ref([]);
const msg = ref("");
const router = useRouter();

// 컴포넌트가 마운트될 때 여행 계획 목록을 불러옵니다.
onMounted(async () => {
  try {
    const response = await axios.get(`/member/${userId}`);
    member.value = response.data;
  } catch (error) {
    console.error("회원 정보를 가져오는 데 실패했습니다.", error);
  }
  try {
    const response = await axios.get(`/plan/${userId}`);
    plans.value = response.data;
  } catch (error) {
    console.error("여행 계획 목록을 가져오는 데 실패했습니다.", error);
  }
});

// 여행 계획 추가
const addPlan = async (plan) => {
  try {
    const response = await axios.post("/plan/new", plan); // 여행 계획 추가
    showModal.value = false; // 모달 닫기
    router.go(0);
  } catch (error) {
    console.error("여행 계획을 추가하는 데 실패했습니다.", error);
  }
};

// 여행 계획 상세 페이지로 이동
const goToPlaceList = (planId) => {
  router.push({ name: "place", params: { id: planId } }); // 여행 계획 ID를 URL 파라미터로 전달
};
</script>

<template>
  <section>
    <div class="profile-header">
      <div
        class="profile-picture"
        :style="{ backgroundImage: `url(${member.profileImageUrl || 'default-image-url.jpg'})` }"
      ></div>
      <div class="profile-info">
        <h2>{{ member.nickname }}</h2>
        <h5>@{{ member.id }}</h5>
        <div class="btn">
          <template v-if="userId == member.id">
            <button
              @click="router.push({ name: 'memberedit' })"
              class="edit-profile"
            >
              내 정보 수정
            </button>
          </template>
          <button @click="showModal = true" class="add-plan">
            새 여행 계획 추가
          </button>
        </div>
      </div>
    </div>

    <div class="profile-trip">
      <ul>
        <template v-if="plans.length">
          <li v-for="(plan, index) in plans" :key="index" class="trip-item">
            <a @click="goToPlaceList(plan.id)" class="trip-link">
              <h3>{{ plan.name }}</h3>
              <p>{{ plan.startDate }} ~ {{ plan.endDate }}</p>
            </a>
          </li>
        </template>
        <template v-else>
          <li id="no_plan">여행 계획이 없습니다!</li>
        </template>
      </ul>
    </div>

    <PlanModal
      v-if="showModal"
      :showModal="showModal"
      @close="showModal = false"
      @addPlan="addPlan"
    />
  </section>
</template>

<style scoped>
body {
  background-color: #e5e7eb;
  font-family: "Roboto", sans-serif;
  color: #333;
}

.profile-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-bottom: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.profile-picture {
  width: 120px;
  height: 120px;
  background-color: #ccc;
  border-radius: 50%;
  margin-right: 30px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #111827;
}

h5 {
  font-size: 16px;
  color: #6b7280;
  margin-top: 8px;
}

.btn {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.edit-profile,
.add-plan {
  background-color: var(--navy);;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.edit-profile:hover,
.add-plan:hover {
  background-color: var(--navy);
}

.profile-trip {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  border-radius: 12px;
  max-width: 1200px;
  margin: 0 auto;
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  width: 100%;
  padding: 0;
  list-style: none;
}

.trip-item {
  background-color: #f9fafb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.trip-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.trip-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
}

h3 {
  font-size: 20px;
  margin: 0;
  color: #1f2937;
}

p {
  font-size: 14px;
  color: #6b7280;
  margin-top: 10px;
}

#no_plan {
  font-weight: 500;
  font-size: 20px;
  color: #9ca3af;
  text-align: center;
  margin-top: 50px;
}
</style>
