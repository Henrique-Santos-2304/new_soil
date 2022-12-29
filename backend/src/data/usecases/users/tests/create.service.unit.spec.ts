import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ICreateUserService } from '@contracts/index';
import { CreateUserService } from '../create.service';
import { NotCreatedError, AlreadyExistsError } from '@utils/errors';
import {
  createUserMocked,
  createUserRequestMocked,
  prismaProviderMock,
  userModelMocked,
  createUserRepoMock,
  createUserRepoMockProvider,
  findUserRepoMock,
  findUserRepoMockProvider,
  encrypterMock,
  encrypterMockProvider,
  loggerMockProvider,
} from '@testRoot/index';

describe('Create User Service Unit', () => {
  let service: ICreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        findUserRepoMockProvider,
        createUserRepoMockProvider,
        encrypterMockProvider,
        loggerMockProvider,
        prismaProviderMock,
      ],
    }).compile();

    service = module.get<ICreateUserService>(CreateUserService);

    createUserRepoMock.create.mockResolvedValue(userModelMocked);
    findUserRepoMock.by_login.mockResolvedValue(null);
    encrypterMock.encrypt.mockResolvedValue('encrypted_password');
  });

  // Test usecase to have be defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test service to have been called with data válids
  it('should service to have been called with data válids', async () => {
    const spy = jest.spyOn(service, 'start');
    await service.start(createUserRequestMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createUserRequestMocked);
  });

  // Test if received password intenal is válid
  it('should return error "Credential Invalid" if internal password received is invalid', async () => {
    const response = service.start({
      ...createUserRequestMocked,
      internal_password: 'invalid',
    });

    await expect(response).rejects.toThrow(new UnauthorizedException().message);
  });

  // Test find user to have been called with data válid
  it('should find user to have been called with data válids', async () => {
    const spy = jest.spyOn(findUserRepoMock, 'by_login');
    await service.start(createUserRequestMocked);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ login: createUserMocked.login });
  });

  // Test find user return "QUERY_ERROR" if db to throw
  it('should find user return "QUERY_ERROR" if db to throw', async () => {
    findUserRepoMock.by_login.mockRejectedValueOnce(new Error('QUERY_ERROR'));

    const response = service.start(createUserRequestMocked);
    await expect(response).rejects.toThrow(new Error('QUERY_ERROR'));
  });

  // Test findUserRepo return user already exists if db return an user
  it('should findUserRepo return user already exists if db return an user', async () => {
    findUserRepoMock.by_login.mockResolvedValueOnce(userModelMocked);

    const response = service.start(createUserRequestMocked);
    await expect(response).rejects.toThrow(
      new AlreadyExistsError('User').message,
    );
  });

  // Test encrypter to have been called with password received
  it('should encrypter to have been called with password received ', async () => {
    const spy = jest.spyOn(encrypterMock, 'encrypt');
    await service.start(createUserRequestMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ value: createUserMocked.password });
  });

  // Test encrypter return error if not encrypted password
  it('should encrypter throw "ENCRYPT ERROR" if an error ocurred', async () => {
    encrypterMock.encrypt.mockRejectedValueOnce(new Error('ENCRYPT ERROR'));
    const response = service.start(createUserRequestMocked);

    await expect(response).rejects.toThrow('ENCRYPT ERROR');
  });

  // Test createUserRepo to have been called with data received and password encrypted
  it('should createUserRepo to have been called with data received and password encrypted', async () => {
    const spy = jest.spyOn(createUserRepoMock, 'create');
    await service.start(createUserRequestMocked);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      ...createUserMocked,
      password: 'encrypted_password',
    });
  });

  // Test createUserRepo return "QUERY_ERROR" if db ocurred an error
  it('should createUserRepo throw "QUERY_ERROR" if db ocurred an error and log error', async () => {
    createUserRepoMock.create.mockRejectedValueOnce(new Error('QUERY_ERROR'));
    const response = service.start(createUserRequestMocked);

    await expect(response).rejects.toThrow('QUERY_ERROR');
  });

  // Test useCase return User not created if db not return a new user
  it('should useCase return User not created if db not return a new user', async () => {
    createUserRepoMock.create.mockResolvedValueOnce(null);
    const response = service.start(createUserRequestMocked);

    await expect(response).rejects.toThrow(new NotCreatedError('User').message);
  });

  // Test useCase return a new User created if haved sucess
  it('should useCase return a new User created if haved sucess', async () => {
    const response = await service.start(createUserRequestMocked);

    expect(response).toHaveProperty('user_id');
    expect(response).toHaveProperty('status', 'Sucess');
  });
});
