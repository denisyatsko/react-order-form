import { config } from 'config';
import WithUserAPI from 'api/WithUserAPI/WithUserAPI';

export default class OrderAPI extends WithUserAPI {
  submit(data) {
    return super.withUserToken(config.apiURL.submit, data);
  }

  uploadFiles(data) {
    return super.withUserToken(config.apiURL.uploadFiles, data);
  }

  getOrders() {
    return super.withUserToken(config.apiURL.orders);
  }

  getOrder(data) {
    return super.withUserToken(config.apiURL.order, data);
  }

  getMessages(data) {
    return super.withUserToken(config.apiURL.getMessages, data);
  }

  sendMessageToSupport(data) {
    return super.withUserToken(config.apiURL.sendMessageToSupport, data);
  }

  sendMessageToWriter(data) {
    return super.withUserToken(config.apiURL.sendMessageToWriter, data);
  }

  getOrderFiles(data) {
    return super.withUserToken(config.apiURL.getOrderFiles, data);
  }

  markMessagesAsRead(data) {
    return super.withUserToken(config.apiURL.markMessagesAsRead, data);
  }

  feedback(data) {
    return super.withUserToken(config.apiURL.feedback, data);
  }

  revision(data) {
    return super.withUserToken(config.apiURL.revision, data);
  }

  refund(data) {
    return super.withUserToken(config.apiURL.refund, data);
  }

  getFileDownloadToken(data) {
    return super.withUserToken(config.apiURL.getFileDownloadToken, data);
  }

  checkWriter(data) {
    return super.withUserToken(config.apiURL.checkWriter, data);
  }
}
