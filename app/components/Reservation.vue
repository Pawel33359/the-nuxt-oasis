<script setup lang="ts">
import type { Cabin } from "../../shared/types/cabin";
import type { DatePickerRangeObject } from "../../shared/types/datePickerRange";

const selectedRange = ref<DatePickerRangeObject | null>(null);

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
    <div class="reservation__date">
      <DatePicker
        v-model="selectedRange"
        :settings="reservationData?.settings"
        :cabin="cabin"
        :booked-dates="reservationData?.bookedDates"
      />
      <ReservationPrice
        :cabin="cabin"
        :selected-range="selectedRange"
        :settings="reservationData?.settings ?? null"
        @clear="selectedRange = null"
      />
    </div>
    <div v-if="session?.user">
      <ReservationForm
        :cabin="cabin"
        :user="session?.user ?? null"
        :selected-range="selectedRange"
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
