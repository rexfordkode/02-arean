import { ProfileSchema } from '../schemas/profile.zod';
import { createZodDto } from 'nestjs-zod';

export class ProfileDto extends createZodDto(ProfileSchema) {}
