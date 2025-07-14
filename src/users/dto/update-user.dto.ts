import { UpdateUserSchema } from '../schemas/user.zod';
import { createZodDto } from 'nestjs-zod';

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
