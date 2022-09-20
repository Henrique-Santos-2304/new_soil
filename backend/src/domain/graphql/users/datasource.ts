import { RESTDataSource } from 'apollo-datasource-rest';

export class UserDataSource extends RESTDataSource {
  constructor() {
    super();
  }

  async handleResponse({ status, token }: { status: string; token: string }) {
    if (status === 'Sucess' && token) {
      this.context.res.cookie('soil_token', token, {
        // secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // path: '/',
        // sameSite: 'strict',
      });
    }
    return { status, token };
  }
}
