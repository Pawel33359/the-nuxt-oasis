<script setup lang="ts">
import type { Cabin } from "../../shared/types/cabin";
import { useReservation } from "../composables/useReservation";

const { cabin, user } = defineProps<{
  cabin: Cabin;
  user: {
    name?: string | null;
    image?: string | null;
  } | null;
}>();

const { maxCapacity } = cabin;
const { selectedRange, resetRange } = useReservation();

const emit = defineEmits<{
  success: [];
}>();

const numGuests = ref("");
const observations = ref("");
const isSubmitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function submitReservation() {
  errorMessage.value = "";
  successMessage.value = "";

  if (!selectedRange.value) {
    errorMessage.value = "Please select your dates first.";
    return;
  }

  isSubmitting.value = true;

  try {
    await $fetch(`/api/cabins/${cabin.id}/reservation`, {
      method: "POST",
      body: {
        startDate: formatDate(selectedRange.value.start),
        endDate: formatDate(selectedRange.value.end),
        numGuests: numGuests.value,
        observations: observations.value,
      },
    });

    successMessage.value = "Your reservation has been created.";
    numGuests.value = "";
    observations.value = "";
    resetRange();
    emit("success");
  } catch (error: any) {
    errorMessage.value =
      error?.data?.statusMessage || "The reservation could not be created.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="reservation-form__container">
    <div class="reservation-form__top-bar">
      <p>Logged in as</p>
      <div class="reservation-form__user-info">
        <img
          v-if="user?.image"
          :src="user.image"
          alt="User Avatar"
          class="reservation-form__avatar"
          width="32"
          height="32"
        />
        <span>{{ user?.name || "Guest" }}</span>
      </div>
    </div>
    <form class="reservation-form__form" @submit.prevent="submitReservation">
      <div class="reservation-form__form-group --guests">
        <label for="numGuests">How many guests?</label>
        <select v-model="numGuests" name="numGuests" id="numGuests" required>
          <option value="">Select number of guests...</option>
          <option v-for="x in maxCapacity" :key="x" :value="x">
            {{ x }} {{ x === 1 ? "guest" : "guests" }}
          </option>
        </select>
      </div>

      <div class="reservation-form__form-group --observations">
        <label for="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          v-model="observations"
          name="observations"
          id="observations"
          placeholder="Any pets, allergies, special requirements, etc.?"
        />
      </div>

      <div class="reservation-form__form-group --reserve">
        <p>Start by selecting dates</p>
        <button
          class="btn"
          type="submit"
          :disabled="isSubmitting"
          v-if="selectedRange?.start && selectedRange?.end"
        >
          {{ isSubmitting ? "Reserving..." : "Reserve now" }}
        </button>
        <p
          v-if="errorMessage"
          class="reservation-form__message reservation-form__error"
          role="alert"
        >
          {{ errorMessage }}
        </p>
        <p
          v-else-if="successMessage"
          class="reservation-form__message reservation-form__success"
          role="status"
        >
          {{ successMessage }}
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.reservation-form__container {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.reservation-form__top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-5);
  padding: var(--space-2) var(--space-5);
  background: var(--primary-dark);
}
.reservation-form__user-info {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.reservation-form__user-info img {
  border-radius: 50%;
}

.reservation-form__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-5);
}

.reservation-form__form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

select {
  padding: var(--space-2);
}

textarea {
  padding: var(--space-2);
  min-height: 100px;
  resize: vertical;
}

.reservation-form__form-group label {
  font-size: var(--text-xl);
}

.reservation-form__message {
  padding: var(--space-2) var(--space-3);
  border: 1px solid currentColor;
}

.reservation-form__error {
  color: var(--text);
  background-color: var(--error);
}

.reservation-form__success {
  color: var(--text);
  background-color: var(--success);
}
</style>
