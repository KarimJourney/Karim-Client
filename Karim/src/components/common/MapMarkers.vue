<script setup>
import { useMapStore } from "@/stores/mapStore";
const mapStore = useMapStore();
defineProps({
  item: Object,
  map: Object,
});

const markerImage =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지 크기
</script>

<template>
  <div class="wrap">
    <div class="info">
      <div class="title">
        {{ title }}
        <div
          class="hotplace"
          :class="{ active: liked }"
          @click.stop="handleLikeClick"
        >
          <img
            src="@/assets/img/redheart.png"
            alt="Like"
            width="20"
            height="20"
          />
        </div>
        <div class="close" @click="closeOverlay">×</div>
      </div>
      <div class="body">
        <img :src="imageSrc" class="img" alt="Image" />
        <div class="desc">
          <div class="ellipsis">{{ addr1 }}</div>
          <div class="jibun ellipsis">(우) {{ addr2 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
