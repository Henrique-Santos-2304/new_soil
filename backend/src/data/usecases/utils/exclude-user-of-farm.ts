import { FarmModel, UserModel } from '@root/domain';

type propsFuncParams = {
  farm: FarmModel;
  user_id: UserModel['user_id'];
};

export type ExcludeUserToFarmPropsResponse =
  | Pick<FarmModel, 'admins'>
  | Pick<FarmModel, 'dealers'>
  | Pick<FarmModel, 'users'>;

const excludeUserOfFarm = async ({
  farm,
  user_id,
}: propsFuncParams): Promise<ExcludeUserToFarmPropsResponse> => {
  const toHaveIntoAdmins = farm.admins.some((id) => id === user_id);
  const toHaveIntoDelaers = farm.dealers.some((id) => id === user_id);
  const toHaveIntoUsers = farm.users.some((id) => id === user_id);

  if (toHaveIntoAdmins) {
    const admins = farm.admins.filter((id) => id !== user_id);
    return { admins };
  } else if (toHaveIntoDelaers) {
    const dealers = farm.dealers.filter((id) => id !== user_id);
    return { dealers };
  } else if (toHaveIntoUsers) {
    const users = farm.users.filter((id) => id !== user_id);
    return { users };
  }
};

export { excludeUserOfFarm };
