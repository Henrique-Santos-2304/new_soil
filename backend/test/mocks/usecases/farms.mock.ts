import { CreateFarmDTO, IUpdateFarmService } from '@root/domain';

const createFarmMocked: CreateFarmDTO = {
  farm_id: 'soil_farm',
  farm_name: 'soil-tech',
  farm_city: 'Santa Rita Sapucaí',
  farm_lat: 19.4567,
  farm_lng: 46.4567,
  owner_id: 'soil_owner',
  created_by: 'user_id',
  updated_by: null,
  admins: [],
  dealers: [],
  users: [],
};

const createFarmMockStub: CreateFarmDTO = {
  ...createFarmMocked,
  farm_id: 'soil_farm_test',
  farm_name: 'soil_farm_test',
};

const createFarmMocked2: CreateFarmDTO = {
  ...createFarmMockStub,
  farm_id: 'soil_farm_test2',
  farm_name: 'soil_farm_test2',
};

const createFarmMocked3: CreateFarmDTO = {
  ...createFarmMockStub,
  farm_id: 'soil_farm_test3',
  farm_name: 'soil_farm_test3',
};

const { admins, dealers, updated_by, users, created_by, owner_id, ...rest } =
  createFarmMocked;

const updateFarmMock = {
  farm_id: 'att_farm_id',
  farm_name: 'att_farm_name',
  farm_city: 'att_farm_city',
  farm_lat: 19.4567,
  farm_lng: 46.4567,
};

const serviceUpdateFarmMock: IUpdateFarmService.Params = {
  farm_id: 'test',
  user: {
    user_id: 'id',
    userType: 'MASTER',
  },
  newFarm: updateFarmMock,
};

export {
  createFarmMocked,
  createFarmMockStub,
  updateFarmMock,
  serviceUpdateFarmMock,
  createFarmMocked2,
  createFarmMocked3,
};
