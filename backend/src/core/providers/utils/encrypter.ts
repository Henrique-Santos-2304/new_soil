import { Provider } from '@nestjs/common';
import { EncrypterData } from '@root/data';
import { VALIDATORS_SERVICE } from '@root/shared';

const encrypterProvider: Provider = {
  provide: VALIDATORS_SERVICE.ENCRYPTER,
  useClass: EncrypterData,
};

export { encrypterProvider };
