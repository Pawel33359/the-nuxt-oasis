<script setup lang="ts">
const { data: bookings, status } = await useLazyFetch("/api/bookings", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});

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
    <div v-else>
      <ul class="reservation-list" v-if="bookings && bookings.length > 0">
        <li v-for="booking in bookings" :key="booking.id">
          <ReservationCard :booking="booking" />
        </li>
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
</style>
