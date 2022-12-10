import { INestApplication } from '@nestjs/common';
import { integrationTestManager } from '@testRoot/index';

describe('Update Farm Integration', () => {
  let app: INestApplication;
  let token: string;
  let user_id: string;
  let simple_user_id: string;

  beforeAll(async () => {
    app = integrationTestManager.getApp();
    token = (await integrationTestManager.authUser()).token;

    user_id = (await integrationTestManager.getUserId()).user_id;
    simple_user_id = (await integrationTestManager.getSimpleUserId()).user_id;
  });
});
