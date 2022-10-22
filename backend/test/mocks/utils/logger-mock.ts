import { Logger } from '@nestjs/common';

const loggerMock = {
  provide: Logger,
  useValue: { log: jest.fn(), error: jest.fn(), warn: jest.fn() },
};

export { loggerMock };
