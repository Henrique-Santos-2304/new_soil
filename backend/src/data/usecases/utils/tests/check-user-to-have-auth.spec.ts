import { UnauthorizedException } from '@nestjs/common';
import { createFarmMocked } from '@testRoot/index';
import { checkUserToHaveAuthorize } from '../check-user-to-have-auth';

describe('Check function User To Have Authorize Into farm', () => {
  it('should be to throw Unauthorized error if user not delaer, admins, owner or MASTER', async () => {
    const response = checkUserToHaveAuthorize({
      farm: { ...createFarmMocked },
      user: { user_id: 'test', userType: 'USER' },
    });

    await expect(response).rejects.toThrow(new UnauthorizedException());
  });

  it('should be pass function return void if user to type dealer', async () => {
    const response = await checkUserToHaveAuthorize({
      farm: { ...createFarmMocked, dealers: ['test'] },
      user: { user_id: 'test', userType: 'USER' },
    });

    expect(response).toBeUndefined();
  });

  it('should be pass function return void if user to type admins', async () => {
    const response = await checkUserToHaveAuthorize({
      farm: { ...createFarmMocked, admins: ['test'] },
      user: { user_id: 'test', userType: 'USER' },
    });

    expect(response).toBeUndefined();
  });

  it('should be pass function return void if user to type owner', async () => {
    const response = await checkUserToHaveAuthorize({
      farm: { ...createFarmMocked, owner_id: 'test' },
      user: { user_id: 'test', userType: 'USER' },
    });

    expect(response).toBeUndefined();
  });

  it('should be pass function return void if user to type MASTER', async () => {
    const response = await checkUserToHaveAuthorize({
      farm: { ...createFarmMocked },
      user: { user_id: 'test', userType: 'MASTER' },
    });

    expect(response).toBeUndefined();
  });
});
