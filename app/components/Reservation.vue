<script setup lang="ts">
import DatePicker from "./DatePicker.vue";
import type { Cabin } from "../../shared/types/cabin";

const { cabin } = defineProps<{
  cabin: Cabin;
}>();

const { data: session } = useAuth();

const { data: reservationData } = await useFetch<{
  settings: {
    id: number;
    created_at: string;
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
  };
  bookedDates: string[];
}>(() => `/api/cabins/${cabin.id}/reservation`);

console.log("reservationData", reservationData.value);
</script>

<template>
  <div class="reservation">
    <DatePicker
      :settings="reservationData?.settings"
      :bookedDates="reservationData?.bookedDates"
      :cabin="cabin"
    />
    <div v-if="session?.user">
      <ReservationForm :cabin="cabin" :user="session?.user" />
    </div>
    <div v-else>
      <LoginMessage />
    </div>
  </div>
</template>

<style scoped>
.reservation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--border);
  background: var(--bg-soft);
}
</style>
