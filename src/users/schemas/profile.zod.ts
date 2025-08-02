import { z } from 'zod';

const socialLinksSchema = z
  .object({
    twitter: z.string().url().nullable(),
    linkedin: z.string().url().nullable(),
    github: z.string().url().nullable(),
    facebook: z.string().url().nullable(),
    youtube: z.string().url().nullable(),
    website: z.string().url().nullable(),
  })
  .nullable();

const addressSchema = z
  .object({
    street: z.string().nullable(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    postalCode: z.string().nullable(),
  })
  .nullable();

/**
 * Create Profile Schema - Used when creating a new profile
 */
export const CreateProfileSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  bio: z.string().max(500).optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional(),
  website: z.string().url().optional(),
  location: z.string().optional(),
  birthdate: z.string().datetime().optional(),
  socialLinks: socialLinksSchema.optional(),
  address: addressSchema.optional(),
});

/**
 * Profile Schema Definition - Used for database records
 */
export const ProfileSchema = z.object({
  userId: z.string().uuid(),
  firstName: z.string().min(2).max(50).nullable(),
  lastName: z.string().min(2).max(50).nullable(),
  bio: z.string().max(500).nullable(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .nullable(),
  website: z.string().url().nullable(),
  location: z.string().nullable(),
  birthdate: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // Extended fields stored in JSONB
  socialLinks: socialLinksSchema,
  address: addressSchema,
});
