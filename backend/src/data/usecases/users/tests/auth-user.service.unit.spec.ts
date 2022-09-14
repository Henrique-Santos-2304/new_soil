import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@root/core';
import { IEncrypterData, IFindUserRepo } from '@root/domain';
import { IAuthUserService } from '@root/domain/usecases/users/auth-user.service.domain';
import { ITokenService } from '@root/domain/validators/token.domain';
import { userModelMocked } from '@testRoot/mocks';
import { mock, MockProxy } from 'jest-mock-extended';
import { AuthUserService } from '../auth-user.service';

describe('UserService', () => {
  const loginUser = { login: 'soil', password: '1234' };
  let service: IAuthUserService;
  let findUserRepo: MockProxy<IFindUserRepo>;
  let encrypter: MockProxy<IEncrypterData>;
  let token: MockProxy<ITokenService>;
  let logger: MockProxy<Logger>;

  beforeEach(async () => {
    findUserRepo = mock();
    logger = mock();
    encrypter = mock();
    token = mock();

    const findProvider = { provide: 'IFindUserRepo', useValue: findUserRepo };
    const loggerProvider = { provide: Logger, useValue: logger };
    const tokenProvider = { provide: 'ITokenService', useValue: token };

    const encrypterProvider = {
      provide: 'IEncrypterData',
      useValue: encrypter,
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        AuthUserService,
        findProvider,
        loggerProvider,
        encrypterProvider,
        tokenProvider,
      ],
    }).compile();

    service = module.get<IAuthUserService>(AuthUserService);

    const { login, ...rest } = userModelMocked;
    findUserRepo.without_login.mockResolvedValue(rest);
    token.generate.mockResolvedValue({ token: 'tokenValid' });
    encrypter.compare.mockResolvedValue(true);
  });

  // Test findUserRepo.without_login to have been called with data valids

  it('should findUserRepo.without_login to have been called with data valids', async () => {
    const spy = jest.spyOn(findUserRepo, 'without_login');

    await service.start(loginUser);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ login: loginUser.login });
  });

  // Test service to throw if findUserRepo.with_login ocurred an error
  it('should service to throw if findUserRepo.with_login ocurred an error', async () => {
    findUserRepo.without_login.mockRejectedValueOnce(new Error('QUERY ERROR'));

    const response = service.start(loginUser);

    await expect(response).rejects.toThrow('QUERY ERROR');
  });

  // Test service to throw "Invalid Credentials" if findUserRepo.with_login not find user
  it('should service to throw if findUserRepo.with_login ocurred an error', async () => {
    findUserRepo.without_login.mockResolvedValueOnce(null);

    const response = service.start(loginUser);

    await expect(response).rejects.toThrow('Invalid Credentials');
  });

  // Test encrypt.compare to have been called with data valids
  it('should encrypt.compare to have been called with data valids', async () => {
    const spy = jest.spyOn(encrypter, 'compare');
    await service.start(loginUser);

    expect(spy).toBeCalledTimes(1);

    expect(spy).toHaveBeenCalledWith({
      old_value: userModelMocked.password,
      valueCompare: loginUser.password,
    });
  });

  // Test service to throw "ENCRYP ERROR" if ocurred an error in encrypt.compare
  it('should service to throw "ENCRYPT ERROR" if ocurred an error in encrypt.compare', async () => {
    encrypter.compare.mockRejectedValueOnce(new Error('ENCRYPT ERROR'));

    const response = service.start(loginUser);

    await expect(response).rejects.toThrow('ENCRYPT ERROR');
  });

  // Test service to throw "Invalid Credentials" if password not valid
  it('should service to throw "Invalid Credentials" if password not valid', async () => {
    encrypter.compare.mockResolvedValueOnce(false);

    const response = service.start(loginUser);

    await expect(response).rejects.toThrow('Invalid Credentials');
  });

  //  Tests Jwt Token to have been called with data valids
  it('should Jwt Token to have been called with data valids', async () => {
    const spy = jest.spyOn(token, 'generate');
    await service.start(loginUser);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      user_id: userModelMocked.user_id,
      userType: userModelMocked.userType,
    });
  });

  // Test service to throw "JWT TOKEN ERROR" if ocurred erro in at generated token

  it('should service to Throw if ocurred error in at generated Jwt Token', async () => {
    token.generate.mockRejectedValueOnce(new Error('TOKEN ERROR'));
    const response = service.start(loginUser);
    await expect(response).rejects.toThrow('TOKEN ERROR');
  });

  it('should service to Throw "TOKEN NOT PROVIDED" if Token return null', async () => {
    token.generate.mockResolvedValueOnce(null);
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
