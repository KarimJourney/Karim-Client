<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  navigatorHtml: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["page-change"]);

const handleClick = (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const pgNo = parseInt(event.target.getAttribute("data-pg"));
    if (!isNaN(pgNo)) {
      emit("page-change", pgNo);
    }
  }
};
</script>

<template>
  <div v-html="navigatorHtml" @click="handleClick"></div>
</template>

<style >
ul.pagination {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	list-style: none;
}

.page-item {
	width: 30%;
	max-width: 50px;
}

.page-link {
  min-width: 100px;
  min-height: 30px;
  text-decoration: none;
  font-size: 1rem;
  color: black;
  text-align: center;
}</style>
