import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserDto } from './dto/auth.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signin.dto';
// import {bcrypt} from 'bcrypt'

@Injectable()
export class AuthRepository extends Repository<User> {
  constructor(private datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  async overlap(userid): Promise<User> {
    const id = this.findOneBy({ userid });
    console.log(id);
    console.log(userid);
    return id;
  }

  async createUser(userDto: UserDto): Promise<User> {
    const password = userDto.password;
    //소금쳐주고
    const salt = await bcrypt.genSalt();
    //플레인이랑 섞어서 다져주기
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username: userDto.username,
      email: userDto.email,
      userid: userDto.userid,
      password: hashedPassword,
    });
    // const ol = this.findBy({ userid: userDto.userid });
    try {
      await this.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new HttpException('overlap id', 409);
      } else {
        throw new HttpException('Not found exception', 404);
      }
    }

    return user;
  }

  // async signIn(signInDto: SignInDto): Promise<{ Token: string }> {
  //   const inputId = signInDto.userid;
  //   const inputPw = signInDto.password;
  //   const getUser = await this.findOne({ where: { userid: inputId } });

  //   if (
  //     getUser.userid === inputId &&
  //     (await bcrypt.compare(inputPw, getUser.password))
  //   ) {
  //     //토큰생성 (secret + payload)
  //     const payload = { inputId };
  //     const accessToken = await this.jwtService.sign(payload);

  //     return { Token: accessToken };
  //   } else {
  //     throw new HttpException('id / pw 확인', 400);
  //   }

  //   // if (await bcrypt.compare(inputPw, getUser.password)) {
  //   // }
  // }

  // async signIn(userDto: UserDto): Promise<User> {
  //   const userid = userDto;
  //   console.log(userid);
  // }
  async signIn(signInDto: SignInDto): Promise<User> {
    const { userid } = signInDto;
    const user = await this.findOne({
      where: { userid: userid },
    });
    return user;
  }
}
