import { AxiosError } from "axios";

export type User = {
  name: string;
};

export type Theme = "light" | "dark";

export type CustomAxiosError = AxiosError<{ msg?: string }>;
