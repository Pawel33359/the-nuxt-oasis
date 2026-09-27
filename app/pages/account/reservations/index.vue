<script setup lang="ts">
import { auth } from "~/middleware/auth";

definePageMeta({
  layout: "side-navigation",
  middleware: auth,
});

useSeoMeta({
  title: "Reservations",
});
</script>

<template>
  <div>
    <h1>Your reservations</h1>
    <ReservationList />
  </div>
</template>

<style scoped></style>
