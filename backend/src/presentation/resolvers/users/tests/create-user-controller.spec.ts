import { Test, TestingModule } from '@nestjs/testing';
import { ICreateUserController, ICreateUserService } from '@root/domain';
import { createUserMocked } from '@testRoot/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateUserResolver } from '../create-user.resolver';

describe('UserService', () => {
  let controller: ICreateUserController;
  let service: MockProxy<ICreateUserService>;

  beforeEach(async () => {
    service = mock();
    const createUserService = {
      provide: 'ICreateUserService',
      useValue: service,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserResolver, createUserService],
    }).compile();

    controller = module.get<ICreateUserController>(CreateUserResolver);

    service.start.mockResolvedValue({ status: 'Sucess' });
  });

  it('should create.user to have been called', async () => {
    const spy = jest.spyOn(controller, 'createUser');

    await controller.createUser(createUserMocked);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserMocked);
  });

  it('should service to have not been called', async () => {
    const spy = jest.spyOn(service, 'start');

    await controller.createUser(createUserMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserMocked);
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.createUser(createUserMocked);
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should property error not exists if service pass with sucess', async () => {
    const response = await controller.createUser(createUserMocked);
    expect(response).not.toHaveProperty('error');
  });

  it('should return status "Sucess"', async () => {
    const response = await controller.createUser(createUserMocked);
    expect(response).toHaveProperty('status', 'Sucess');
  });
});
