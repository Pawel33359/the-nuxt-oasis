<script setup lang="ts">
import type { FilterGroup } from "../types/filters";

const { filters } = defineProps<{
  filters: Record<string, FilterGroup>;
}>();
</script>

<template>
  <div class="filters">
    <Filter
      v-for="(filterGroup, groupName) in filters"
      :key="groupName"
      :filter-group="filterGroup"
      :group-name="groupName"
    />
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: var(--space-4) 0;
}
</style>
