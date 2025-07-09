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

export class EnvConfig extends createZodDto(envConfig) {}
