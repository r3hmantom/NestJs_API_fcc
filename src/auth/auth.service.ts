import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin() {
    return 'I am sign in';
  }
  signup() {
    return 'I am sign up';
  }
}
