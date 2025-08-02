import { AddressDto, SocialLinksDto } from './create-profile.dto';

export interface ProfileResponseDto {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  phone: string | null;
  website: string | null;
  location: string | null;
  birthdate: string | null;
  address: AddressDto | null;
  socialLinks: SocialLinksDto | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponseDto {
  id: string;
  email: string | null;
  username: string | null;
  avatarUrl: string | null;
  roles: string[];
  provider: 'local' | 'google' | 'github' | null;
  providerId: string | null;
  createdAt: string;
  updatedAt: string;
  profile: ProfileResponseDto | null;
}
