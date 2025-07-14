import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';

/**
 * Drizzle ORM configuration
 * @see https://orm.drizzle.team/kit-docs/conf
 */
export default defineConfig({
  // Schema path - all database table definitions
  schema: './src/db/schema/*.ts',

  // Output directory for migrations
  out: './drizzle/migrations',

  // PostgreSQL specific configuration
  dialect: 'postgresql',
  strict: true,
  verbose: true,

  // Database connection configuration
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5433,
    database: process.env.DB_NAME || 'auth-dashboard-dev',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  },
} satisfies Config);
