import { AxiosError } from "axios";

export type Theme = "light" | "dark";

export type CustomAxiosError = AxiosError<{ msg?: string }>;

export type UserRole = "admin" | "user";

export type User = {
  name: string;
  lastName: string;
  createdAt: string;
  email: string;
  location: string;
  role: UserRole;
  _id: string;
};
