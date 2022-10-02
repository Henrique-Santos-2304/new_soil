import { Provider } from '@nestjs/common';
import { EncrypterData } from '@root/data';

const encrypterProvider: Provider = {
  provide: 'IEncrypterData',
  useClass: EncrypterData,
};

export { encrypterProvider };
