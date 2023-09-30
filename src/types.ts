import { AxiosError } from "axios";

export type SearchOnChange = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;

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
  avatar?: string;
  avatarPublicId?: string;
};

export type DefaultStats = {
  pending: number;
  interview: number;
  declined: number;
};

export type MonthlyApplications = {
  count: number;
  date: string;
}[];

export type ApiStatsResponse = {
  defaultStats: DefaultStats;
  monthlyApplications: MonthlyApplications;
};
