<script setup>
import MapAsideForm from "@/components/map/MapAsideForm.vue";
import MapSearchResultList from "@/components/map/MapSearchResultList.vue";
</script>

<template>
  <aside class="search">
    <MapAsideForm></MapAsideForm>
    <MapSearchResultList></MapSearchResultList>
  </aside>
</template>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
  width: 50vw;
  min-width: 220px;
  max-width: 550px;
  gap: 15px;
  box-sizing: border-box;
}
.map-aside-form {
  flex: 1;
}
.map-search-result-list{ 
  flex: 2;
}
</style>
