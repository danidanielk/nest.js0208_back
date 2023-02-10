import { Injectable, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; //<< 중요
import { AuthRepository } from '../auth.repository';
import { User } from '../user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private aughRepository: AuthRepository) {
    super({
      //토큰의 유효성 검사.
      secretOrKey: process.env.KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { userid } = payload;
    console.log(payload, '----------------------------');
    const user: User = await this.aughRepository.findOneBy({ userid: userid });
    if (!user) {
      throw new HttpException('Not Found', 404);
    }
    return user;
  }
}
