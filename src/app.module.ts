import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { AccessControlModule } from 'nest-access-control';
import { RBAC_ROLES } from './roles/app.roles';

@Module({
  imports: [
    AccessControlModule.forRoles(RBAC_ROLES),
    AuthModule,
    UsersModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService], // Removed UsersService - it should only be in UsersModule
})
export class AppModule {}
