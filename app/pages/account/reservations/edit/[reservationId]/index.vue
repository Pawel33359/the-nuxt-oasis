<script setup lang="ts">
definePageMeta({
  layout: "side-navigation",
});

const route = useRoute();
const reservationId = computed(() => route.params.reservationId as string);

useSeoMeta({
  title: `Edit Reservation #${reservationId.value}`,
});

const {
  data: reservation,
  pending: resPending,
  error: resError,
} = await useFetch(() => `/api/bookings/${reservationId.value}`);

console.log(reservation.value);

// const {
//   data: cabin,
//   pending,
//   error,
// } = await useFetch(() => `/api/cabins/${cabinId.value}`, {
//   watch: [cabinId],
// });
</script>

<template>
  <div>
    <h1>Edit Reservation #{{ reservationId }}</h1>
    <!-- <Reservation :cabin="cabin" /> -->
  </div>
</template>

<style scoped></style>
