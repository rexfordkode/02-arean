import { zod } from 'zod';

export interface AddressDto {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export interface SocialLinksDto {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface CreateProfileDto {
  firstName: string;
  lastName: string;
  bio?: string;
  phone?: string;
  website?: string;
  location?: string;
  birthdate?: string;
  address?: AddressDto;
  socialLinks?: SocialLinksDto;
}
