import { Inject, Injectable } from '@nestjs/common';
import { AuthorizeModel, IFindAuthorizeRepo } from '@root/domain';
import { IFindAllAuthorizeService } from '@root/domain/usecases/authorize/find-all-authorize-service.domain';
import { AUTHORIZE_REPO } from '@root/shared';

@Injectable()
class FindAuthorizeService implements IFindAllAuthorizeService {
  constructor(
    @Inject(AUTHORIZE_REPO.FIND)
    private readonly findAuthorizes: IFindAuthorizeRepo,
  ) {}

  async findAllAuthorizes(): Promise<AuthorizeModel[]> {
    return await this.findAuthorizes.all();
  }

  async start(): IFindAllAuthorizeService.Response {
    const authorize = await this.findAllAuthorizes();

    return { status: 'Sucess', authorize };
  }
}

export { FindAuthorizeService };
