import { Test, TestingModule } from '@nestjs/testing';
import { ICreateUserService } from '@root/domain';
import { createUserMocked } from '@testRoot/index';
import { CreateUserService } from '../create.service';

describe('UserService', () => {
  let service: ICreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserService],
    }).compile();

    service = module.get<ICreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should to have been called with data válids', async () => {
    const spy = jest.spyOn(service, 'start');
    await service.start(createUserMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserMocked);
  });
});
