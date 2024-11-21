<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 슬라이드 데이터 (이미지 링크 또는 콘텐츠)
const slides = [
  { id: 1, image: new URL('../assets/img/main-carousel/main.png', import.meta.url).href },
  { id: 2, image: new URL('../assets/img/main-carousel/main2.jpg', import.meta.url).href },
  { id: 3, image: new URL('../assets/img/main-carousel/main3.jpg', import.meta.url).href }
];

const currentIndex = ref(0); // 현재 슬라이드 인덱스
const slideInterval = 3000; // 자동 슬라이드 전환 간격 설정 (3초)
let slideTimer = null;

// 다음 슬라이드로 이동
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length;
};

// 자동 슬라이드 전환 시작
const startAutoSlide = () => {
  slideTimer = setInterval(nextSlide, slideInterval);
};

// 자동 슬라이드 전환 중지
const stopAutoSlide = () => {
  if (slideTimer) {
    clearInterval(slideTimer);
  }
};

// 마운트 시 자동 슬라이드 시작, 언마운트 시 중지
onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});

// 슬라이드 스타일 계산
const wrapperStyle = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * 100}%)`,
    transition: 'transform 1s ease'
  };
});
</script>

<template>
  <main>
    <div class="carousel-wrapper" :style="wrapperStyle">
      <div class="carousel-slide" v-for="slide in slides" :key="slide.id">
        <img :src="slide.image" alt="Slide Image" class="carousel-image" />
      </div>
    </div>
    <div class="overlay"></div>
    <div id="main-text-container">
      <div id="main-text">
        <h2>여정의 매 순간이 <b>고귀한</b> 추억이 되도록,<br><b>카림</b>과 함께.</h2>
        <h6 @click="router.push({ name: 'map' })">여행 떠나기 &gt;</h6>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 85px);
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  transition: transform 1s ease;
  z-index: 0;
}

.carousel-slide {
  min-width: 100%;
  transition: transform 1s ease;
}

.carousel-image {
  width: 100%;
  height: calc(100vh - 85px);
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--overlay);
  z-index: 1;
}
#main-text-container {
  width: 80%;
  text-align: center;
}

#main-text {
  position: absolute;
  top: 50%;
  left: 50%;
  width: max-content;
  transform: translate(-50%, -50%);
  text-align: end;
  color: var(--white);
  z-index: 2;
}

h2 {
  font-weight: 400;
  font-size: 38px;
  line-height: 1.6em;
}

h6 {
  line-height: 1.6em;
  cursor: pointer;
}
</style>