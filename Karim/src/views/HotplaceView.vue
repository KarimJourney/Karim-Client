<script setup>
import { useHotplaceStore } from "@/stores/hotplaceStore";
import HotplaceAside from "@/components/hotplace/HotplaceAside.vue";
import MapResult from "@/components/map/MapResult.vue";

//import "@/assets/css/trip.css";
const hotplaceStore = useHotplaceStore();
</script>

<template>
  <section>
    <HotplaceAside />
    <MapResult :dataList="hotplaceStore.hotplaceList" storeType="hotplace" />
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: space-between;
  height: 75vh;
}
</style>
