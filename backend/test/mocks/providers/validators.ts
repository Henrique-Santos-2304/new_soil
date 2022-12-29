import { Logger, Provider } from '@nestjs/common';
import { IEncrypterData, ITokenService } from '@root/domain';
import { VALIDATORS_SERVICE } from '@root/shared';
import { mock, MockProxy } from 'jest-mock-extended';

const encrypterMock: MockProxy<IEncrypterData> = mock();
const tokenMock: MockProxy<ITokenService> = mock();
const loggerMock: Logger = mock();

const encrypterMockProvider: Provider = {
  provide: VALIDATORS_SERVICE.ENCRYPTER,
  useValue: encrypterMock,
};

const tokenMockProvider: Provider = {
  provide: VALIDATORS_SERVICE.TOKEN,
  useValue: tokenMock,
};

const loggerMockProvider: Provider = {
  provide: Logger,
  useValue: loggerMock,
};

export {
  encrypterMockProvider,
  tokenMockProvider,
  loggerMockProvider,
  encrypterMock,
  tokenMock,
  loggerMock,
};
