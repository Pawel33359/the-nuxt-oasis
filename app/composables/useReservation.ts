import type { DatePickerRangeObject } from "../../shared/types/datePickerRange";

export function useReservation() {
  const selectedRange = useState(
    "reservation-selected-range",
    () => null as DatePickerRangeObject | null
  );

  function setRange(range: DatePickerRangeObject | null) {
    selectedRange.value = range;
  }

  function resetRange() {
    selectedRange.value = null;
  }

  return { selectedRange, setRange, resetRange };
}
