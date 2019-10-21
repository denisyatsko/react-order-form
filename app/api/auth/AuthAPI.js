import { config } from 'config';
import BaseAPI from 'api/BaseAPI';

export default class AuthAPI extends BaseAPI {
  forgot(data) {
    return super.postRequest(config.apiURL.forgot, data);
  }

  login(data) {
    return super.postRequest(config.apiURL.login, data, 'DUPLICATE');
  }

  register(data) {
    return super.postRequest(config.apiURL.register, data, 'DUPLICATE');
  }

  retrieve(data) {
    return super.postRequest(config.apiURL.retrieve, data);
  }
}
