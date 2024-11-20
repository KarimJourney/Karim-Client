<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/axios";
import { useLoginStore } from "@/stores/login";
import TripEditModal from "@/components/trip/TripEditModal.vue";

const showModal = ref(false);
const app_key = import.meta.env.VITE_KAKAOMAP_API_KEY;
const loginStore = useLoginStore();

const route = useRoute();
const router = useRouter();
const plan = ref({}); 
const places = ref([]); 
const isEditing = ref(false);

onMounted(async () => {
  const planId = route.params.id;
  try {
    const param = ref({ id: planId, userId: loginStore.getId });
    const response = await axios.post(`/plan/${planId}`, param.value);
    plan.value = response.data.plan;
    places.value = response.data.data;

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${app_key}&autoload=false`;
    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) {
          console.error("#map 요소를 찾을 수 없습니다.");
          return;
        }
        const options = {
          center: new kakao.maps.LatLng(37.500613, 127.036431),
          level: 3,
        };
        map = new kakao.maps.Map(container, options);
        addMarkers();
      });
    };
    script.onerror = () => {
      console.error("카카오맵 API 로딩 실패");
    };
    document.head.appendChild(script);
  } catch (error) {
    console.error("여행 계획 목록을 가져오는 데 실패했습니다.", error);
  }
});

let map = null;
let markers = [];

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
    const response = await axios.put(`/plan/${route.params.id}`, {data: places.value});
    isEditing.value = false;
  } catch (error) {
    console.error("장소 순서 업데이트 실패:", error);
  }
};

// 장소 삭제
const deletePlace = async (place, index) => {
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
      <span id="close" @click="router.push({ name: 'mypage' })">X</span>
      <div class="items">
        <h2>{{ plan.name }}&nbsp;&nbsp;<span @click="showModal = true">
          편집
        </span></h2>
        <h4>{{ plan.startDate }} - {{ plan.endDate }}</h4>
        <div id="edit">
          <span v-show="!isEditing" @click="isEditing = true">수정</span>
          <span v-show="isEditing" @click="updatePlaceOrder">완료</span>
        </div>
        <div class="place">
          <h5>{{ plan.startDate }}</h5>
          <ul>
            <li v-for="(place, index) in places">
              <div class="place-item-content">
                <h6>{{ place.planDate }}</h6>
                <h6>{{ place.title }}</h6>
                <div class="btn" v-if="isEditing">
                  <button @click="movePlaceUp(index)" :disabled="index === 0">위로</button>
                  <button @click="movePlaceDown(index)" :disabled="index === places.length - 1">아래로</button>
                  <button @click="deletePlace(place, index)">삭제</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <div class="map-wrapper">
      <div id="map"></div>
    </div>

    <TripEditModal
      v-if="showModal"
      :showModal="showModal"
      :trip="plan"
      @close="showModal = false"
      @editPlan="editPlan"
    />
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 85px);
}

aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
  min-width: 320px;
  max-width: 500px;
  gap: 20px;
  box-sizing: border-box;
  padding: 10px 25px;
}


h2, h4 {
  margin: 0;
}

h2 {
  color: var(--dark-grey);
}

h2 span {
  font-size: 0.5em;
  text-decoration: underline;
  color: var(--light-gray);
  font-weight: 100;
}

aside {
  position: relative;
}

#edit {
  width: 100%;
  display: flex;
  justify-content: end;
  font-size: 0.9em;
}

#close {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}

.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
  height: calc(100vh - 20%);
}

.place {
  width: 90%;
}

h5 {
  font-size: 1.1em;
}

ul {
  width: 100%;
  height: calc(100vh - 35%);
  overflow-y: auto;
}

li {
  border-bottom: solid 1px var(--light-grey);
  padding: 15px 0;
  position: relative;
  word-break: keep-all;
}

li:last-child {
  border: none;
}

li .name {
  color: var(--black);
  font-size: 1em;
  width: 75%;
}

li .address {
  font-size: 0.7em;
  width: 75%;
}

li button {
  color: var(--black);
  font-size: 0.6em;
}

span {
  cursor: pointer;
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
}
</style>
