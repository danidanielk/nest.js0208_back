import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  @IsString()
  @Matches(/^[a-zA-z0-9]*$/, {
    message: 'only English and number',
  })
  userid: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'only English and number',
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
