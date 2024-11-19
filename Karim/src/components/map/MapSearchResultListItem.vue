<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useMapStore } from "@/stores/mapStore";
import { useLoginStore } from "@/stores/login";
import planSelect from "@/components/items/planSelect.vue";
//import "@/assets/css/modal.css";

const props = defineProps({
  trip: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["move-center", "toggle-like"]);
const imgSrc = computed(() => {
  return (
    props.trip.img1 ||
    props.trip.img2 ||
    `src/assets/img/default__background.svg`
  );
});

const mapStore = useMapStore();
const loginStore = useLoginStore();
const showModal = ref(false);

const liked = ref(false);

// 좋아요 상태를 기반으로 이미지 URL 계산
const url = computed(() => (liked.value ? "src/assets/img/redheart.png" : "src/assets/img/blackheart.png"));

// 좋아요 상태 확인 함수
const checkLike = async () => {
  liked.value = await mapStore.checkLike(props.trip.no);
};

// 좋아요 상태 토글 함수
const updateGood = async () => {
  liked.value = await mapStore.toggleLike(props.trip.no); // 서버와 동기화
};

onMounted(() => {
  checkLike();
});

const handleClick = () => {
  console.log(props.trip);
  emit("move-center", props.trip.latitude, props.trip.longitude);
};

const addNewPlan = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <li class="result__item" @click="handleClick">
    <!-- 하트 아이콘을 result__item 안에 배치하여 전체 카드의 상단 오른쪽에 위치 -->
    <img
      :src="url"
      class="hotplace"
      @click.stop="updateGood"
      :data-trip-id="props.trip.no"
    />
    <div class="item__content">
      <img :src="imgSrc" alt="" class="item__img" />
      <div class="content">
        <span class="item__title">{{ trip.title }}</span>
      </div>
      <span class="item__address content"
        >{{ trip.addr1 }} {{ trip.addr2 }}</span
      >
    </div>
    <div>
      <button @click.stop="addNewPlan">여행경로 추가</button>
    </div>
  </li>

  <planSelect v-if="showModal" @close="closeModal" :trip="props.trip" />
</template>

<style scoped>
.hotplace {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: fill 0.3s; /* 색상 전환 효과 추가 */
}

/* .hotplace.active {
	background-image: url("../img/redheart.png");
}  */

.result__item {
  display: flex;
  position: relative; /* 하트 아이콘의 위치를 절대값으로 배치하기 위해 필요 */
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.result__item:hover {
  transform: scale(1.02);
}

.item__img {
  width: 9vw;
  height: 9vw;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
}

.item__content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item__title {
  font-size: 1.1em;
  font-weight: bold;
}

.hotplace {
  position: absolute; /* 절대 위치 지정 */
  top: 16px; /* 위쪽 여백 */
  right: 16px; /* 오른쪽 여백 */
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: fill 0.3s;

	/* background-image: url("../img/blackheart.png"); */
}
/* .hotplace.active {
  fill: red;
	background-image: url("../img/redheart.png");
} */
/* 
.hotplace.inactive {
  fill: black;
} */


.item__address {
  font-size: 0.9em;
  color: #555;
  margin-bottom: 8px;
}

button {
  background-color: var(--purple);
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #9271c4;
  transform: scale(1.05);
}
</style>
