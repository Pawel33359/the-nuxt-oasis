<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from "v-calendar";

interface BookingSettings {
  minBookingLength: number;
  maxBookingLength: number;
}

interface DatePickerRangeObject {
  start: Date;
  end: Date;
}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    modelValue?: DatePickerRangeObject | null;
    settings?: BookingSettings | null;
    bookedDates?: string[];
  }>(),
  {
    modelValue: null,
    settings: null,
    bookedDates: () => [],
  }
);

const emit = defineEmits<{
  "update:model-value": [value: DatePickerRangeObject | null];
  close: [];
}>();

const selectedRange = ref<DatePickerRangeObject | null>(props.modelValue);

const date = computed({
  get: () => props.modelValue ?? selectedRange.value,
  set: (value) => {
    selectedRange.value = value;
    emit("update:model-value", value);
  },
});

const calendarAttrs = {
  transparent: true,
  borderless: true,
  color: "primary",
  popover: false,
  "is-dark": { selector: "html", darkClass: "dark" },
  "first-day-of-week": 2,
};

const disabledDates = computed(() =>
  props.bookedDates.map((date) => {
    const [year, month, day] = date.slice(0, 10).split("-").map(Number);
    return new Date(year, month - 1, day);
  })
);

const minDays = computed(() =>
  props.settings ? props.settings.minBookingLength + 1 : undefined
);

const maxDays = computed(() =>
  props.settings ? props.settings.maxBookingLength + 1 : undefined
);

function onDayClick(_: any, event: MouseEvent): void {
  const target = event.target as HTMLElement;
  target.blur();
}
</script>

<template>
  <div class="date-picker">
    <VCalendarDatePicker
      v-model.range="date"
      :min-date="new Date()"
      :max-date="new Date(new Date().setFullYear(new Date().getFullYear() + 1))"
      :min-days="minDays"
      :max-days="maxDays"
      :disabled-dates="disabledDates"
      :columns="2"
      v-bind="{ ...calendarAttrs, ...$attrs }"
      @dayclick="onDayClick"
      style="width: 100%; height: 100%"
    />

    <div class="date-picker__pricing">0</div>
  </div>
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
.date-picker {
  background-color: var(--vc-gray-50);
  color: var(--vc-gray-900);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.date-picker__pricing {
  background-color: var(--primary-dark);
  color: var(--text);
  padding: var(--space-2);
  text-align: end;
  font-size: var(--text-4xl);
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
