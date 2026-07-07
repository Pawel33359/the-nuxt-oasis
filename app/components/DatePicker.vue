<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from "v-calendar";
// @ts-ignore
type DatePickerDate = Date | string | number;

interface DatePickerRangeObject {
  start: Date;
  end: Date;
}
defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: [Date, Object] as PropType<
      DatePickerDate | DatePickerRangeObject | null
    >,
    default: null,
  },
});

const emit = defineEmits(["update:model-value", "close"]);

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:model-value", value);
    emit("close");
  },
});

const attrs = {
  transparent: true,
  borderless: true,
  color: "primary",
  popover: false,
  "is-dark": { selector: "html", darkClass: "dark" },
  "first-day-of-week": 2,
};

function onDayClick(_: any, event: MouseEvent): void {
  const target = event.target as HTMLElement;
  target.blur();
}
</script>

<template>
  <VCalendarDatePicker
    v-if="date && (date as DatePickerRangeObject)?.start && (date as DatePickerRangeObject)?.end"
    v-model.range="date"
    :is-range="true"
    :columns="2"
    v-bind="{ ...attrs, ...$attrs }"
    @dayclick="onDayClick"
  />
  <VCalendarDatePicker
    v-else
    v-model="date"
    v-bind="{ ...attrs, ...$attrs }"
    @dayclick="onDayClick"
  />
</template>

<style>
:root {
  --vc-gray-50: #f8fafc;
  --vc-gray-100: #f1f5f9;
  --vc-gray-200: #e2e8f0;
  --vc-gray-300: #cbd5e1;
  --vc-gray-400: #94a3b8;
  --vc-gray-500: #64748b;
  --vc-gray-600: #475569;
  --vc-gray-700: #334155;
  --vc-gray-800: #1e293b;
  --vc-gray-900: #0f172a;
}
.vc-pane-container {
  background-color: var(--vc-gray-50);
}
.vc-primary {
  --vc-accent-50: #ecfdf5;
  --vc-accent-100: #d1fae5;
  --vc-accent-200: #a7f3d0;
  --vc-accent-300: #6ee7b7;
  --vc-accent-400: #34d399;
  --vc-accent-500: #10b981;
  --vc-accent-600: #059669;
  --vc-accent-700: #047857;
  --vc-accent-800: #065f46;
  --vc-accent-900: #064e3b;
}
</style>
