import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor() {}

  @Get()
  getAllUsers() {
    return 'All users';
  }

  @Get(':id')
  getUserById() {
    return 'User by id';
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
