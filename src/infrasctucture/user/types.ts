export type UserRole = 'admin' | 'user';

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
