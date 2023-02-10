// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthRepository } from './auth.repository';
// import { User } from './user.entity';
// import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(
//     private authRepository: AuthRepository, //   constructor( //     @InjectRepository(AuthRepository) //     private authRepository: AuthRepository, //   )
//   ) {
//     super({
//       //체크할 키
//       secretOrKey: 'dd',
//       //토큰 어디서가져오는지
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     });
//   }

//   async validate(payload) {
//     // const { userid } = payload;
//     // const user2: User = await this.authRepository.findOneBy({ userid });
//     // // const user: User = await this.authRepository.findOne({
//     // //   where: { userid: userid },
//     // // });
//     // if (!user2) {
//     //   throw new UnauthorizedException();
//     // }
//     // return user2;
//     return payload;
//   }
// }
