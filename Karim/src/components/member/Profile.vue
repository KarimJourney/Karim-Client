<script setup>
import { ref, onMounted } from "vue";
import PlanModal from "@/components/trip/TripModal.vue"; // 여행 계획을 추가하는 모달 컴포넌트
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/axios"; // axios 임포트
import { useLoginStore } from "@/stores/login";

const showModal = ref(false);
const loginStore = useLoginStore();
const route = useRoute();
const router = useRouter();

const member = ref({}); // 사용자 정보를 저장할 ref
const plans = ref([]);
const userId = route.params.id;

// 컴포넌트가 마운트될 때 여행 계획 목록을 불러옵니다.
onMounted(async () => {
  try {
    const response = await axios.get(`/member/${userId}`);
    member.value = response.data;
  } catch (error) {
    console.error("회원 정보를 가져오는 데 실패했습니다.", error);
    alert('존재하지 않는 사용자입니다.');
    router.go(-1);
  }
  try {
    const response = await axios.get(`/plan/${userId}`);
    plans.value = response.data;
  } catch (error) {
    console.error("여행 계획 목록을 가져오는 데 실패했습니다.", error);
  }
});

// 여행 계획 상세 페이지로 이동
const goToPlaceList = (planId) => {
  router.push({ name: "place", params: { id: planId }, meta: {userId: userId} }); // 여행 계획 ID를 URL 파라미터로 전달
};
</script>

<template>
  <section>
    <div class="profile-container">
      <!-- 프로필 정보 -->
      <div class="profile-section">
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
              <button @click="showModal = true" class="add-plan">
              새 여행 계획 추가
            </button>
            </template>
          </div>
        </div>
      </div>
      <hr class="divider" />
      <!-- 여행 계획 목록 -->
      <div class="trip-section">
        <ul>
          <template v-if="userId == loginStore.getId">
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
          </template>
          <template v-else>
            <li>여행 계획 {{ plans.length }}개</li>
          </template>
        </ul>
      </div>
    </div>

    <PlanModal
      v-if="showModal"
      :showModal="showModal"
      @close="showModal = false; router.go(0);"
    />
  </section>
</template>

<style scoped>
/* 전체 컨테이너 */
.profile-container {
  background-color: #ffffff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 프로필 섹션 */
.profile-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
  color: #1f2937;
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
  background-color: var(--navy);
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

/* Divider */
.divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 20px 0;
}

/* 여행 계획 섹션 */
.trip-section ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 0;
  list-style: none;
}

.trip-item {
  background-color: #f9fafb;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.trip-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  background-color: var(--navy);
}

.trip-item:hover h3,
.trip-item:hover p {
  color: #ffffff; /* 텍스트 색상을 화이트로 설정 */
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
  transition: color 0.3s ease;
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
  margin-top: 20px;
}
</style>
