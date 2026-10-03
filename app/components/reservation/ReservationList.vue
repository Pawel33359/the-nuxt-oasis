<script setup lang="ts">
import type { Booking } from "../../../shared/types/booking";

const { data: bookings, status } = await useLazyFetch<Booking[]>(
  "/api/bookings",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);

console.log("bookings", bookings.value, status.value);
</script>

<template>
  <div class="reservation-container">
    <div v-if="status === 'pending'" class="reservation-message --loading">
      Loading ...
    </div>
    <div v-else-if="status === 'error'" class="reservation-message --error">
      Error loading bookings
    </div>
    <div v-else class="reservation-list__container">
      <ul class="reservation-list" v-if="bookings && bookings.length > 0">
        <ReservationCard
          v-for="booking in bookings"
          :key="booking.id"
          :booking="booking"
        />
      </ul>
      <div v-else class="reservation-message --no-results">
        No bookings found.
      </div>
    </div>
  </div>
</template>

<style scoped>
.reservation-container {
  display: flex;
  justify-content: center;
}
.reservation-message {
  font-size: var(--text-lg);
}

.reservation-list__container {
  width: 100%;
  max-width: 800px;
  padding: var(--space-4);
}

.reservation-list {
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}
</style>
