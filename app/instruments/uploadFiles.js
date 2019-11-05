// Instruments
import OrderAPI from 'api/orders/OrderAPI';
import { UploadFilesRequest } from 'api/orders/requests';

export const uploadFiles = (files, order) => {
  let actions = files.map(file => {
    let data = { ...order };
    data.document = file;

    return (new OrderAPI).uploadFiles(new UploadFilesRequest(data));
  });

  return Promise.all(actions);
};
