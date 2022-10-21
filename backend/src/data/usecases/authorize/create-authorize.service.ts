import { CreateAuthorizeDto, ICreateAuthorizeService } from '@contracts/index';

class CreateAuthorizeService implements ICreateAuthorizeService {
  async start(authorize: CreateAuthorizeDto): ICreateAuthorizeService.Response {
    return { status: 'Sucess', authorize_id: '' };
  }
}

export { CreateAuthorizeService };
