<script setup lang="ts">
defineProps<{
  classes?: string;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button :class="`btn ${classes ?? ''}`" @click="emit('click')">
    <slot />
  </button>
</template>
