import { Test, TestingModule } from '@nestjs/testing';
import { IGetAllUserService, IGetUserController } from '@root/domain';
import { mock, MockProxy } from 'jest-mock-extended';
import { GetUsersResolver } from '../../get-users.resolver';

describe('Get Users Controller Unit', () => {
  let controller: IGetUserController;
  let service: MockProxy<IGetAllUserService>;

  beforeEach(async () => {
    service = mock();
    const getUserService = {
      provide: 'IGetAllUserService',
      useValue: service,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetUsersResolver, getUserService],
    }).compile();

    controller = module.get(GetUsersResolver);

    service.start.mockResolvedValue([
      { login: `soil1`, user_id: `1`, userType: 'MASTER' },
      { login: `soil2`, user_id: `2`, userType: 'MASTER' },
    ]);
  });

  it('should service and controller to be defined', async () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  it('should create.user to have been called', async () => {
    const spy = jest.spyOn(controller, 'getUsers');

    await controller.getUsers();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should service to have been called', async () => {
    const spy = jest.spyOn(service, 'start');

    await controller.getUsers();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should controller return status "Fail" and error message if an error ocurred in service', async () => {
    service.start.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = await controller.getUsers();
    expect(response).toHaveProperty('status', 'Fail');
    expect(response).toHaveProperty('error', 'QUERY ERROR');
  });

  it('should property error not exists if service pass with sucess', async () => {
    const response = await controller.getUsers();
    expect(response).not.toHaveProperty('error');
  });

  it('should return status "Sucess"', async () => {
    const response = await controller.getUsers();
    expect(response).toHaveProperty('status', 'Sucess');
  });
});
