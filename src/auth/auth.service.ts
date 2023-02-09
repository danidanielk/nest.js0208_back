import { Injectable } from '@nestjs/common';
import { UserDto } from './auth.dto';
import { AuthRepository } from './auth.repository';
import { SignInDto } from './signin.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  createUser(userDto: UserDto): Promise<User> {
    return this.authRepository.createUser(userDto);
  }

  signIn(signInDto: SignInDto): Promise<{ Token: string }> {
    return this.authRepository.signIn(signInDto);
  }
}
