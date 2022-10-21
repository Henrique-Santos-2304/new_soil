import { Inject, Injectable } from '@nestjs/common';
import { AuthorizeModel, IFindAuthorizeRepo } from '@root/domain';
import { IFindAllAuthorizeService } from '@root/domain/usecases/authorize/find-all-authorize-service.domain';

@Injectable()
class FindAuthorizeService implements IFindAllAuthorizeService {
  constructor(
    @Inject('IFindAuthorizeRepo')
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
