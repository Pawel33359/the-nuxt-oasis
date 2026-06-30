<script setup lang="ts">
import type { FilterGroup } from "../../types/filters";

definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "Cabins",
});

//PAGE
const filters: Record<string, FilterGroup> = {
  capacity: {
    type: "radio",
    filters: [
      {
        name: "All cabins",
        param: "all",
      },
      {
        name: "1 - 3 guests",
        param: "small",
      },
      {
        name: "4 - 7 guests",
        param: "medium",
      },
      {
        name: "8+ guests",
        param: "large",
      },
    ],
  },
};
</script>

<template>
  <div>
    <h1>Our Luxury Cabins</h1>
    <p>
      Cozy yet luxurious cabins, located right in the heart of the Italian
      Dolomites. Imagine waking up to beautiful mountain views, spending your
      days exploring the dark forests around, or just relaxing in your private
      hot tub under the stars. Enjoy nature&apos;s beauty in your own little
      home away from home. The perfect spot for a peaceful, calm vacation.
      Welcome to paradise.
    </p>
    <Filters :filters="filters" />
    <CabinList />
  </div>
</template>

<style scoped></style>
