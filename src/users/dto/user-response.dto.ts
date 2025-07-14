import { UserResponseSchema } from '../schemas/user.zod';
import { createZodDto } from 'nestjs-zod';

export class UserResponseDto extends createZodDto(UserResponseSchema) {}
