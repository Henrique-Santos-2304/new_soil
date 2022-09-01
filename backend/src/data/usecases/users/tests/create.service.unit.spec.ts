import { Logger } from '@nestjs/common';
import { mock, MockProxy } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import {
  ICreateUserRepo,
  ICreateUserService,
  IFindUserRepo,
} from '@root/domain';
import { CreateUserRepo } from '@root/infra/repositories/user/create.repo';
import { FindUserRepo } from '@root/infra/repositories/user/find.repo';
import { createUserMocked, userModelMocked } from '@testRoot/index';
import { CreateUserService } from '../create.service';

describe('UserService', () => {
  let service: ICreateUserService;
  let createUserrepo: MockProxy<ICreateUserRepo>;
  let findUserRepo: MockProxy<IFindUserRepo>;

  beforeEach(async () => {
    createUserrepo = mock();
    findUserRepo = mock();

    const finProvider = { provide: 'IFindUserRepo', useValue: findUserRepo };
    const createProvider = {
      provide: 'ICreateUserRepo',
      useValue: createUserrepo,
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CreateUserService, finProvider, createProvider, Logger],
    }).compile();

    service = module.get<ICreateUserService>(CreateUserService);

    createUserrepo.create.mockResolvedValue(userModelMocked);
    findUserRepo.by_login.mockResolvedValue(userModelMocked);
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
