/*
  Data Object Transfer para Autenticação de Usuario

  ***********************************************************************

  login: String = Usado para identificar usuario ao entrar na aplicação
  password: String = Usado para válidar se usuario da requisição é ele mesmo

  *************************************************************************
*/

class AuthUserDto {
  login: string;
  password: string;
}

export { AuthUserDto };
