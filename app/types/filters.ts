export interface FilterOption {
  name: string;
  param: string;
}

export type FilterInputType = 'radio' | 'checkbox';

export interface FilterGroup {
  type: FilterInputType;
  filters: FilterOption[];
}
