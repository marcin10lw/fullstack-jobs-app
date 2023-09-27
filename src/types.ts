import { AxiosError } from "axios";

export type Theme = "light" | "dark";

export type CustomAxiosError = AxiosError<{ msg?: string }>;

export type User = {
  name: string;
  lastName: string;
  createdAt: string;
  email: string;
  location: string;
  role: "admin" | "user";
  _id: string;
};
