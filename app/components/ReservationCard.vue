<script setup lang="ts">
import type { Booking } from "../../shared/types/booking";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";

const { booking } = defineProps<{ booking: Booking }>();

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
</script>

<template>
  <div class="reservation-card">
    <div class="reservation-card__image">
      <NuxtImg
        :src="cabins.image"
        width="60"
        height="60"
        :alt="cabins.name"
        quality="100"
      />
    </div>
    <div class="reservation-card__info">
      <div class="reservation-card__info--top">
        <span class="reservation-card__num-nights">{{ numNights }} nights</span>
        <span class="reservation-card__name"> in {{ cabins.name }}</span>

        <div class="reservation-card__status">
          <span v-if="isPast(new Date(startDate))">Past</span>
          <span v-else>Upcoming</span>
        </div>
      </div>

      <div class="reservation-card__info--middle">
        <span class="reservation-card__time-from">
          {{ format(new Date(startDate), "EEE, MMM dd yyyy") }}
          <span class="reservation-card__time-from-now">{{ fromNowName }}</span>
        </span>
        -
        <span class="reservation-card__time-to">{{
          format(new Date(endDate), "EEE, MMM dd yyyy")
        }}</span>
      </div>
      <div class="reservation-card__info--bottom">
        <strong class="reservation-card__info-price">${{ totalPrice }}</strong>
        <span class="reservation-card__info-guests">{{ numGuests }}</span>
        <p class="reservation-card__info-booked">
          {{ format(new Date(created_at), "EEE, MMM dd yyyy") }}
        </p>
      </div>
    </div>
    <div class="reservation-card__actions"></div>
  </div>
</template>

<style scoped></style>
