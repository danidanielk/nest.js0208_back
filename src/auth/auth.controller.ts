import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { SignInDto } from './dto/signin.dto';
import { AuthRepository } from './auth.repository';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authRepository: AuthRepository,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() userDto: UserDto): Promise<User> {
    return this.authService.createUser(userDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signin(@Body() signindto: SignInDto): Promise<object> {
    return this.authService.signIn(signindto);
  }

  // 미들웨어 가드(서비스로직 전실행)에 authguard() @nestje/passport 를 사용해서 strategy.ts 에있는 validate 가 실행된다.
  // super 을 통해 유효한지 확인후 payload 를 찍어보니 복호화된 user정보가 담겨있다 이후 repository 의 typeORM 의 findOne을 사용해서
  // payload 안에담긴 userid를 대입하면 user객체를 받아온다 이후 user를 리턴헤주고 Controller에서 req를 찍어보면 user정보가 있다.
  // 어떻게 req로 넘어왔는지는 아직 이해가 부족하다.
  // 이후 토큰의 생성,검증을 구현한 모듈을 다른 모듈에서 사용하려면 모듈의 import 안에 모듈채로 넣어줘야한다.(당연한소리지만 혹시까먹을까봐 적어놓는다.)
  // 그리고 Controller 레벨에서 UseGuard(AuthGuard()) 적용시키고 모든 핸들러에서 사용가능하고 authguard 함수를 통해 토큰이 같이 안들어오면 error 보내준다.
  // 신기하다.
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    this.authService.getJwt(req);
  }
}
