export type UserRole = 'admin' | 'user';

export interface User {
  name: string;
  lastName: string;
  createdAt: string;
  email: string;
  location: string;
  role: UserRole;
  _id: string;
  avatar?: string;
  avatarPublicId?: string;
}

export interface UserApiResponse {
  user: User;
}
