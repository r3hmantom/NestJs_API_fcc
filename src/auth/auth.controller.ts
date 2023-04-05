import { Controller, Post } from '@nestjs/common';
import {
  Body,
  Req,
} from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
