export interface OptionType {
  id: string;
  name: string;
  count_events?: number;
  count_areas?: number;
}

export interface SelectMenuProps {
  options: OptionType[];
  onChange?: (value: string | undefined) => void;
  searchable?: boolean;
  placeholder?: string;
  value: string | undefined;
}