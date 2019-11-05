import { config } from 'config';
import BaseAPI from 'api/BaseAPI';

export default class AuthAPI extends BaseAPI {
  forgot(data) {
    return super.postRequest(config.apiURL.forgot, data);
  }

  login(data) {
    return super.postRequest(config.apiURL.login, data);
  }

  register(data) {
    return super.postRequest(config.apiURL.register, data, ['OK', 'DUPLICATE']);
  }

  retrieve(data) {
    return super.postRequest(config.apiURL.retrieve, data);
  }
}
