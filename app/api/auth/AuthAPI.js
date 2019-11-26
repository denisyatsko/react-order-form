import { config } from 'config';
import WithUserAPI from 'api/WithUserAPI/WithUserAPI';

export default class AuthAPI extends WithUserAPI {
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
    return super.withUserToken(config.apiURL.retrieve);
  }
}
