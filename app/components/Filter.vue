<script setup lang="ts">
import type { FilterGroup } from "../types/filters";

const { filterGroup, groupName } = defineProps<{
  filterGroup: FilterGroup;
  groupName: string;
}>();

const route = useRoute();
const router = useRouter();

const handleFilterChange = (paramValue: string) => {
  // Radio buttons: single selection
  if (filterGroup.type === "radio") {
    router.push({
      query: {
        ...route.query,
        [groupName]: paramValue,
      },
    });
    return;
  }

  // Checkboxes: multiple selections
  const currentValue = route.query[groupName];
  let selectedValues: string[] = [];

  if (typeof currentValue === "string") {
    selectedValues = currentValue.split(",");
  } else if (Array.isArray(currentValue)) {
    selectedValues = currentValue.filter((v) => v !== null) as string[];
  }

  const index = selectedValues.indexOf(paramValue);
  if (index > -1) {
    selectedValues.splice(index, 1); // Uncheck
  } else {
    selectedValues.push(paramValue); // Check
  }

  router.push({
    query: {
      ...route.query,
      [groupName]:
        selectedValues.length > 0 ? selectedValues.join(",") : undefined,
    },
  });
};

const isActive = (paramValue: string) => {
  const currentValue = route.query[groupName];

  if (filterGroup.type === "radio") {
    return currentValue === paramValue;
  }

  // Checkboxes
  if (typeof currentValue === "string") {
    return currentValue.split(",").includes(paramValue);
  }

  return Array.isArray(currentValue) && currentValue.includes(paramValue);
};
</script>

<template>
  <div class="filters-group">
    <label
      v-for="filter in filterGroup.filters"
      :key="filter.param"
      class="filters-single"
      :class="{ active: isActive(filter.param) }"
    >
      <input
        :type="filterGroup.type"
        :name="filterGroup.type === 'radio' ? groupName : undefined"
        :value="filter.param"
        :checked="isActive(filter.param)"
        class="sr-only"
        @click="handleFilterChange(filter.param)"
      />
      <span>{{ filter.name }}</span>
    </label>
  </div>
</template>

<style scoped>
.filters-group {
  border: 1px solid var(--border);
  display: flex;
}
.filters-single {
  padding: var(--space-4) var(--space-6);
  display: block;
  transition: background var(--transition-md);
  cursor: pointer;
}
.filters-single:hover,
.filters-single.active {
  background: var(--primary-dark);
}
</style>
