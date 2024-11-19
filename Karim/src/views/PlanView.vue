<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/axios"; // axios 임포트
import { useLoginStore } from "@/stores/login";
import PlanEditModal from "@/components/plan/PlanEditModal.vue";

const showModal = ref(false);
const app_key = import.meta.env.VITE_MAPYOUR_API_KEY;
const loginStore = useLoginStore();

const route = useRoute();
const router = useRouter();
const plan = ref({}); // 현재 여행 계획
const places = ref([]); // 해당 여행 계획에 속한 장소들
const mapContainer = ref(null); // 카카오맵을 렌더링할 컨테이너
const isEditing = ref(false); // 수정 모드 여부

// 여행 계획 ID를 받아와서 해당 여행 계획에 해당하는 장소를 불러오기
onMounted(async () => {
  const planId = route.params.id;
  try {
    const param = ref({ id: planId, userId: loginStore.getId });
    const response = await axios.post(`/plan/${planId}`, param.value);
    plan.value = response.data.plan; // 서버에서 받은 여행 계획 목록을 저장
    places.value = response.data.data;

    initializeMap(); // 지도 초기화 호출
  } catch (error) {
    console.error("여행 계획 목록을 가져오는 데 실패했습니다.", error);
  }
});

let map = null;
let markers = [];

// 기본 이미지 경로 설정
const defaultImagePath = ref("@/assets/img/default__background.svg");

