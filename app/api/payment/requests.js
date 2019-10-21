export default class PaySolidGateRequest {
  constructor(data) {
    this.order_id = data.order.id;
    // this.sub_order_id = data.sub_order_id; // option
  }
}
