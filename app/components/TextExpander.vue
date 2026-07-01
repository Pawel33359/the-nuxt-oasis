<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string;
    maxLength?: number;
  }>(),
  {
    text: "",
    maxLength: 120,
  }
);

const isExpanded = ref(false);
const slots = useSlots();

const contentText = computed(() => {
  const slotText =
    slots
      .default?.()
      .map((node) => {
        if (typeof node.children === "string") return node.children;
        if (Array.isArray(node.children)) {
          return node.children.join("");
        }
        return "";
      })
      .join("") || "";

  return props.text || slotText;
});

const shouldTruncate = computed(
  () => contentText.value.length > props.maxLength
);

const displayText = computed(() => {
  if (isExpanded.value || !shouldTruncate.value) {
    return contentText.value;
  }

  return `${contentText.value.slice(0, props.maxLength).trimEnd()}...`;
});
</script>

<template>
  {{ displayText }}
  <button
    v-if="shouldTruncate"
    class="text-expander"
    @click="isExpanded = !isExpanded"
    type="button"
  >
    {{ isExpanded ? "Show less" : "Show more" }}
  </button>
</template>

<style scoped>
.text-expander {
  color: var(--primary-light);
  font-weight: var(--font-semibold);
  margin-left: var(--space-2);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  transition: color var(--transition-md);
}

.text-expander:hover {
  color: var(--primary-dark);
}
</style>
