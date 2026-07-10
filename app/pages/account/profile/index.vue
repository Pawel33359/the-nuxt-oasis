<script setup lang="ts">
import { auth } from "~/middleware/auth";

definePageMeta({
  layout: "default",
  middleware: auth,
});

useSeoMeta({
  title: "Profile",
});
</script>

<template>
  <main></main>
</template>

<style scoped></style>
