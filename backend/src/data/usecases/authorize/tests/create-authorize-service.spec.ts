import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizeModel, ICreateAuthorizeService } from '@root/domain';
import { CreateAuthorizeService } from '../create-authorize.service';
import { AlreadyExistsError, NotCreatedError } from '@root/shared/errors';
import {
  createAuthorizeMock,
  createAuthorizeRepoMock,
  findAuthorizeRepoMock,
  loggerMockProvider,
  prismaProviderMock,
  createAuthorizeRepoMockProvider,
  findAuthorizeRepoMockProvider,
} from '@testRoot/mocks';

describe('Create Authorize Service Unit', () => {
  let service: ICreateAuthorizeService;

  const authorizeMock: AuthorizeModel = {
    ...createAuthorizeMock,
    authorize_id: 'id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAuthorizeService,
        createAuthorizeRepoMockProvider,
        findAuthorizeRepoMockProvider,
        loggerMockProvider,
        prismaProviderMock,
      ],
    }).compile();

    service = module.get<ICreateAuthorizeService>(CreateAuthorizeService);

    findAuthorizeRepoMock.by_farm.mockResolvedValue(null);
    createAuthorizeRepoMock.create.mockResolvedValue({
      authorize_id: authorizeMock.authorize_id,
    });
  });

  it('should providers to be defined', () => {
    expect(service).toBeDefined();
    expect(findAuthorizeRepoMock).toBeDefined();

    expect(createAuthorizeRepoMock).toBeDefined();
  });

  it('shoul be service to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(service, 'start');

    await service.start(createAuthorizeMock);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createAuthorizeMock);
  });

  // // Test FindAuthorizeRepo

  it('should be FindAuthorizeRepo.by_farm to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(findAuthorizeRepoMock, 'by_farm');

    await service.start(createAuthorizeMock);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createAuthorizeMock.farm_id);
  });

  it('should be throw a AuthorizedAlreadExist if findAuthorizerepo return a data', async () => {
    findAuthorizeRepoMock.by_farm.mockResolvedValueOnce(authorizeMock);

    const response = service.start(createAuthorizeMock);

    await expect(response).rejects.toThrow(new AlreadyExistsError('Authorize'));
  });

  it('shoul be throw a QUERY ERROR if FindAuthorizeRepo.by_farm throw error', async () => {
    findAuthorizeRepoMock.by_farm.mockRejectedValueOnce(
      new Error('QUERY ERROR'),
    );

    const response = service.start(createAuthorizeMock);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // // Tests Create Authorize

  it('should be create Authorize to have been called once time and with data valids', async () => {
    const spy = jest.spyOn(createAuthorizeRepoMock, 'create');

    await service.start(createAuthorizeMock);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createAuthorizeMock);
  });

  it('should be throw a QUERY ERROR if createAuthorize throw error', async () => {
    createAuthorizeRepoMock.create.mockRejectedValueOnce(
      new Error('QUERY ERROR'),
    );

    const response = service.start(createAuthorizeMock);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  it('should be throw a error if createAuthorize return null', async () => {
    createAuthorizeRepoMock.create.mockResolvedValueOnce(null);

    const response = service.start(createAuthorizeMock);

    await expect(response).rejects.toThrow(new NotCreatedError('Authorize'));
  });

  it('should be have a new authorize in db', async () => {
    const response = await service.start(createAuthorizeMock);

    expect(response).toHaveProperty('status', 'Sucess');
    expect(response).toHaveProperty('authorize_id', authorizeMock.authorize_id);
  });
});
