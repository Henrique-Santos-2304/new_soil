import { UnauthorizedException } from '@nestjs/common';
import { FarmModel, UserModel } from '@root/domain';

type propsCheckUser = {
  farm: FarmModel;
  user: Pick<UserModel, 'userType' | 'user_id'>;
};

async function checkUserToHaveAuthorize({
  farm,
  user: { userType, user_id },
}: propsCheckUser) {
  const userIsMaster = userType === 'MASTER';
  const userIsOwner = farm.owner_id === user_id;
  const userIsDealer =
    farm && farm.dealers.some((dealer) => dealer === user_id);
  const userIsAdmin = farm && farm.admins.some((admin) => admin === user_id);

  if (!userIsMaster && !userIsOwner && !userIsDealer && !userIsAdmin) {
    throw new UnauthorizedException();
  }
}

export { checkUserToHaveAuthorize };
