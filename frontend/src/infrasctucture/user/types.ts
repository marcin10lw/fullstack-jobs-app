export type UserRole = 'admin' | 'user';

export interface User {
  name: string;
  lastName: string;
  createdAt: string;
  email: string;
  location: string;
  role: UserRole;
  id: string;
  avatar?: string;
  avatarPublicId?: string;
  verified: boolean;
}

export interface UserApiResponse {
  user: User;
}
