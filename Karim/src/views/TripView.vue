<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/axios";
import { useLoginStore } from "@/stores/login";
import TripEditModal from "@/components/trip/TripEditModal.vue";
import { getDistance } from "geolib";

const showModal = ref(false);
const app_key = import.meta.env.VITE_KAKAOMAP_API_KEY;
const loginStore = useLoginStore();

const route = useRoute();
const router = useRouter();

let map = null;
let markers = [];
let lines = [];
const plan = ref({}); 
const places = ref([]); 
const curDate = ref({});
const dates = ref([]);
const distances = ref({});
const placeLists = ref({});
const isEditing = ref(false);

onMounted(async () => {
  const planId = route.params.id;
  try {
    const response = await axios.get(`/plan/detail/${planId}`);
    plan.value = response.data.plan;
    curDate.value = plan.value.startDate;
    places.value = response.data.places;
    placeLists.value = places.value.reduce((acc, curr) => {
      const { planDate } = curr;
      if (acc[planDate]) acc[planDate].push(curr);
      else acc[planDate] = [curr];
      return acc;
    }, {});
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
        addMarkers(plan.value.startDate);
        addLines(plan.value.startDate);
      });
    };
    script.onerror = () => {
      console.error("카카오맵 API 로딩 실패");
    };
    document.head.appendChild(script);
  } catch (error) {
    console.error("여행 계획과 장소를 가져오는 데 실패했습니다.", error);
  }
  let currentDate = new Date(plan.value.startDate);
  const endDate = new Date(plan.value.endDate);
  while (currentDate <= endDate) {
    dates.value.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1); 
  }
  calcDistances();
});


// 마커 추가 함수
const addMarkers = (date) => {
  if (!map) return;

  // 기존 마커 제거
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
  var index = 1;

  if (!placeLists.value[date]) return;

  placeLists.value[date].forEach((place) => {
    if (!place.latitude || !place.longitude) {
      console.warn(`Trip ID ${place.name}의 좌표 정보가 누락되었습니다.`);
      return;
    }

    const position = new kakao.maps.LatLng(place.latitude, place.longitude);

    const content = `
      <div class="marker-index">
        <h5>${ index }</h5>
      </div>
    `;

    const marker = new kakao.maps.CustomOverlay({
      map: map,
      position: position,
      title: place.name,
      content: content,
    });

    markers.push(marker);

    index++;

    // 마커 클릭 시 중심 이동
    kakao.maps.event.addListener(marker, "click", () => {
      map.panTo(
        position, {
        animate: {
          duration: 550
        }
      }
      );
    });
  });

  // 첫 번째 좌표로 지도 이동
  if (
    placeLists.value[date].length > 0 &&
    placeLists.value[date][0].latitude &&
    placeLists.value[date][0].longitude
  ) {
    map.panTo(
      new kakao.maps.LatLng(placeLists.value[date][0].latitude, placeLists.value[date][0].longitude), {
          animate: {
              duration: 550
          }
      }
    );
  }
};

const addLines = (date) => {
  if (!map) return;

  lines.forEach((line) => line.setMap(null));
  lines = [];
  let prev = null;

  if (!placeLists.value[date]) return;
  
  placeLists.value[date].forEach((place) => {
    const position = new kakao.maps.LatLng(place.latitude, place.longitude);
    if (prev != null) {
      var line = new kakao.maps.Polyline({
        path: [prev, position],
        strokeWeight: 3,
        strokeColor: 'black',
        strokeOpacity: 0.7,
        strokeStyle: 'dash'
      });
      line.setMap(map);
      lines.push(line);
    }
    prev = position;
  });
};

const calcDistances = () => {
  distances.value = [];
  dates.value.forEach((date) => {
    distances.value[date] = [];
    let prevLat = null, prevLng = null;
    if (placeLists.value[date]) {
      placeLists.value[date].forEach((place, index) => {
      if (prevLat !== null && prevLng !== null) {
        const dist = getDistance(
          { latitude: prevLat, longitude: prevLng }, // 서울
          { latitude: place.latitude, longitude: place.longitude }  // 부산
        );
        distances.value[date].push(dist);
        console.log(distances.value[date][index - 1]);
      }
      prevLat = place.latitude;
      prevLng = place.longitude;
    });
    }
  });
};


const getPlace = (place) => {
  const position = new kakao.maps.LatLng(place.latitude, place.longitude);
  map.panTo(position, {
    animate: {
      duration: 550
    }
  }
  );
}

watch(
  () => curDate.value,
  (date) => {
    addMarkers(date);
    addLines(date);
    calcDistances();
  },
  { immediate: true }
);

