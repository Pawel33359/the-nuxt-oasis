<script setup lang="ts">
const props = defineProps({
  classes: String,
  onClick: Function,
});
</script>

<template>
  <button @click="onClick" :class="`btn ${classes}`">
    <slot />
  </button>
</template>

<style scoped>
.btn {
}
</style>
