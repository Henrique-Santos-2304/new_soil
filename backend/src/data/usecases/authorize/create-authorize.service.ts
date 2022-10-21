import {
  CreateAuthorizeDto,
  ICreateAuthorizeRepo,
  ICreateAuthorizeService,
  IFindAuthorizeRepo,
} from '@contracts/index';
import { Inject } from '@nestjs/common';

class CreateAuthorizeService implements ICreateAuthorizeService {
  constructor(
    @Inject('IFindAuthorizeRepo')
    private readonly findAuthorizeRepo: IFindAuthorizeRepo,
    @Inject('ICreateAuthorizeRepo')
    private readonly createAuthorizeRepo: ICreateAuthorizeRepo,
  ) {}

  async start(authorize: CreateAuthorizeDto): ICreateAuthorizeService.Response {
    const authorizeExists = await this.findAuthorizeRepo.by_farm(
      authorize.farm_id!,
    );
    if (authorizeExists) throw new Error('Authorize Already Exists');

    const createAuthorize = await this.createAuthorizeRepo.create(authorize);

    if (!createAuthorize)
      throw new Error('Does not possible to create a new farm');

    return { status: 'Sucess', authorize_id: createAuthorize.authorize_id };
  }
}

export { CreateAuthorizeService };
