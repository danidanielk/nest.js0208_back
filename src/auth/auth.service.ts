import { Injectable, HttpException } from '@nestjs/common';
import { UserDto } from './dto/auth.dto';
import { AuthRepository } from './auth.repository';
import { SignInDto } from './dto/signin.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService, //모듈에 임포트 해주고  이렇게 주입해준다.
  ) {}

  createUser(userDto: UserDto): Promise<User> {
    return this.authRepository.createUser(userDto);
  }

  async signIn(signInDto: SignInDto): Promise<object> {
    const { userid, password } = signInDto;
    const user = await this.authRepository.signIn(signInDto);
    const userpw = (await user).password;
    const pw = bcrypt.compare(password, userpw);
    if (user && pw) {
      //성공하면 토큰 생성. 페이로드에는 중요한정보 기입 금지.
      const payload = { userid };
      //페이로드를 이용해서 어세스토큰생성
      const accessToken = await this.jwtService.sign(payload);

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        userid: user.userid,
        Token: accessToken,
      };
      // return { info };
    } else {
      throw new HttpException('id/pw 확인', 404);
    }
  }

  async getJwt(req) {
    const a = req.user;
    const b = a.userid;
    console.log(a);
    console.log(b);
  }
}
