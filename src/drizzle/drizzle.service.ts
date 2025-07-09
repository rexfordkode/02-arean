import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/db/schema/user';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private db: NodePgDatabase<typeof schema>;
  private readonly logger = new Logger(DrizzleService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.pool = new Pool({
      connectionString: this.configService.get('DATABASE_URL'),
    });
    this.db = drizzle(this.pool, { schema });
    this.logger.log('Drizzle client initialized');
  }

  getClient(): NodePgDatabase<typeof schema> {
    if (!this.db) {
      throw new Error('Drizzle client not initialized');
    }
    return this.db;
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
      this.logger.log('Database pool closed');
    }
  }
}
