import { User } from 'src/api/user/types';

export const getUserInitials = (user: User) => `${user.name.charAt(0)}${user.lastName.charAt(0)}`;
