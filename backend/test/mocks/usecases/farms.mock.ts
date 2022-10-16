import { CreateFarmDTO } from '@root/domain';

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

export { createFarmMocked, createFarmMockStub };
