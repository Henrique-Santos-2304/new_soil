import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IEncrypterData } from '@root/domain';
import { EncrypterData } from '../encrypter.service';
import * as bcrypt from 'bcrypt';

describe('Encrypter Service', () => {
  let encrypter: IEncrypterData;
  let logger: Logger;

  beforeEach(async () => {
    const loggerProvider = {
      provide: Logger,
      useValue: { log: jest.fn(), error: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [EncrypterData, loggerProvider],
    }).compile();

    encrypter = module.get<IEncrypterData>(EncrypterData);
    logger = module.get<Logger>(Logger);
  });

  it('should be encrypter and yours methods defined', () => {
    expect(encrypter).toBeDefined();
    expect(encrypter.compare).toBeDefined();
    expect(encrypter.encrypt).toBeDefined();
  });

  it('should be bcrypt hash to have been called with data valids', async () => {
    const spy = jest.spyOn(bcrypt, 'hash');

    await encrypter.encrypt({ value: 'encrypt' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('encrypt', 10);
  });

  it('should be to throw "ENCRYPT ERROR" and log error, if bcrypt throw an error', async () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockRejectedValueOnce(new Error('Error: bcrypt') as never);

    const response = encrypter.encrypt({ value: 'encrypt' });
    await expect(response).rejects.toThrow('ENCRYPT ERROR');

    await expect(logger.error).toHaveBeenCalledTimes(1);
    await expect(logger.error).toHaveBeenCalledWith('Error: bcrypt');
  });

  it('should be return a hash, if bcrypt to encrypted password with sucess', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('Encrypted_hash' as never);

    const response = await encrypter.encrypt({ value: 'encrypt' });
    await expect(response).toEqual('Encrypted_hash');
  });

  // Compare Hash

  it('should be bcrypt compare to have been called with data valids', async () => {
    const spy = jest.spyOn(bcrypt, 'compare');

    await encrypter.compare({ old_value: 'hash', valueCompare: 'pass' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('pass', 'hash');
  });

  it('should be to throw "ENCRYPT ERROR" and log error, if bcrypt throw an error', async () => {
    jest
      .spyOn(bcrypt, 'compare')
      .mockRejectedValueOnce(new Error('Error: bcrypt') as never);

    const response = encrypter.compare({
      old_value: 'hash',
      valueCompare: 'pass',
    });
    await expect(response).rejects.toThrow('ENCRYPT ERROR');

    await expect(logger.error).toHaveBeenCalledTimes(1);
    await expect(logger.error).toHaveBeenCalledWith('Error: bcrypt');
  });

  it('should be false if pass is diferent of hash', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

    const response = await encrypter.compare({
      old_value: 'hash',
      valueCompare: 'pass',
    });
    expect(response).toBeFalsy();
  });

  it('should be true if pass is diferent of hash', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

    const response = await encrypter.compare({
      old_value: 'hash',
      valueCompare: 'pass',
    });
    expect(response).toBeTruthy();
  });
});
