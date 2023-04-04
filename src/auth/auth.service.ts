import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  signin() {
    return 'I am sign in';
  }
  signup(dto: AuthDto) {
    //generate the password hash

    //save the user in the database

    //return the saved user

    return 'I am sign up';
  }
}
