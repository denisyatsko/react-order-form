import { config } from 'config';
import BaseAPI from 'api/BaseAPI';

export default class OrderAPI extends BaseAPI {
  submit(data) {
    return super.postRequest(config.apiURL.submit, data);
  }

  uploadFiles(data) {
    return super.postRequest(config.apiURL.uploadFiles, data);
  }

  getOrders() {
    return super.postRequest(config.apiURL.orders);
  }

  getOrder(data) {
    return super.postRequest(config.apiURL.order, data);
  }

  getMessages(data) {
    return super.postRequest(config.apiURL.getMessages, data);
  }

  sendMessageToSupport(data) {
    return super.postRequest(config.apiURL.sendMessageToSupport, data);
  }

  sendMessageToWriter(data) {
    return super.postRequest(config.apiURL.sendMessageToWriter, data);
  }

  getOrderFiles(data) {
    return super.postRequest(config.apiURL.getOrderFiles, data);
  }
}
