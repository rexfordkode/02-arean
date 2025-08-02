import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { users, profiles } from '../db/schema/user';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import type {
  UserResponseDto,
  ProfileResponseDto,
} from './dto/user-response.dto';
import type { AddressDto, SocialLinksDto } from './dto/create-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly drizzle: DrizzleService) {}

  /**
   * Create a new user (signup)
   */
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const db = this.drizzle.getClient();

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, createUserDto.email),
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        email: createUserDto.email,
        username: createUserDto.username,
        passwordHash: hashedPassword,
        provider: 'local',
        roles: ['user'],
      })
      .returning();

    // Create profile if provided
    if (createUserDto.profile) {
      const profile = createUserDto.profile;
      await db.insert(profiles).values({
        userId: newUser.id,
        firstName: profile.firstName || null,
        lastName: profile.lastName || null,
        bio: profile.bio || null,
        phone: profile.phone || null,
        website: profile.website || null,
        location: profile.location || null,
        birthdate: profile.birthdate ? new Date(profile.birthdate) : null,
        address: (profile.address as AddressDto) || null,
        socialLinks: (profile.socialLinks as SocialLinksDto) || null,
      });
    }

    return this.findById(newUser.id);
  }

  /**
   * Find a user by email for login
   */
  async findByEmail(email: string) {
    const db = this.drizzle.getClient();
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
      with: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Find a user by ID and transform to DTO format
   */
  async findById(id: string): Promise<UserResponseDto> {
    const db = this.drizzle.getClient();
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Transform to DTO format
    const transformedUser: UserResponseDto = {
      id: user.id,
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
      roles: user.roles as string[],
      provider: (user.provider || null) as 'local' | 'google' | 'github' | null,
      providerId: user.providerId,
      createdAt: user.createdAt?.toISOString() ?? new Date().toISOString(),
      updatedAt: user.updatedAt?.toISOString() ?? new Date().toISOString(),
      profile: user.profile
        ? {
            userId: user.profile.userId,
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            bio: user.profile.bio,
            phone: user.profile.phone,
            website: user.profile.website,
            location: user.profile.location,
            birthdate: user.profile.birthdate?.toISOString() ?? null,
            address: (user.profile.address as AddressDto) || null,
            socialLinks: (user.profile.socialLinks as SocialLinksDto) || null,
            createdAt: user.profile.createdAt.toISOString(),
            updatedAt: user.profile.updatedAt.toISOString(),
          }
        : null,
    };

    return transformedUser;
  }

  /**
   * Validate user credentials for login
   */
  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.findByEmail(loginUserDto.email);

    if (!user.passwordHash) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    return this.findById(user.id);
  }
}
