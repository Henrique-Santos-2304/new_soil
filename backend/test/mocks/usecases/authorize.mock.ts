const createAuthorizeMock = {
  farm_id: ' new_farm',
  pivot_id: null,
  created_by: 'new_user',
};

const authorizeModelMock = { ...createAuthorizeMock, authorize_id: 'id' };

export { createAuthorizeMock, authorizeModelMock };
