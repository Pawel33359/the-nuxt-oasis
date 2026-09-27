<script setup lang="ts">
import { auth } from "~/middleware/auth";

definePageMeta({
  layout: "side-navigation",
  middleware: auth,
});

useSeoMeta({
  title: "Edit reservation",
});
</script>

<template>
  <main></main>
</template>

<style scoped></style>