// 맵 초기화 함수
const initializeMap = () => {
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${app_key}&autoload=false`;
  script.onload = () => {
    kakao.maps.load(() => {
      const container = document.getElementById("map"); // 맵을 표시할 div
      if (!container) {
        console.error("#map 요소를 찾을 수 없습니다.");
        return;
      }

      const options = {
        center: new kakao.maps.LatLng(37.500613, 127.036431), // 초기 중심 좌표
        level: 3, // 확대 레벨
      };
      map = new kakao.maps.Map(container, options); // 지도 생성
      addMarkers(); // 지도에 마커 추가
    });
  };
  script.onerror = () => {
    console.error("카카오맵 API 로딩 실패");
  };
  document.head.appendChild(script);
};

// 마커 추가 함수
const addMarkers = () => {
  if (!map) return;

  // 기존 마커 제거
  markers.forEach((marker) => marker.setMap(null));
  markers = [];

  places.value.forEach((place) => {
    if (!place.latitude || !place.longitude) {
      console.warn(`Trip ID ${place.name}의 좌표 정보가 누락되었습니다.`);
      return;
    }

    const position = new kakao.maps.LatLng(place.latitude, place.longitude);
    const marker = new kakao.maps.Marker({
      map: map,
      position: position,
      title: place.name,
    });

    markers.push(marker);

    // 마커 클릭 시 중심 이동
    kakao.maps.event.addListener(marker, "click", () => {
      map.setCenter(position);
    });
  });

  // 첫 번째 좌표로 지도 이동
  if (
    places.value.length > 0 &&
    places.value[0].latitude &&
    places.value[0].longitude
  ) {
    map.setCenter(
      new kakao.maps.LatLng(places.value[0].latitude, places.value[0].longitude)
    );
  }
};

watch(
  () => places.value, // places 배열이 바뀔 때마다 마커 갱신
  () => {
    addMarkers();
  },
  { immediate: true }
);

// 장소 순서 변경
const movePlaceUp = (index) => {
  if (index > 0) {
    const orderTemp = places.value[index].order;
    places.value[index].order = places.value[index - 1].order;
    places.value[index - 1].order = orderTemp;
    const temp = places.value[index];
    places.value[index] = places.value[index - 1];
    places.value[index - 1] = temp;
  }
};

const movePlaceDown = (index) => {
  if (index < places.value.length - 1) {
    const orderTemp = places.value[index].order;
    places.value[index].order = places.value[index + 1].order;
    places.value[index + 1].order = orderTemp;
    const temp = places.value[index];
    places.value[index] = places.value[index + 1];
    places.value[index + 1] = temp;
  }
};

// 수정 완료 후 서버에 순서 업데이트 요청
const updatePlaceOrder = async () => {
  try {
    const response = await axios.put(`/plan/${route.params.id}`, {
      data: places.value, // 변경된 장소 목록을 서버로 전송
    });
    console.log("순서가 성공적으로 업데이트되었습니다.");
    isEditing.value = false; // 수정 완료 후 수정 모드 종료
  } catch (error) {
    console.error("장소 순서 업데이트 실패:", error);
  }
};

// 장소 삭제
const deletePlace = async (place, index) => {
  places.value.splice(index, 1);
  try {
    const response = await axios.delete(`/plan/${place.id}`);
    console.log(`${place.id} 삭제가 완료되었습니다.`);
  } catch (error) {
    console.error("장소 삭제 실패:", error);
  }
};

// 계획 편집
const editPlan = async (plan) => {
  try {
    const response = await axios.patch("/plan", plan); // 여행 계획 추가
    showModal.value = false; // 모달 닫기
  } catch (error) {
    console.error("여행 계획을 수정하는 데 실패했습니다.", error);
  }
};
</script>

<template>
  <section>
    <aside>
      <div class="items">
        <h2>{{ plan.name }}&nbsp;&nbsp;<span @click="showModal = true">
          여행 편집
        </span></h2>
        <h4>{{ plan.startDate }} ~ {{ plan.endDate }}</h4>

        <ul>
          <li
            v-for="(place, index) in places"
            :key="place.name"
            class="place-item"
          >
            <!-- <span>{{ index + 1 }}. {{ place.name }}</span> -->
            <img
              :src="
                place.img1
                  ? place.img1
                  : '/src/assets/img/default__background.svg'
              "
              alt="이미지"
            />
            <div class="place-item-content">
              <h6>{{ place.planDate }}</h6>
              <h6>{{ place.title }}</h6>
              <div class="btn" v-if="isEditing">
                <button class="edit" @click="movePlaceUp(index)" :disabled="index === 0">
                  위로
                </button>
                <button class="edit" 
                  @click="movePlaceDown(index)"
                  :disabled="index === places.length - 1"
                >
                  아래로
                </button>
                <button class="edit" @click="deletePlace(place, index)">삭제</button>
              </div>
            </div>
          </li>
        </ul>
        <div class="btn">
          <!-- 수정/완료 버튼 -->
<button v-show="!isEditing" @click="isEditing = true">수정</button>
          <button v-show="isEditing" @click="updatePlaceOrder">완료</button>
          <button type="button" @click="router.push({ name: 'mypage' })">
          뒤로
        </button>
        </div>
      </div>
    </aside>
    <div class="map-wrapper">
      <div id="map"></div>
    </div>

    <PlanEditModal
      v-if="showModal"
      :showModal="showModal"
      :plan="plan"
      @close="showModal = false"
      @editPlan="editPlan"
    />
  </section>
</template>

<style scoped>
h2, h4 {
  margin: 0;
}

h2 span {
  font-size: 11px;
  text-decoration: underline;
  color: var(--light-gray);
  font-weight: 100;
}
section {
  display: flex;
  justify-content: space-between;
  height: 75vh;
}

aside {
  display: flex;
  flex-direction: column;
  width: 50vw;
  min-width: 220px;
  max-width: 550px;
  gap: 15px;
  box-sizing: border-box;
}

.items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

ul {
  height: 50vh;
  padding: 10px;
  overflow-y: auto;
}

.place-item {
  display: flex; /* 플렉스 컨테이너로 설정 */
  align-items: center; /* 세로 정렬 중앙 정렬 */
  padding: 15px;
  margin: 1.5vh 0;
  border: 1px solid #dcdcdc;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  background-color: #f9f9f9;
}

.place-item img {
  width: 9vw; /* 이미지 크기 */
  height: 9vw; /* 이미지 높이 */
  object-fit: cover;
  border-radius: 10px;
  margin-right: 15px; /* 텍스트와 이미지 사이 간격 */
}

.place-item-content {
  display: flex;
  flex-direction: column; /* 텍스트와 버튼을 세로 정렬 */
  flex: 1; /* 텍스트 영역이 남은 공간 차지 */
}

.place-item:hover {
  transform: scale(1.02); /* 미세한 확대 효과 */
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

.place-item-content h6 {
  margin: 5px 0;
  font-weight: 600; /* 굵기 조정 */
  font-size: 1rem; /* 폰트 크기 축소 */
  color: #555; /* 더 부드러운 색상 */
  text-align: center;
}

.btn {
  width: 50%;
  display: flex;
  justify-content: space-between;
}

.edit {
  padding: 5px;
  font-size: 10px;
}

.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  margin-left: 10px;
}
#map {
  width: 100%;
  height: 100%;
  border-radius: 15px; /* 지도의 모서리 부드럽게 */
}
</style>
