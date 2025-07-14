import { CreateUserSchema } from '../schemas/user.zod';
import { createZodDto } from 'nestjs-zod';

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
