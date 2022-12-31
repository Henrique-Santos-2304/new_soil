const USER_REPO = {
  FIND: 'IFindUserRepo',
  CREATE: 'ICreateUserRepo',
  UPDATE: 'IUpdateUserRepo',
  DELETE: 'IDeleteUserRepo',
};

const USER_CONTROLLER = {
  AUTH: 'IAuthUserController',
  CREATE: 'ICreateUserController',
  GET: 'IGetUserController',
};

const USER_SERVICE = {
  AUTH: 'IAuthUserService',
  FIND_BY_ID: 'IFindUserByIdService',
  CREATE: 'ICreateUserService',
  GET_ALL: 'IGetAllUserService',
};

export { USER_CONTROLLER, USER_SERVICE, USER_REPO };
