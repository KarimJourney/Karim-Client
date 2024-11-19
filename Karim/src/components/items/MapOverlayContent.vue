<script setup>
import { computed } from "vue";
import { useMapStore } from "@/stores/mapStore";

const props = defineProps({
  no: Number,
  title: String,
  addr1: String,
  addr2: String,
  img1: String,
  img2: String,
  liked: Boolean,
  latlng: Object,
  map: Object,
});

const emit = defineEmits(["toggle-like", "close-overlay"]);

const mapStore = useMapStore();

const imageSrc = computed(() => {
  return props.img1 || props.img2 || `@/assets/img/default__background.svg`;
});

const handleLikeClick = async () => {
  await mapStore.toggleLike(props.no);
  emit("toggle-like", props.no);
};

const closeOverlay = () => {
  emit("close-overlay", props.no);
};
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

<style scoped>
.overlay-content {
  /* 오버레이 전체 스타일 */
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  min-width: 150px;
}
.wrap {
  position: relative;
}
.info {
  display: flex;
  flex-direction: column;
}
.title {
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close {
  cursor: pointer;
  font-size: 16px;
  color: #999;
}
.body {
  margin-top: 5px;
}
.img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
.desc {
  margin-top: 5px;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.jibun {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hotplace {
  cursor: pointer;
}
.hotplace.active {
  /* 좋아요 활성화 시 스타일 */
  color: red;
}
</style>
