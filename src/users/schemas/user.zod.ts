import { z } from 'zod';
import { ProfileSchema } from './profile.zod';

/**
 * Base User Schema
 */
const UserBaseSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50),
});

// Password validation regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordMessage =
  'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';

/**
 * Create User Schema
 */
export const CreateUserSchema = UserBaseSchema.extend({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(passwordRegex, passwordMessage),
  confirmPassword: z.string(),
  profile: ProfileSchema.optional(),
}).refine((data) => data.password === data.confirmPassword, {
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
  profile: ProfileSchema.optional(),
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
export const UserResponseSchema = UserBaseSchema.extend({
  id: z.string().uuid(),
  avatarUrl: z.string().url().nullable(),
  roles: z.array(z.string()).default(['user']),
  profile: ProfileSchema.nullable(),
  provider: z.enum(['local', 'google', 'github']).default('local'),
  createdAt: z.date(),
  updatedAt: z.date(),
});
