import { z } from 'zod';
import { ProfileSchema, CreateProfileSchema } from './profile.zod';

/**
 * Base User Schema
 */
const UserBaseSchema = z.object({
  email: z.string().email().nullable(),
  username: z.string().min(3).max(50).nullable(),
});

// Password validation regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordMessage =
  'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';

/**
 * Create User Schema
 */
export const CreateUserSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3).max(50),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must be less than 100 characters')
      .regex(passwordRegex, passwordMessage),
    confirmPassword: z.string(),
    profile: CreateProfileSchema.optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/**
 * Update User Schema
 */
export const UpdateUserSchema = UserBaseSchema.extend({
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(passwordRegex, passwordMessage)
    .optional(),
  confirmNewPassword: z.string().optional(),
  profile: CreateProfileSchema.optional(),
}).refine(
  (data) => {
    if (data.newPassword) {
      return data.newPassword === data.confirmNewPassword;
    }
    return true;
  },
  {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  },
);

/**
 * Login User Schema
 */
export const LoginUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false).optional(),
});

/**
 * Response User Schema (for API responses)
 */
export const UserResponseSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().nullable(),
  username: z.string().nullable(),
  avatarUrl: z.string().url().nullable(),
  roles: z.array(z.string()),
  provider: z.enum(['local', 'google', 'github']).nullable(),
  providerId: z.string().nullable(),
  profile: ProfileSchema.nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});
