<script setup lang="ts">
import type { Cabin } from "../../../../../../shared/types/cabin";

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

const { data: cabin } = await useFetch<Cabin>(
  () => `/api/cabins/${reservation.value.cabinId}`,
  {
    watch: [reservation.value.cabinId],
  }
);
</script>

<template>
  <div>
    <h1>Edit Reservation #{{ reservationId }}</h1>
    <Reservation
      v-if="cabin && reservation"
      :cabin="cabin"
      :reservation="reservation"
    />
  </div>
</template>

<style scoped></style>
