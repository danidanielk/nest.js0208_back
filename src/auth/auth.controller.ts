import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from './auth.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './signin.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() userDto: UserDto): Promise<User> {
    return this.authService.createUser(userDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInDto: SignInDto): Promise<{ Token: string }> {
    return this.authService.signIn(signInDto);
  }
}
