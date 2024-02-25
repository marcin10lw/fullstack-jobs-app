import { User } from 'src/infrasctucture/user/types';

export const getUserInitials = (user: User) =>
  `${user.name.charAt(0)}${user.lastName.charAt(0)}`;
