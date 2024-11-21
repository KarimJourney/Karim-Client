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
      <h2>{{ member.nickname }}</h2>
      <h5>@{{ member.id }}</h5>
      <div class="btn">
        <template v-if="userId == member.id"
          ><button @click="router.push({ name: 'memberedit' })">
            내 정보 수정
          </button>
        </template>
        <button @click="showModal = true">새 여행 계획 추가</button>
      </div>
    </div>

    <div class="profile-trip">
      <ul>
        <template v-if="plans.length">
          <li v-for="(plan, index) in plans" :key="index">
            <a @click="goToPlaceList(plan.id)">
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
.btn {
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 20px;
  margin-bottom: 30px;
}

ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
li {
  width: 30%;
  box-sizing: border-box;
  border: solid 1px var(--purple);
  border-radius: 10px;
  padding: 1vw;
}
a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
}
h3 {
  margin: 0;
  padding-top: 15px;
}
p {
  padding-bottom: 15px;
}

#no_plan {
  border: none;
  font-weight: 600;
  font-size: 30px;
  width: 100%;
  text-align: center;
}

@media screen and (max-width: 768px) {
  li {
    width: 48%;
  }
}
</style>
