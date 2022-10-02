import { ICreateFarmController } from '@contracts/index';
import { Injectable } from '@nestjs/common';
import { Args, Mutation } from '@nestjs/graphql';

@Injectable()
class CreateFarmResolver implements ICreateFarmController {
  @Mutation()
  async createFarm(
    @Args('data') farm: ICreateFarmController.Params,
  ): ICreateFarmController.Response {
    throw new Error('Method not implemented.');
  }
}

export { CreateFarmResolver };
