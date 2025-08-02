import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Get()
  getAllUsers() {
    return 'All users';
  }

  @Get('profile')
  getProfile() {
    return 'User profile';
  }
  @Get('settings')
  getSettings() {
    return 'User settings';
  }
  @Get('logout')
  logout() {
    return 'User logout';
  }
  @Get('login')
  login() {
    return 'User login';
  }
  @Get('register')
  register() {
    return 'User register';
  }
  @Get('forgot-password')
  forgotPassword() {
    return 'User forgot password';
  }
  @Post('reset-password')
  resetPassword() {
    return 'User reset password';
  }
}
