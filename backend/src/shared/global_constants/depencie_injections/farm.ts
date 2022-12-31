const FARM_REPO = {
  CREATE: 'ICreateFarmRepo',
  DELETE: 'IDeleteFarmRepo',
  FIND: 'IFindFarmRepo',
  UPDATE: 'IUpdateFarmRepo',
};

const FARM_SERVICE = {
  ADD_USER: 'IAddUserIntoFarmService',
  CREATE: 'ICreateFarmService',
  FIND: 'IFindFarmService',
  FIND_BY_ID: 'IFindFarmByIdService',
  UPDATE: 'IUpdateFarmService',
  DELETE: 'IDeleteFarmService',
  DELETE_USER: 'IDeleteUserOfFarmService',
};

const FARM_CONTROLLER = {
  ADD_USER: 'IAddUserIntoFarmController',
  CREATE: 'ICreateFarmController',
  FIND: 'IFindFarmController',
  UPDATE: 'IUpdateFarmController',
  DELETE: 'IDeleteFarmController',
  DELETE_USER: 'IDeleteUserOfFarmController',
};

export { FARM_SERVICE, FARM_CONTROLLER, FARM_REPO };
