import {
  CreateAuthorizeDto,
  ICreateAuthorizeRepo,
  ICreateAuthorizeService,
  IFindAuthorizeRepo,
} from '@contracts/index';
import { Inject } from '@nestjs/common';
import { AUTHORIZE_REPO } from '@root/shared';
import { AlreadyExistsError, NotCreatedError } from '@root/shared/errors';

class CreateAuthorizeService implements ICreateAuthorizeService {
  constructor(
    @Inject(AUTHORIZE_REPO.FIND)
    private readonly findAuthorizeRepo: IFindAuthorizeRepo,
    @Inject(AUTHORIZE_REPO.CREATE)
    private readonly createAuthorizeRepo: ICreateAuthorizeRepo,
  ) {}

  async checkAuthorizeofFarmAlreadExist(farm_id: string): Promise<void> {
    const authorizeExists = await this.findAuthorizeRepo.by_farm(farm_id!);
    if (authorizeExists) throw new AlreadyExistsError('Authorize');
  }

  async createNewAuthorizeInDb(authorize: CreateAuthorizeDto): Promise<string> {
    const createAuthorize = await this.createAuthorizeRepo.create(authorize);

    if (!createAuthorize) throw new NotCreatedError('Authorize');

    return createAuthorize.authorize_id;
  }

  async start(authorize: CreateAuthorizeDto): ICreateAuthorizeService.Response {
    await this.checkAuthorizeofFarmAlreadExist(authorize.farm_id);
    const authorize_id = await this.createNewAuthorizeInDb(authorize);

    return { status: 'Sucess', authorize_id };
  }
}

export { CreateAuthorizeService };
