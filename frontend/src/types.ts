import { AxiosError } from 'axios';

export type SearchOnChange = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

export type Theme = 'light' | 'dark';

export type CustomAxiosError = AxiosError<{ msg?: string }>;
