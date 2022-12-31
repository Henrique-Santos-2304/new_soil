import { FarmModel, UserModel } from '@root/domain';
import { ExcludeUserToFarmPropsResponse } from '../../utils/exclude-user-of-farm';

type ExcludeUserOfAllFarmsProps = {
  user_id: UserModel['user_id'];
  farms: FarmModel[];
};

type UpdateFarmProps = {
  farm_id: FarmModel['farm_id'];
  response: ExcludeUserToFarmPropsResponse;
};

type HandleTypeUserAndCallSpecificActionProps = {
  user_id: UserModel['user_id'];
  farms: FarmModel[];
  userType: UserModel['userType'];
};

export {
  ExcludeUserOfAllFarmsProps,
  UpdateFarmProps,
  HandleTypeUserAndCallSpecificActionProps,
};
