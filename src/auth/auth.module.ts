import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/auth.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // PassportModule.register({
    //   defaultStrategy: 'jwt',
    // }),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret: process.env.KEY,
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
  //다른 모듈에서 사용하기위해 export 에 두개등록 auth모듈 안에사용하기위해서는 위 import쪽에 passportModule 등록 providers쪽에 JwtStrategy 등록.
})
export class AuthModule {}
