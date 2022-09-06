import { Logger, Provider } from '@nestjs/common';
import { mock, MockProxy } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import {
  ICreateUserRepo,
  ICreateUserService,
  IEncrypterData,
  IFindUserRepo,
} from '@root/domain';
import { createUserMocked, userModelMocked } from '@testRoot/index';
import { CreateUserService } from '../create.service';

describe('UserService', () => {
  let service: ICreateUserService;
  let createUserrepo: MockProxy<ICreateUserRepo>;
  let findUserRepo: MockProxy<IFindUserRepo>;
  let encrypter: MockProxy<IEncrypterData>;
  let logger: MockProxy<Logger>

  beforeEach(async () => {
    createUserrepo = mock();
    findUserRepo = mock();
    encrypter = mock()
    logger = mock()

    const finProvider = { provide: 'IFindUserRepo', useValue: findUserRepo };

    const createProvider = {
      provide: 'ICreateUserRepo',
      useValue: createUserrepo,
    };

    const encryptProvider = {provide: 'IEncrypterData', useValue: encrypter}

    const loggerProvider = {provide: Logger, useValue: logger};

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CreateUserService, finProvider, createProvider, encryptProvider, loggerProvider],
    }).compile();

    service = module.get<ICreateUserService>(CreateUserService);

    createUserrepo.create.mockResolvedValue(userModelMocked);
    findUserRepo.by_login.mockResolvedValue(null);
    encrypter.encrypt.mockResolvedValue("encrypted_password")
  });

  // Test usecase to have be defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test service to have been called with data válids
  it('should service to have been called with data válids', async () => {
    const spy = jest.spyOn(service, 'start');
    await service.start(createUserMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserMocked);
  });

  // Test find user to have been called with data válid
  it('should find user to have been called with data válids', async () => {
    const spy = jest.spyOn(findUserRepo, 'by_login');
    await service.start(createUserMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ login: createUserMocked.login });
  });

  // Test find user return "QUERY_ERROR" if db to throw
  it('should find user return "QUERY_ERROR" if db to throw', async () => {
    findUserRepo.by_login.mockRejectedValueOnce(new Error("QUERY_ERROR"))

    const response =  service.start(createUserMocked);
    await expect(response).rejects.toThrow(new Error("QUERY_ERROR"));

  });

  // Test findUserRepo return user already exists if db return an user
  it('should findUserRepo return user already exists if db return an user', async () => {
    findUserRepo.by_login.mockResolvedValueOnce(userModelMocked);

    const response = service.start(createUserMocked);
    await expect(response).rejects.toThrow('User already exists');
  });

  // Test encrypter to have been called with password received
  it('should encrypter to have been called with password received ', async () => {
    const spy = jest.spyOn(encrypter, 'encrypt')
    await service.start(createUserMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({value: createUserMocked.password});

  });

  // Test encrypter return error if not encrypted password
  it('should encrypter throw "ENCRYPT ERROR" if an error ocurred', async () => {
    encrypter.encrypt.mockRejectedValueOnce(new Error("ENCRYPT ERROR"))
    const response = service.start(createUserMocked);

    await expect(response).rejects.toThrow("ENCRYPT ERROR")
  });

  // Test createUserRepo to have been called with data received and password encrypted
  it('should createUserRepo to have been called with data received and password encrypted', async () => {
    const spy = jest.spyOn(createUserrepo, 'create')
    await service.start(createUserMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({...createUserMocked, password: "encrypted_password"});

  });

  // Test createUserRepo return "QUERY_ERROR" if db ocurred an error
  it('should createUserRepo throw "QUERY_ERROR" if db ocurred an error and log error', async () => {
    createUserrepo.create.mockRejectedValueOnce(new Error("QUERY_ERROR"))
    const response = service.start(createUserMocked);

    await expect(response).rejects.toThrow("QUERY_ERROR");
  });

  // Test useCase return User not created if db not return a new user
  it('should useCase return User not created if db not return a new user', async () => {
    createUserrepo.create.mockResolvedValueOnce(null)
    const response = service.start(createUserMocked);

    await expect(response).rejects.toThrow("User Not Created");
  });

  // Test useCase return a new User created if haved sucess
  it('should useCase return a new User created if haved sucess', async () => {
    const response = await service.start(createUserMocked);

    expect(response).toEqual({status: "Sucess"});
  });
});
