// Instruments
import OrderAPI from 'api/orders/OrderAPI';
import { AuthController } from 'instruments/export';
import { GetOrdersRequest } from 'api/orders/requests';

export const getOrders = () => {
  const TOKEN = new AuthController().getToken();

  return new OrderAPI().getOrders(new GetOrdersRequest(TOKEN));
};
