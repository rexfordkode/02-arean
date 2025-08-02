import { pgTable, text, uuid, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  // Local login
  username: text('username').unique(),
  passwordHash: text('password_hash'),

  // Common
  email: text('email').unique(),
  avatarUrl: text('avatar_url'),

  // OAuth
  provider: text('provider'), // e.g., 'google' | 'github'
  providerId: text('provider_id'),

  // Role management
  roles: jsonb('roles').default(['user']).notNull(),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
});

export const profiles = pgTable('profiles', {
  userId: uuid('user_id')
    .primaryKey()
    .references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'no action',
    }),

  firstName: text('first_name'),
  lastName: text('last_name'),
  bio: text('bio'),
  location: text('location'),
  website: text('website'),
  phone: text('phone'),
  birthdate: timestamp('birthdate', { mode: 'date' }),

  // Complex fields stored as JSONB
  address: jsonb('address'),
  socialLinks: jsonb('social_links'),

  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
});

export const userRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
}));

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));
