<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  selectId: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "선택",
  },
  modelValue: {
    type: [String, Number],
    default: "0",
  },
  defaultValue: {
    type: [String, Number],
    default: "0",
  },
});
console.log(props.options);

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emit("update:modelValue", value);
};
</script>
<template>
  <select
    :id="selectId"
    class="btnCustom search-content"
    :value="modelValue"
    @change="updateValue($event.target.value)"
  >
    <option :value="defaultValue" disabled>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped></style>
