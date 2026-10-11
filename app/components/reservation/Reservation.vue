<script setup lang="ts">
import type { Cabin } from "../../../shared/types/cabin";
import type { Booking } from "../../../shared/types/booking";

const {
  cabin,
  reservation: booking,
  onSuccessCallback,
} = defineProps<{
  cabin: Cabin;
  reservation: Booking | null;
  onSuccessCallback: Function | null;
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

// WYKLUCZENIE DAT ZAJĘTYCH PRZEZ EDYTOWANA KABINE
const bookedDates = computed(() =>
  booking
    ? reservationData.value?.bookedDates?.filter((date) => {
        const startTime = new Date(booking.startDate).getTime();
        const endTime = new Date(booking.endDate).getTime();
        const currTime = new Date(date).getTime();

        if (currTime < startTime || currTime > endTime) return true;
        else return false;
      })
    : reservationData?.value?.bookedDates
);

console.log(reservationData.value, booking);
</script>

<template>
  <div class="reservation">
    <div class="reservation__date">
      <DatePicker
        :settings="reservationData?.settings"
        :cabin="cabin"
        :booked-dates="bookedDates"
        :booking="booking"
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
        :booking="booking"
        :onSuccessCallback="onSuccessCallback"
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
