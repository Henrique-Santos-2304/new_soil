import * as bcrypt from "bcrypt"
import { IEncrypterData, NCompare, NEncrypt } from '@root/domain';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
class EncrypterData implements IEncrypterData{
  private readonly salt = 10;

  constructor(private readonly logger: Logger){}

  async encrypt({ value }: NEncrypt.Params<string>): NEncrypt.Response {
    try {
      const hash = await bcrypt.hash(value, this.salt);
      return hash;
    } catch (err) {
      const error = err as Error;

      this.logger.log('ERROR WHEN ENCRYPT PASSWORD');
      this.logger.error(error.message);
      throw new Error('ENCRYPT ERROR') ;
    }
  }

  async compare({ old_value, valueCompare }: NCompare.Params<string>): NCompare.Response {
    try {
      return await bcrypt.compare(valueCompare, old_value);
    } catch (err) {
      const error = err as Error;

      this.logger.log('ERROR WHEN COMPARE PASSWORD');
      this.logger.error(error.message);
      throw new Error('ENCRYPT ERROR')
    }
  }
  
}

export {EncrypterData}