import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(30, { message: 'Name must be less than 30 characters' }),
  lastName: z
    .string()
    .trim()
    .min(2, { message: 'Last Name must be at least 2 characters' })
    .max(30, { message: 'Last Name must be less than 30 characters' }),
  location: z.string().trim().min(1, { message: 'Location is required' }),
  email: z.string().trim().email(),
  avatar: z
    .custom<File>()
    .refine(
      (file) => {
        if (file) {
          return file.type.startsWith('image/');
        }

        return true;
      },
      { message: 'File must be an image' },
    )
    .refine(
      (file) => {
        if (file) {
          return file.size <= 524288;
        }

        return true;
      },
      { message: 'File max size is 0.5 MB' },
    )
    .nullable(),
});

export const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .trim()
    .min(1, { message: 'password is required' }),
  newPassword: z
    .string()
    .trim()
    .min(1, { message: 'password is required' })
    .min(6, { message: 'password must be at least 6 characters long' })
    .max(30, {
      message: 'password must be between 6 and 30 characters long',
    }),
});

export type UpdatedUserSchema = z.infer<typeof updateUserSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
