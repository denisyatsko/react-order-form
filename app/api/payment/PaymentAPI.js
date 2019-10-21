import { config } from 'config';
import BaseAPI from 'api/BaseAPI';

export default class PaymentAPI extends BaseAPI {
  solidGate(data) {
    return super.postRequest(config.apiURL.solidgate, data);
  }
}
