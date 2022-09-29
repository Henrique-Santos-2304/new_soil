type UserType = 'MASTER' | 'DEALER' | 'ADMIN' | 'USER';
/*
  Data Object Transfer para criação de novo Usuario

  ***********************************************************************

  login: String = Usado para identificar usuario ao entrar na aplicação
  password: String = Usado para válidar se usuario da requisição é ele mesmo
  userType: MASTER ou USER = Usado para definir autorizações de uso do usuario
    MASTER: Define como acesso total a aplicação
    USER: Define como acesso moderado as suas respectivas fazendas

  *************************************************************************
*/
class CreateUserDto {
  login: string;
  password: string;
  userType: UserType;
}

export { CreateUserDto, UserType };
