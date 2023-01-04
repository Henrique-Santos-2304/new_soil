import { createFarmMocked } from '@testRoot/index';
import { excludeUserOfFarm } from '../exclude-user-of-farm';

describe('Function Exclude user the tables admins, dealers, users  of farms', () => {
  it('should be return admins without this user', async () => {
    const response = await excludeUserOfFarm({
      farm: { ...createFarmMocked, admins: ['test'] },
      user_id: 'test',
    });

    expect(response).toHaveProperty('admins', []);
  });

  it('should be return dealers without this user', async () => {
    const response = await excludeUserOfFarm({
      farm: { ...createFarmMocked, dealers: ['test'] },
      user_id: 'test',
    });

    expect(response).toHaveProperty('dealers', []);
  });

  it('should be return users without this user', async () => {
    const response = await excludeUserOfFarm({
      farm: { ...createFarmMocked, users: ['test'] },
      user_id: 'test',
    });

    expect(response).toHaveProperty('users', []);
  });

  it('should be not return', async () => {
    const response = await excludeUserOfFarm({
      farm: { ...createFarmMocked },
      user_id: 'test',
    });

    expect(response).toBeUndefined();
  });
});
