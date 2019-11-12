import { config } from 'config';
import UserAPI from 'api/user/UserAPI';

export default class AuthAPI extends UserAPI {
  constructor() {
    super();
  }

  forgot(data) {
    return super.postRequest(config.apiURL.forgot, data);
  }

  login(data) {
    return super.postRequest(config.apiURL.login, data);
  }

  register(data) {
    return super.postRequest(config.apiURL.register, data, ['OK', 'DUPLICATE']);
  }

  retrieve() {
    return super.postRequest(config.apiURL.retrieve);
  }
}
