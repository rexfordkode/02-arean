import { createZodDto } from 'nestjs-zod';
import * as z from 'zod';

export const envConfig = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'local'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRATION: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
  JWT_REFRESH_EXPIRATION: z.string().min(1),
  DATABASE_URL: z.string().min(1),
});

const envServer = envConfig.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!envServer.success) {
  console.error(envServer.error);
  throw new Error('Invalid environment variables');
}

export class EnvConfig extends createZodDto(envConfig) {}
