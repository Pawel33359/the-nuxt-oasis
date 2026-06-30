<script setup lang="ts">
import type { Cabin } from "~/types/cabin";

const route = useRoute();
const { data: cabins, pending } = await useFetch<Cabin[]>("/api/cabins");

const capacityMap = {
  small: { min: 1, max: 3 },
  medium: { min: 4, max: 7 },
  large: { min: 8, max: Infinity },
};

const filteredCabins = computed(() => {
  if (!cabins.value) return [];

  const selectedCapacity = route.query.capacity as string;

  if (!selectedCapacity || selectedCapacity === "all") {
    return cabins.value;
  }

  // Handle multiple checkbox values (comma-separated)
  const selectedValues = selectedCapacity.split(",");

  return cabins.value.filter((cabin) => {
    return selectedValues.some((selected) => {
      const range = capacityMap[selected as keyof typeof capacityMap];
      if (!range) return false;
      return (
        cabin.maxCapacity >= range.min && cabin.maxCapacity <= range.max
      );
    });
  });
});
</script>

<template>
  <div v-if="pending"><Spinner /></div>
  <div v-if="filteredCabins?.length" class="cabin-list">
    <CabinCard
      v-for="(cabin, index) in filteredCabins"
      :key="cabin.id"
      :cabin="cabin"
      :index="index"
    />
  </div>
  <strong v-else>No cabins available right now.</strong>
</template>

<style scoped>
.cabin-list {
  padding-top: var(--space-8);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  /* overflow: hidden; */
}
</style>
