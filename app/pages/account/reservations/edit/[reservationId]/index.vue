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
  refresh: refreshReservation,
} = await useFetch(() => `/api/bookings/${reservationId.value}`);

const cabinId = computed(() => reservation.value?.cabinId);

const { data: cabin } = await useFetch<Cabin>(
  () => `/api/cabins/${cabinId.value}`,
  { watch: [cabinId] }
);
</script>

<template>
  <div>
    <h1>Edit Reservation #{{ reservationId }}</h1>
    <Reservation
      v-if="cabin && reservation"
      :cabin="cabin"
      :reservation="reservation"
      :onSuccessCallback="refreshReservation"
    />
  </div>
</template>

<style scoped></style>
