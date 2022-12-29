import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IAuthUserService } from '@contracts/index';
import { AuthUserService } from '../auth-user.service';
import {
  encrypterMock,
  encrypterMockProvider,
  loggerMockProvider,
  tokenMock,
  tokenMockProvider,
  findUserRepoMock,
  findUserRepoMockProvider,
  prismaProviderMock,
  userModelMocked,
} from '@testRoot/mocks';

describe('Auth User Service Unit', () => {
  const loginUser = { login: 'soil', password: '1234' };
  let service: IAuthUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthUserService,
        findUserRepoMockProvider,
        loggerMockProvider,
        encrypterMockProvider,
        tokenMockProvider,
        prismaProviderMock,
      ],
    }).compile();

    service = module.get<IAuthUserService>(AuthUserService);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { login, ...rest } = userModelMocked;
    findUserRepoMock.without_login.mockResolvedValue(rest);
    tokenMock.generate.mockResolvedValue({ token: 'tokenValid' });
    encrypterMock.compare.mockResolvedValue(true);
  });

  // Test findUserRepoMockProvider.without_login to have been called with data valids

  it('should findUserRepo.without_login to have been called with data valids', async () => {
    const spy = jest.spyOn(findUserRepoMock, 'without_login');

    await service.start(loginUser);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ login: loginUser.login });
  });

  // Test service to throw if findUserRepo.with_login ocurred an error
  it('should service to throw if findUserRepo.with_login ocurred an error', async () => {
    findUserRepoMock.without_login.mockRejectedValueOnce(
      new Error('QUERY ERROR'),
    );

    const response = service.start(loginUser);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Test service to throw "Invalid Credentials" if findUserRepo.with_login not find user
  it('should service to throw if findUserRepo.with_login ocurred an error', async () => {
    findUserRepoMock.without_login.mockResolvedValueOnce(null);

    const response = service.start(loginUser);

    await expect(response).rejects.toThrow(new UnauthorizedException().message);
  });

  // Test encrypt.compare to have been called with data valids
  it('should encrypt.compare to have been called with data valids', async () => {
    const spy = jest.spyOn(encrypterMock, 'compare');
    await service.start(loginUser);

    expect(spy).toBeCalledTimes(1);

    expect(spy).toHaveBeenCalledWith({
      old_value: userModelMocked.password,
      valueCompare: loginUser.password,
    });
  });

  // Test service to throw "ENCRYP ERROR" if ocurred an error in encrypt.compare
  it('should service to throw "ENCRYPT ERROR" if ocurred an error in encrypt.compare', async () => {
    encrypterMock.compare.mockRejectedValueOnce(new Error('ENCRYPT ERROR'));

    const response = service.start(loginUser);

    await expect(response).rejects.toThrow('ENCRYPT ERROR');
  });

  // Test service to throw "Invalid Credentials" if password not valid
  it('should service to throw "Invalid Credentials" if password not valid', async () => {
    encrypterMock.compare.mockResolvedValueOnce(false);

    const response = service.start(loginUser);

    await expect(response).rejects.toThrow(new UnauthorizedException().message);
  });

  //  Tests Jwt Token to have been called with data valids
  it('should Jwt Token to have been called with data valids', async () => {
    const spy = jest.spyOn(tokenMock, 'generate');
    await service.start(loginUser);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      user_id: userModelMocked.user_id,
      userType: userModelMocked.userType,
    });
  });

  // Test service to throw "JWT TOKEN ERROR" if ocurred erro in at generated token

  it('should service to Throw if ocurred error in at generated Jwt Token', async () => {
    tokenMock.generate.mockRejectedValueOnce(new Error('TOKEN ERROR'));
    const response = service.start(loginUser);
    await expect(response).rejects.toThrow('TOKEN ERROR');
  });

  it('should service to Throw "TOKEN NOT PROVIDED" if Token return null', async () => {
    tokenMock.generate.mockResolvedValueOnce(null);
    const response = service.start(loginUser);
    await expect(response).rejects.toThrow('TOKEN DOES NOT PROVIDED');
  });

  // Test service return the data expected { status, token }
  it('should service return the data expected { status, token }', async () => {
    const response = await service.start(loginUser);
    expect(response).toHaveProperty('status', 'Sucess');
    expect(response).toHaveProperty('token', 'tokenValid');
  });
});
