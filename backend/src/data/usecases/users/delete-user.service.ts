import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import {
  FarmModel,
  IDeleteUserRepo,
  IDeleteUserService,
  IFindFarmsRepo,
  IGetUserByIdService,
  IUpdateFarmRepo,
} from '@root/domain';
import { FARM_REPO, USER_REPO, USER_SERVICE } from '@root/shared';
import { excludeUserOfFarm } from '../utils/exclude-user-of-farm';
import {
  ExcludeUserOfAllFarmsProps,
  HandleTypeUserAndCallSpecificActionProps,
} from './props/delete-user';

@Injectable()
class DeleteUserService implements IDeleteUserService {
  constructor(
    @Inject(USER_SERVICE.FIND_BY_ID)
    private readonly findUserByIdService: IGetUserByIdService,
    @Inject(USER_REPO.DELETE) private readonly deleteUserRepo: IDeleteUserRepo,
    @Inject(FARM_REPO.FIND) private readonly findFarmRepo: IFindFarmsRepo,
    @Inject(FARM_REPO.UPDATE) private readonly updateFarmRepo: IUpdateFarmRepo,
    private readonly logger: Logger,
  ) {}

  async getFarmWhereUserExist(
    user_id: FarmModel['farm_id'],
  ): Promise<FarmModel[]> {
    return await this.findFarmRepo.by_role({ user_id });
  }

  async excludeUserOfAllFarms({
    user_id,
    farms,
  }: ExcludeUserOfAllFarmsProps): Promise<void> {
    if (farms && farms.length > 0) {
      for (const farm of farms) {
        const response = await excludeUserOfFarm({ farm, user_id });
        await this.updateFarmRepo.addOrDeleteUser({
          farm_id: farm.farm_id,
          data: {
            ...response,
          },
        });
      }
    }
  }

  logNotDeleteUser(): void {
    this.logger.warn(
      'Does not possible delete user. User exists in other farms',
    );
  }

  async handleTypeUserAndCallSpecificAction({
    userType,
    user_id,
    farms,
  }: HandleTypeUserAndCallSpecificActionProps): Promise<void> {
    if (userType === 'USER') throw new UnauthorizedException();
    if (userType === 'MASTER') {
      await this.excludeUserOfAllFarms({ user_id, farms });
    } else {
      if (farms && farms.length > 0) this.logNotDeleteUser();
    }
  }

  async start({
    user_id,
    auth,
  }: IDeleteUserService.Params): IDeleteUserService.Response {
    await this.findUserByIdService.start({ user_id });
    const farms = await this.getFarmWhereUserExist(user_id);
    await this.handleTypeUserAndCallSpecificAction({
      user_id,
      userType: auth.userType,
      farms,
    });
    await this.deleteUserRepo.by_id({ user_id });
  }
}

export { DeleteUserService };
