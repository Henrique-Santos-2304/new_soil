import { CreateUserDto } from './create.dto';

/*
  Model de dados do Usuario 

  ****************************************************************************
  
  user_id: string = Usado como identificador da tabela de dados de usuarios
  login: String = Usado para identificar usuario ao entrar na aplicação
  password: String = Usado para válidar se usuario da requisição é ele mesmo
  userType: SUDO ou USER = Usado para definir autorizações de uso do usuario
    SUDO: Define como acesso total a aplicação
    USER: Define como acesso moderado as suas respectivas fazendas

  *************************************************************************

*/
class UserModel extends CreateUserDto {
  user_id: string;
}

export { UserModel };
