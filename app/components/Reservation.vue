<script setup lang="ts">
import DatePicker from "./DatePicker.vue";
import type { Cabin } from "../../shared/types/cabin";

const { cabin } = defineProps<{
  cabin: Cabin;
}>();

const range = ref({
  start: new Date(),
  end: new Date(),
});
</script>

<template>
  <div>
    <DatePicker v-model="range" />
  </div>
</template>

<style scoped></style>
