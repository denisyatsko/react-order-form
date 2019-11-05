import OrderAPI from 'api/orders/OrderAPI';
import { OrderSubmitRequest } from 'api/orders/requests';

export const submitOrder = (order) => {
  return (new OrderAPI).submit(new OrderSubmitRequest(order))
};
