import BaseAPI from 'api/BaseAPI';
import { AuthController } from 'core/export';

export default class WithUserAPI extends BaseAPI {
  constructor() {
    super();
    this.TOKEN = { 'User-Token': new AuthController().getToken() };
  }

  withUserToken(URL, data) {
    return super.postRequest(
      URL,
      data,
      undefined,
      this.TOKEN,
    );
  }
}
