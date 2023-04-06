import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      return {
        message: 'User created successfully',
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          'User already exists',
        );
      }
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async signin(dto: AuthDto) {
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    delete user.hash;
    return user;
  }
  // async signToken(
  //   userId: number,
  //   email: string,
  // ): Promise<{ access_token: string }> {
  //   const payload = {
  //     sub: userId,
  //     email,
  //   };
  //   const secret = this.config.get('JWT_SECRET');

  //   const token = await this.jwt.signAsync(
  //     payload,
  //     {
  //       expiresIn: '15m',
  //       secret: secret,
  //     },
  //   );

  //   return {
  //     access_token: token,
  //   };
  // }
}