// 장소 순서 변경
const movePlaceUp = (index, date) => {
  if (index > 0) {
    var temp = placeLists.value[date][index];
    placeLists.value[date].splice(index, 1);
    placeLists.value[date].splice(index - 1, 0, temp);
  }
};

const movePlaceDown = (index, date) => {
  if (index < places.value.length - 1) {
    var temp = placeLists.value[date][index];
    placeLists.value[date].splice(index, 1);
    placeLists.value[date].splice(index + 1, 0, temp);
  }
};

const updatePlace = async () => {
  try {
    console.log(places.value);
    const keys = Object.keys(placeLists.value);
    places.value = [];
    for (var i = 0; i < keys.length; i++) {
      const keys2 = Object.keys(placeLists.value[keys[i]]);
      for (var j = 0; j < keys2.length; j++) {
        places.value.push(placeLists.value[keys[i]][keys2[j]]);
      }
      console.log(places.value);
    }
    const response = await axios.put(`/plan/detail/${route.params.id}`, {data: places.value});
    isEditing.value = false;
  } catch (error) {
    console.error("장소 순서 업데이트 실패:", error);
  }
};

// 장소 삭제
const deletePlace = async (place, index) => {
  if (confirm('삭제하시겠습니까?')) {
      try {
      const response = await axios.delete(`/plan/detail/${route.params.id}/${place.id}`);
      console.log(`${place.id} 삭제가 완료되었습니다.`);
      router.go(0);
    } catch (error) {
      console.error("장소 삭제 실패:", error);
    }
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

const moveMap = (date, index) => {
  window.open(`https://www.google.com/maps/dir/?api=1&origin=${placeLists.value[date][index].name}&destination=${placeLists.value[date][index+1].name}&travelmode=transit`);
}
</script>
<template>
  <section>
    <aside>
      <span id="close" @click="router.push({ name: 'mypage' })">X</span>
      <div class="items">
        <div id="info">
          <h2>{{ plan.name }}&nbsp;<span @click="showModal = true">
              편집
            </span></h2>
          <h4>{{ plan.startDate }} - {{ plan.endDate }}</h4>
          <h5 class="content"><span v-if="plan.cost">\{{ plan.cost.toLocaleString() }}</span><br>{{ plan.content }}</h5>
        </div>
        <div id="edit">
          <span v-show="!isEditing" @click="isEditing = true">수정</span>
          <span v-show="isEditing" @click="updatePlace">완료</span>
        </div>
        <template v-if="places.length > 0">
          <div class="place">
            <template v-for="(date, index) in dates">
              <div>
                <h3 @click="curDate = date">Day {{ index + 1 }}</h3>
                <h4 class="date">{{ date }}</h4>
                <ul>
                  <li v-for="(p, index) in placeLists[date]">
                    <div class="distance" @click="moveMap(date, index)">{{ distances[date][index] }}m</div>
                    <div class="place-item" @click="curDate = date; getPlace(p)">
                      <div class="place-index">
                        <h5>{{ index + 1 }}</h5>
                      </div>
                      <h4>{{ p.name }}</h4>
                      <template v-if="!isEditing">
                        <h6 v-if="p.cost">\ {{ p.cost.toLocaleString() }}</h6>
                        <h5 v-if="p.content">{{ p.content }}</h5>
                      </template>
                      <template v-else>
                        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                            viewBox="0 0 576 512">
                            <path fill="currentColor"
                              d="M564 192c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-48l18.6-80.6c1.7-7.5-4-14.7-11.7-14.7h-46.1c-5.7 0-10.6 4-11.7 9.5L450.7 128H340.8l-19.7-86c-1.3-5.5-6.1-9.3-11.7-9.3h-44c-5.6 0-10.4 3.8-11.7 9.3l-20 86H125l-17.5-85.7c-1.1-5.6-6.1-9.6-11.8-9.6H53.6c-7.7 0-13.4 7.1-11.7 14.6L60 128H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h62.3l7.2 32H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h83.9l40.9 182.6c1.2 5.5 6.1 9.4 11.7 9.4h56.8c5.6 0 10.4-3.9 11.7-9.3L259.3 288h55.1l42.4 182.7c1.3 5.4 6.1 9.3 11.7 9.3h56.8c5.6 0 10.4-3.9 11.7-9.3L479.1 288H564c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-70.1l7.4-32zM183.8 342c-6.2 25.8-6.8 47.2-7.3 47.2h-1.1s-1.7-22-6.8-47.2l-11-54h38.8zm27.5-118h-66.8l-6.5-32h80.8zm62.9 0l2-8.6c1.9-8 3.5-16 4.8-23.4h11.8c1.3 7.4 2.9 15.4 4.8 23.4l2 8.6zm130.9 118c-5.1 25.2-6.8 47.2-6.8 47.2h-1.1c-.6 0-1.1-21.4-7.3-47.2l-12.4-54h39.1zm25.2-118h-67.4l-7.3-32h81.6z" />
                          </svg></span>
                        <input class="input-cost" type="number" v-model="placeLists[date][index].cost"
                          placeholder="비용 입력">
                        <textarea rows="5" v-model="placeLists[date][index].content" style="overflow: hidden;"
                          placeholder="이곳은 어땠나요? 자유롭게 이야기해주세요!"></textarea>
                      </template>
                      <div class="btn" v-if="isEditing">
                        <button @click="movePlaceUp(index, date)" :disabled="index === 0">위로</button>
                        <button @click="movePlaceDown(index, date)" :disabled="index === placeLists[date].length - 1">아래로</button>
                        <button @click="deletePlace(p, index)">삭제</button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <button @click="router.push({ name: 'map' })" class="button-find-place">장소 찾기</button>
        </template>
      </div>
    </aside>
    <div class="map-wrapper">
      <div id="map"></div>
    </div>

    <TripEditModal v-if="showModal" :showModal="showModal" :trip="plan" @close="showModal = false"
      @editPlan="editPlan" />
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
  background-color: #f0f4f8;
  position: relative;
}

#close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.2em;
  cursor: pointer;
  color: var(--grey);
}

