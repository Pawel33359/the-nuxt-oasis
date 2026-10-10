import type { DatePickerRangeObject } from "../../shared/types/datePickerRange";

export function useReservation(
  initialRange: DatePickerRangeObject | null = null
) {
  const selectedRange = useState(
    "reservation-selected-range",
    () => initialRange as DatePickerRangeObject | null
  );

  function setRange(range: DatePickerRangeObject | null) {
    selectedRange.value = range;
  }

  function resetRange() {
    selectedRange.value = null;
  }

  return { selectedRange, setRange, resetRange };
}
