<script setup>
import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
</script>

<template>
  <TheHeadingNavbar />

  <div id="container">
    <RouterView />
  </div>
</template>

<style scoped>
#container {
  margin: 0;
  height: calc(100vh - 85px);
}
</style>
