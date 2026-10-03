<script setup lang="ts">
import { format } from "date-fns";
const { selectedRange, resetRange } = useReservation();
</script>

<template>
  <div
    v-if="selectedRange?.start && selectedRange?.end"
    class="reservation-reminder"
  >
    <p>
      Don't forget to resere your dates <br />
      from {{ format(new Date(selectedRange?.start), "MMM dd yyyy") }} to
      {{ format(new Date(selectedRange?.end), "MMM dd yyyy") }}
    </p>
    <button type="button" class="close-btn" @click="resetRange">
      <span class="close-btn__icon">
        <Icon name="heroicons:x-mark-20-solid" size="32" />
      </span>
    </button>
  </div>
</template>

<style scoped>
.reservation-reminder {
  background-color: var(--secondary-dark);
  border-radius: var(--radius-md);
  padding: 1rem;
  margin-bottom: 1rem;
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--space-6);
  padding: var(--space-2) var(--space-4);
}
.reservation-reminder .close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.reservation-reminder .close-btn__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: var(--text);
  border-radius: 50%;
  padding: var(--space-1);
  aspect-ratio: 1 / 1;
  transition: background-color 0.2s ease-in-out;
}
.reservation-reminder .close-btn__icon:hover {
  background-color: var(--bg-soft);
}
</style>
