import { LoginUserSchema } from '../schemas/user.zod';
import { createZodDto } from 'nestjs-zod';

export class LoginUserDto extends createZodDto(LoginUserSchema) {}
