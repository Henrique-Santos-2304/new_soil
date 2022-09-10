import { UserModel } from '../models';

/*
  Serviço geração e comparação de Token Jwt

  ******************************************************************************

  @Params
    generate = { 
      user_id: string , 
      userType: string 
    } 
    checkIsValid = {
      token: string
    }

  @Response
    generate = 
      Em caso de erro = new Error('TOKEN ERROR')
      Em caso de sucesso = string com token criptogrado

    checkIsValid = 
      Em caso de erro = new Error('TOKEN ERROR')
      Em caso de sucesso = true

*/
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
