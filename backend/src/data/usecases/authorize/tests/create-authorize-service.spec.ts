import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import {
  AuthorizeModel,
  ICreateAuthorizeRepo,
  ICreateAuthorizeService,
  IFindAuthorizeRepo,
} from '@root/domain';
import { AUTHORIZE_REPO } from '@root/shared';
import { AlreadyExistsError, NotCreatedError } from '@root/shared/errors';
import { createAuthorizeMock } from '@testRoot/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateAuthorizeService } from '../create-authorize.service';

describe('Create Authorize Service Unit', () => {
  let service: ICreateAuthorizeService;
  let createAuthorizeRepo: MockProxy<ICreateAuthorizeRepo>;
  let findAuthorizeRepo: MockProxy<IFindAuthorizeRepo>;

  let logger: MockProxy<Logger>;

  const authorizeMock: AuthorizeModel = {
    ...createAuthorizeMock,
    authorize_id: 'id',
  };

  beforeEach(async () => {
    createAuthorizeRepo = mock();
    findAuthorizeRepo = mock();
    logger = mock();

    const findAuthorizeRepoProvider = {
      provide: AUTHORIZE_REPO.FIND,
      useValue: findAuthorizeRepo,
    };

    const createAuthorizeRepoProvider = {
      provide: AUTHORIZE_REPO.CREATE,
      useValue: createAuthorizeRepo,
    };

    const loggerProvider = { provide: Logger, useValue: logger };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        CreateAuthorizeService,
        createAuthorizeRepoProvider,
        findAuthorizeRepoProvider,
        loggerProvider,
      ],
    }).compile();

    service = module.get<ICreateAuthorizeService>(CreateAuthorizeService);

    findAuthorizeRepo.by_farm.mockResolvedValue(null);
    createAuthorizeRepo.create.mockResolvedValue({
      authorize_id: authorizeMock.authorize_id,
    });
  });

  it('should providers to be defined', () => {
    expect(service).toBeDefined();
    expect(findAuthorizeRepo).toBeDefined();

    expect(createAuthorizeRepo).toBeDefined();
  });

  it('shoul be service to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(service, 'start');

    await service.start(createAuthorizeMock);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createAuthorizeMock);
  });

  // // Test FindAuthorizeRepo

  it('should be FindAuthorizeRepo.by_farm to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findAuthorizeRepo, 'by_farm');

    await service.start(createAuthorizeMock);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createAuthorizeMock.farm_id);
  });

  it('should be throw a AuthorizedAlreadExist if findAuthorizerepo return a data', async () => {
    findAuthorizeRepo.by_farm.mockResolvedValueOnce(authorizeMock);

    const response = service.start(createAuthorizeMock);

    await expect(response).rejects.toThrow(new AlreadyExistsError('Authorize'));
  });

  it('shoul be throw a QUERY ERROR if FindAuthorizeRepo.by_farm throw error', async () => {
    findAuthorizeRepo.by_farm.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start(createAuthorizeMock);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // // Tests Create Authorize

  it('should be create Authorize to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(createAuthorizeRepo, 'create');

    await service.start(createAuthorizeMock);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createAuthorizeMock);
  });

  it('should be throw a QUERY ERROR if createAuthorize throw error', async () => {
    createAuthorizeRepo.create.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start(createAuthorizeMock);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  it('should be throw a error if createAuthorize return null', async () => {
    createAuthorizeRepo.create.mockResolvedValueOnce(null);

    const response = service.start(createAuthorizeMock);

    await expect(response).rejects.toThrow(new NotCreatedError('Authorize'));
  });

  it('should be have a new authorize in db', async () => {
    const response = await service.start(createAuthorizeMock);

    expect(response).toHaveProperty('status', 'Sucess');
    expect(response).toHaveProperty('authorize_id', authorizeMock.authorize_id);
  });
});
