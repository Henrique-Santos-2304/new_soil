import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IGenerateUserToken, ITokenService } from '@root/domain';
import { TokenService } from '../token.service';
import * as jwt from 'jsonwebtoken';

describe('Encrypter Service', () => {
  let token: ITokenService;
  let logger: Logger;

  const secret = process.env.TOKEN_SECRET;
  const expiresIn = '150h';
  const data: IGenerateUserToken.Params = { user_id: 'id', userType: 'SUDO' };

  beforeEach(async () => {
    const loggerProvider = {
      provide: Logger,
      useValue: { log: jest.fn(), error: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService, loggerProvider],
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
    const spy = jest.spyOn(jwt, 'sign');

    await token.generate(data);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(data, secret as jwt.Secret, { expiresIn });
  });

  it('should be to throw "TOKEN ERROR" and log error, if bcrypt throw an error', async () => {
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error('Error: Jwt Error');
    });

    const response = token.generate(data);
    await expect(response).rejects.toThrow('TOKEN ERROR');

    await expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it('should be return a token', async () => {
    jest.spyOn(jwt, 'sign').mockReturnValueOnce('token' as never);

    const response = await token.generate(data);
    await expect(response).toHaveProperty('token', 'token');
  });

  // // check Is valid Token
  it('should be token checkIsValid to have been called with data valids', async () => {
    const spy = jest.spyOn(jwt, 'verify').mockReturnValueOnce('token' as never);

    await token.checkIsValid({ token: 'token' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('token', secret as jwt.Secret);
  });

  it('should be to throw "TOKEN ERROR" and log error, if checkIsValid token throw an error', async () => {
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error('Error: Jwt Error');
    });

    const response = token.checkIsValid({ token: 'token' });
    await expect(response).rejects.toThrow('TOKEN ERROR');

    await expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it('should be not return a token if token is inválid', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce(undefined as never);

    const response = token.checkIsValid({ token: 'token' });
    await expect(response).rejects.toThrow('TOKEN ERROR');
  });

  it('should be return true if token is válid', async () => {
    jest.spyOn(jwt, 'verify').mockReturnValueOnce('token valid' as never);

    const response = token.checkIsValid({ token: 'token' });
    await expect(response).toBeTruthy();
  });
});
