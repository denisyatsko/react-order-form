import { config } from 'config';
import BaseAPI from 'api/';

export default class OrderAPI extends BaseAPI {
  submit(data) {
    return super.postRequest(config.apiURL.submit, data);
  }

  uploadFiles(data) {
    return super.postRequest(config.apiURL.uploadFiles, data);
  }
}
