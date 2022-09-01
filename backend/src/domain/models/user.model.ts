import { notStringMessage } from '@root/shared/errors';
import { IsString } from 'class-validator';
import { CreateUserDto } from '../dto/users/create.dto';

class UserModel extends CreateUserDto {
  @IsString({ message: notStringMessage('User Id') })
  user_id: string;
}

export { UserModel };
