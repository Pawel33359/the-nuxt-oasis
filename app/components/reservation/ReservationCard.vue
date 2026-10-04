<script setup lang="ts">
import type { Booking } from "../../../shared/types/booking";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";

const { $toast } = useNuxtApp();

const { booking } = defineProps<{ booking: Booking }>();
const deleted = ref(false);

const {
  id,
  created_at,
  startDate,
  endDate,
  numNights,
  numGuests,
  totalPrice,
  cabinId,
  guestId,
  cabins,
} = booking;

const formatDistanceFromNow = (dateValue: Date | string) => {
  const date = dateValue instanceof Date ? dateValue : parseISO(dateValue);

  return formatDistance(date, new Date(), {
    addSuffix: true,
  }).replace("about ", "");
};

const fromNowName = isToday(new Date(startDate))
  ? "Today"
  : formatDistanceFromNow(startDate);

async function handleDelete() {
  deleted.value = true;

  try {
    const response = await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete booking");
    }
    $toast.success("Booking deleted successfully");
  } catch (error) {
    deleted.value = false;
    $toast.error("Failed to delete booking");
    console.error(error);
  }
}
</script>

<template>
  <li v-if="!deleted" class="reservation-card">
    <div class="reservation-card__image-container">
      <NuxtImg
        :src="cabins.image"
        width="60"
        height="60"
        :alt="cabins.name"
        quality="100"
        class="reservation-card__image"
      />
    </div>
    <div class="reservation-card__info">
      <div class="reservation-card__info--top">
        <span class="reservation-card__num-nights"
          >{{ numNights }} nights
        </span>
        <span class="reservation-card__name"> in {{ cabins.name }}</span>

        <div
          :class="`reservation-card__status ${
            isPast(new Date(startDate)) ? '--past' : '--upcoming'
          }`"
        >
          <span v-if="isPast(new Date(startDate))">Past</span>
          <span v-else>Upcoming</span>
        </div>
      </div>

      <div class="reservation-card__info--middle">
        <span class="reservation-card__time-from">
          {{ format(new Date(startDate), "EEE, MMM dd yyyy") }}
          <span class="reservation-card__time-from-now"
            >({{ fromNowName }})</span
          >
        </span>
        -
        <span class="reservation-card__time-to">{{
          format(new Date(endDate), "EEE, MMM dd yyyy")
        }}</span>
      </div>
      <div class="reservation-card__info--bottom">
        <strong class="reservation-card__info-price">${{ totalPrice }}</strong>
        <span class="reservation-card__info-guests"
          >{{ numGuests }} guests</span
        >
        <p class="reservation-card__info-booked">
          Booked on {{ format(new Date(created_at), "EEE, MMM dd yyyy") }}
        </p>
      </div>
    </div>
    <div class="reservation-card__actions">
      <template v-if="!isPast(new Date(startDate))">
        <button class="btn"><Icon name="heroicons:pencil" /> Edit</button>
        <button class="btn --danger" :onclick="handleDelete">
          <Icon name="heroicons:trash" /> Delete
        </button>
      </template>
    </div>
  </li>
</template>

<style scoped>
.reservation-card {
  /* display: flex; */
  /* align-items: center; */
  border: 1px solid var(--border);
  display: grid;
  grid-template-columns: 120px 1fr minmax(auto, 100px);
  gap: var(--space-4);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.reservation-card {
  --animation-delay: 0s;
  --start-translate: 30%;
  animation: slide-to var(--animation-md) forwards;
  transform: translateX(var(--start-translate));
  opacity: 0.2;
}
@supports (width: calc(sibling-index() * 1px)) {
  .reservation-card {
    --animation-delay: calc((sibling-index() - 2) * 50ms);
    animation-delay: var(--animation-delay) !important;
  }
}
.reservation-card__image-container {
  height: 100%;
}
.reservation-card__image {
  /* width: 120px; */
  height: 100%;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
}
.reservation-card__info {
  padding: var(--space-4) 0;
}
.reservation-card__info--top {
  display: flex;
  gap: var(--space-1);
}
.reservation-card__num-nights,
.reservation-card__name {
  font-size: var(--text-2xl);
}

.reservation-card__time-from,
.reservation-card__time-to {
  font-size: var(--text-lg);
}
.reservation-card__time-from-now {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.reservation-card__status {
  margin-left: auto;
  font-size: var(--text-sm);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
}
.reservation-card__status.--upcoming {
  background: var(--primary);
}
.reservation-card__status.--past {
  background: var(--secondary);
}

.reservation-card__info--bottom {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.reservation-card__info-price {
  font-size: var(--text-2xl);
  font-weight: bold;
}

.reservation-card__actions {
  border-left: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  height: 100%;
}
.reservation-card__actions .btn {
  border-radius: 0;
  flex-basis: 50%;
  /* display: flex; */
  /* align-items: center;
  justify-content: center;
  gap: var(--space-2); */
}
.reservation-card__info-booked {
  margin-left: auto;
}
</style>
