import { AxiosError } from 'axios';

export type SearchOnChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export type ThemeMode = 'light' | 'dark';
export type ThemeColor = 'violet' | 'slate' | 'rose' | 'orange' | 'green' | 'blue' | 'yellow';

export type CustomAxiosError = AxiosError<{ msg?: string }>;

export interface SelectOption {
  label: string;
  value: string;
}
