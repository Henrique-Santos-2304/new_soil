import { notStringMessage, notEmptyMessage } from '@root/shared/errors';
import { IsString, IsNotEmpty } from 'class-validator';

type UserType = 'SUDO' | 'USER';
class CreateUserDto {
  @IsString({ message: notStringMessage('Login') })
  @IsNotEmpty({ message: notEmptyMessage('Login') })
  login: string;

  @IsString({ message: notStringMessage('Password') })
  @IsNotEmpty({ message: notEmptyMessage('Password') })
  password: string;

  @IsString({ message: notStringMessage('UserType') })
  @IsNotEmpty({ message: notEmptyMessage('UserType') })
  userType: UserType;
}

export { CreateUserDto };