#info {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

#info h2 {
  font-size: 1.5em;
  color: var(--black);
}

#info h2 span {
  font-size: 0.5em;
  color: var(--light-grey);
  text-decoration: underline;
  cursor: pointer;
}

#info h4 {
  font-size: 0.9em;
  color: #495057;
}

#info .content {
  font-size: 0.8em;
  color: #6c757d;
}

#edit {
  width: 100%;
  display: flex;
  justify-content: end;
  text-align: right;
  cursor: pointer;
  font-size: 0.8em;
}

.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: calc(100vh - 85px);
}

.place {
  width: 100%;
  height: calc(100vh - 35%);
  overflow-y: auto;
}

.place h3 {
  font-size: 1em;
  color: var(--navy);
  margin-bottom: 10px;
  cursor: pointer;
}

.place h4 {
  font-size: 0.9em;
  color: var(--grey);
  margin-bottom: 10px;
}

.place ul {
  list-style: none;
  padding: 0;
}

.place li {
  position: relative;
  background-color: #f1f5f9;
  padding: 15px;
  border-left: 3px solid var(--navy);
  transition: background-color 0.3s;
}

.place li .distance {
  position: absolute;
  background-color: var(--white);
  font-size: 0.6em;
  width: fit-content;
  padding: 3px 5px;
  color: var(--black);
  left: 0;
  bottom: 0;
  transform: translate(-10%, 30%);
  z-index: 10;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
}

.place li:last-child {
  margin-bottom: 10px;
}

.place li:last-child .distance {
  display: none;
}

.place-item {
  position: relative;
  display: flex;
  flex-direction: column;
}

.place-item h4 {
  font-size: 1em;
  color: var(--black);
  margin-bottom: 5px;
}

.place-index {
  background-color: var(--navy);
  width: 1em;
  height: 1em;
  border-radius: 100%;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

.place-item h5 {
  font-size: 0.6em;
  color: var(--white);
}

.place-item .input-cost {
  width: calc(99% - 50px);
  padding: 7px 20px 7px 30px;
  margin-bottom: 10px;
  font-size: 1em;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.place-item .icon {
  position: absolute;
  top: 23%;
  left: 3%;
}

.place-item textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.place-item textarea:focus,
.place-item .input-cost:focus {
  border-color: var(--navy);
  outline: none;
}

.button-find-place {
  background-color: var(--navy);
  color: var(--white);
}

/* 버튼 스타일 */
.btn {
  display: flex;
  gap: 10px;
}

.btn button {
  padding: 8px 12px;
  font-size: 0.9em;
  color: #ffffff;
  background-color: var(--navy);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn button:nth-child(3) {
  background-color: #c9302c;
}

.btn button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.btn button:hover:not(:disabled) {
  background-color: #003366;
}

.btn button:nth-child(3):hover:not(:disabled) {
  background-color: #ac2925;
}

/* 지도 영역 스타일 */
.map-wrapper {
  flex: 1;
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
}
</style>