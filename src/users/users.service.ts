import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Rexford Koomson',
      email: 'rkoomson@outlook.com',
      password: '123456',
    },
    {
      id: 2,
      name: 'Rexford Koomson',
      email: 'rkoomson@outlook.com',
      password: '123456',
    },
  ];
}
