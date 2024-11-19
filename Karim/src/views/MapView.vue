<script setup>
import MapAside from "@/components/map/MapAside.vue";
import MapResult from "@/components/map/MapResult.vue";
import { useMapStore } from "@/stores/mapStore";
//import "@/assets/css/trip.css";
const mapStore = useMapStore();
</script>

<template>
  <section>
    <MapAside></MapAside>
    <MapResult :dataList="mapStore.tripList" storeType="map" />
  </section>
</template>

<style scoped>

section {
  display: flex;
  justify-content: space-between;
  height: 75vh;
}

.map-aside {
  flex: 1;
}

.map-result {
  flex: 2; /* 두 컴포넌트의 비율 조정 (예: MapResult가 더 넓게 보이도록) */
}
</style>
