import { config } from 'config';
import BaseAPI from 'api/BaseAPI';
import { AuthController } from 'core/export';
import { routes } from 'instruments/export';

export default class UserAPI extends BaseAPI {
  constructor() {
    super();
    this.TOKEN = new AuthController().getToken();
  }

  // retrieve() {
  //   if (this.TOKEN) {
  //     console.log('1')
  //     return super.postRequest(config.apiURL.retrieve);
  //   } else {
  //     alert('to login');
  //     window.location.replace(`#${routes.LOGIN}`);
  //     // return super.postRequest(config.apiURL.retrieve);
  //   }
  // }

  getHeader() {
    return {
      'User-Token': this.TOKEN,
    }
  }
}
