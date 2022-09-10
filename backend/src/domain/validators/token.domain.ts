import { UserModel } from '../models';

interface ITokenService {
  generate(data: IGenerateUserToken.Params): IGenerateUserToken.Response;
  checkIsValid({ token }: ICheckTokenValid.Params): ICheckTokenValid.Response;
}

namespace IGenerateUserToken {
  export type Params = Pick<UserModel, 'userType' | 'user_id'>;
  export type Response = Promise<{ token: string }>;
}

namespace ICheckTokenValid {
  export type Params = { token: string };
  export type Response = Promise<boolean>;
}

export { ITokenService, IGenerateUserToken };
