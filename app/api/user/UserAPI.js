import { config } from 'config';
import WithUserAPI from 'api/WithUserAPI/WithUserAPI';

export default class UserAPI extends WithUserAPI {
  update(data) {
    return super.withUserToken(config.apiURL.update, data);
  }

  changePassword(data) {
    return super.withUserToken(config.apiURL.changePassword, data);
  }
}
