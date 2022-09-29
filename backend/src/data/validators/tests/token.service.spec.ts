import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { IGenerateUserToken, ITokenService } from '@root/domain';
import { mock, MockProxy } from 'jest-mock-extended';
import { TokenService } from '../auth';

describe('Token Jwt Service', () => {
  let token: ITokenService;
  let logger: Logger;
  let jwt: MockProxy<JwtService>;

  const data: IGenerateUserToken.Params = { user_id: 'id', userType: 'MASTER' };

  beforeEach(async () => {
    jwt = mock();
    const loggerProvider = {
      provide: Logger,
      useValue: { log: jest.fn(), error: jest.fn() },
    };

    const jwtLibProvider = {
      provide: JwtService,
      useValue: jwt,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService, loggerProvider, jwtLibProvider],
    }).compile();

    token = module.get<ITokenService>(TokenService);
    logger = module.get<Logger>(Logger);
  });

  it('should be token service and yours methods defined', () => {
    expect(token).toBeDefined();
    expect(token.generate).toBeDefined();
    expect(token.checkIsValid).toBeDefined();
  });

  it('should be token generate to have been called with data valids', async () => {
    const spy = jest.spyOn(jwt, 'signAsync');

    await token.generate(data);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(data);
  });

  it('should be to throw "TOKEN ERROR" and log error, if bcrypt throw an error', async () => {
    jest
      .spyOn(jwt, 'signAsync')
      .mockRejectedValueOnce(new Error('Error: Jwt Error'));

    const response = token.generate(data);
    await expect(response).rejects.toThrow('TOKEN ERROR');

    await expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it('should be return a token', async () => {
    jest.spyOn(jwt, 'signAsync').mockResolvedValueOnce('token');

    const response = await token.generate(data);
    await expect(response).toHaveProperty('token', 'token');
  });

  // // check Is valid Token
  it('should be token checkIsValid to have been called with data valids', async () => {
    const spy = jest
      .spyOn(jwt, 'verifyAsync')
      .mockResolvedValueOnce('token' as any);

    await token.checkIsValid({ token: 'token' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('token');
  });

  it('should be to throw "TOKEN ERROR" and log error, if checkIsValid token throw an error', async () => {
    jest
      .spyOn(jwt, 'verifyAsync')
      .mockRejectedValueOnce(new Error('Error: Jwt Error'));

    const response = token.checkIsValid({ token: 'token' });
    await expect(response).rejects.toThrow('TOKEN ERROR');

    await expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it('should be not return a token if token is inválid', async () => {
    jest.spyOn(jwt, 'verifyAsync').mockResolvedValueOnce(undefined);

    const response = token.checkIsValid({ token: 'token' });
    await expect(response).rejects.toThrow('TOKEN ERROR');
  });

  it('should be return true if token is válid', async () => {
    jest.spyOn(jwt, 'verifyAsync').mockResolvedValueOnce('token valid' as any);

    const response = token.checkIsValid({ token: 'token' });
    await expect(response).toBeTruthy();
  });
});
