<script setup lang="ts">
const { cabin, selectedRange, settings } = defineProps<{
  cabin: Cabin;
  selectedRange: DatePickerRangeObject | null;
  settings: {
    id: number;
    created_at: string;
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
  } | null;
}>();

const emit = defineEmits<{
  clear: [];
}>();

const calculatedDays = computed(() => {
  if (!selectedRange) {
    return 0;
  }

  const { start, end } = selectedRange;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
});

console.log(cabin);
</script>

<template>
  <div class="reservation_price">
    <div class="reservation_price__per_night">
      <span class="reservation_price__price"> ${{ cabin.regularPrice }} </span>
      <small class="reservation_price__text"> / per night</small>
    </div>
    <div class="reservation_price__num_nights" v-if="calculatedDays > 0">
      <span class="reservation_price__count">x {{ calculatedDays }}</span>
    </div>
    <div>
      <span class="reservation_price__total" v-if="calculatedDays > 0">
        ${{ cabin.regularPrice * calculatedDays }}
      </span>
    </div>
    <button
      v-if="calculatedDays > 0"
      type="button"
      class="btn --outline --clear-btn"
      @click="emit('clear')"
    >
      Clear
    </button>
  </div>
</template>

<style scoped>
.reservation_price {
  background-color: var(--primary-dark);
  color: var(--text);
  padding: var(--space-2);
  font-size: var(--text-3xl);
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  gap: var(--space-8);
}
.reservation_price__text {
  font-size: var(--text-base);
}
.reservation_price__num_nights {
  background-color: var(--bg-light);
  padding: 0 var(--space-6);
  border-radius: var(--radius-md);
  color: var(--text-dark);
}

.btn.--clear-btn {
  background: #fff;
  cursor: pointer;
  font-size: var(--text-lg);
  width: min-content;
  margin-left: auto;
}
.btn.--clear-btn:hover {
  background: var(--primary);
  color: var(--text);
}
</style>
