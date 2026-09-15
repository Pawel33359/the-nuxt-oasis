<script setup lang="ts">
import type { Cabin } from "../../shared/types/cabin";
import type { User } from "../../shared/types/user";

const { cabin, user } = defineProps<{
  cabin: Cabin;
  user: User | null;
}>();

console.log("cabin", cabin);
console.log("user", user);

const { maxCapacity } = cabin;
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
    <form class="reservation-form__form">
      <div class="reservation-form__form-group --guests">
        <label for="numGuests">How many guests?</label>
        <select name="numGuests" id="numGuests" required>
          <option value="" key="">Select number of guests...</option>
          <option v-for="x in maxCapacity" value="{{x}}">
            {{ x }} {{ x === 1 ? "guest" : "guests" }}
          </option>
        </select>
      </div>

      <div class="reservation-form__form-group --observations">
        <label for="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          id="observations"
          placeholder="Any pets, allergies, special requirements, etc.?"
        />
      </div>

      <div class="reservation-form__form-group --reserve">
        <p>Start by selecting dates</p>

        <button class="btn">Reserve now</button>
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
</style>
