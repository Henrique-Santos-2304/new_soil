import { prismaTest } from '@testRoot/setup';

const getUserMasterId = async () => {
  let user = await prismaTest.user.findFirst({
    where: { login: 'soil_test' },
  });

  if (!user) {
    user = await prismaTest.user.create({
      data: {
        login: 'soil_test',
        password: 'password',
        userType: 'MASTER',
      },
    });
  }

  return user?.user_id;
};

const getUserAdminId = async () => {
  await prismaTest.user.create({
    data: {
      login: 'soil_owner',
      password: 'password',
      userType: 'ADMIN',
    },
  });
  const user = await prismaTest.user.findFirst({
    where: { login: 'soil_owner' },
  });

  return user?.user_id;
};

const getUserDelaerId = async () => {
  await prismaTest.user.create({
    data: {
      login: 'soil_dealer',
      password: 'password',
      userType: 'DEALER',
    },
  });
  const user = await prismaTest.user.findFirst({
    where: { login: 'soil_dealer' },
  });

  return user?.user_id;
};

const getUserTypeUserId = async () => {
  await prismaTest.user.create({
    data: {
      login: 'soil_user',
      password: 'password',
      userType: 'USER',
    },
  });
  const user = await prismaTest.user.findFirst({
    where: { login: 'soil_user' },
  });

  return user?.user_id;
};

export { getUserMasterId, getUserAdminId, getUserTypeUserId, getUserDelaerId };
