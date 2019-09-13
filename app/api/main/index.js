import { config } from 'config';
import BaseAPI from 'api/';

export default class MainAPI extends BaseAPI {
  getOrderFormSetup() {
    return super.getRequest(config.apiURL.formValues);
  }
}
