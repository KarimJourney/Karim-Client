<script setup>
import HotplaceForm from '@/components/hotplace/HotplaceForm.vue';
import HotplaceSearchResultList from '@/components/hotplace/HotplaceSearchResultList.vue';
</script>

<template>
  <aside class="search">
    <HotplaceForm />
    <HotplaceSearchResultList />
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
</style>
