import { config } from 'config';
import WithUserAPI from 'api/WithUserAPI/WithUserAPI';

export default class PaymentAPI extends WithUserAPI {
  solidGate(data) {
    return super.withUserToken(config.apiURL.solidgate, data);
  }
}
