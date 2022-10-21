import { Injectable } from '@nestjs/common';
import { IFindAllAuthorizeService } from '@root/domain/usecases/authorize/find-all-authorize-service.domain';

@Injectable()
class FindAuthorizeService implements IFindAllAuthorizeService {
  start(): IFindAllAuthorizeService.Response {
    throw new Error('Method not implemented.');
  }
}

export { FindAuthorizeService };
