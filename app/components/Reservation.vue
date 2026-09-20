<script setup lang="ts">
import type { Cabin } from "../../shared/types/cabin";

const { cabin } = defineProps<{
  cabin: Cabin;
}>();

const { data: session } = useAuth();

const { data: reservationData, refresh: refreshReservationData } =
  await useFetch<{
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
</script>

<template>
  <div class="reservation">
    <div class="reservation__date">
      <DatePicker
        :settings="reservationData?.settings"
        :cabin="cabin"
        :booked-dates="reservationData?.bookedDates"
      />
      <ReservationPrice
        :cabin="cabin"
        :settings="reservationData?.settings ?? null"
      />
    </div>
    <div v-if="session?.user">
      <ReservationForm
        :cabin="cabin"
        :user="session?.user ?? null"
        @success="refreshReservationData"
      />
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

.reservation__date {
  background-color: var(--bg-light);
  color: var(--text-dark);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
