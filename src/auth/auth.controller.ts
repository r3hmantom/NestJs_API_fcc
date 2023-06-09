import {
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  Body,
  HttpCode,
  Req,
} from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signup(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
