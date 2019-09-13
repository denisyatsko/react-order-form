import { config } from 'config';
import BaseAPI from 'api/';

export default class PaymentAPI extends BaseAPI {
  solidGate(data) {
    return super.postRequest(config.apiURL.solidgate, data);
  }
}
