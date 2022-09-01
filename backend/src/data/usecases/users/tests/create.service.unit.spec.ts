import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ICreateUserRepo,
  ICreateUserService,
  IFindUserRepo,
} from '@root/domain';
import { PrismaService } from '@root/infra';
import { CreateUserRepo } from '@root/infra/repositories/user/create.repo';
import { FindUserRepo } from '@root/infra/repositories/user/find.repo';
import { createUserMocked, userModelMocked } from '@testRoot/index';
import { CreateUserService } from '../create.service';

describe('UserService', () => {
  let service: ICreateUserService;
  let createUserrepo: ICreateUserRepo;
  let findUserRepo: IFindUserRepo;

  beforeEach(async () => {
    const createUserProvider = {
      provide: 'ICreateUserRepo',
      useClass: CreateUserRepo,
    };

    const findUserProvider = {
      provide: 'IFindUserRepo',
      useClass: FindUserRepo,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        createUserProvider,
        findUserProvider,
        PrismaService,
        Logger,
      ],
    }).compile();

    service = module.get<ICreateUserService>(CreateUserService);
    createUserrepo = module.get<ICreateUserRepo>(CreateUserRepo);
    findUserRepo = module.get<IFindUserRepo>(FindUserRepo);

    createUserrepo.create = jest.fn().mockReturnValue(userModelMocked);
    findUserRepo.by_login = jest.fn().mockReturnValue(userModelMocked);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should service to have been called with data válids', async () => {
    const spy = jest.spyOn(service, 'start');
    await service.start(createUserMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserMocked);
  });

  it('should find user to have been called with data válids', async () => {
    const spy = jest.spyOn(findUserRepo, 'by_login');
    await service.start(createUserMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ login: createUserMocked.login });
  });
});
