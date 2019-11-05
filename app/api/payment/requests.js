export class PaySolidGateRequest {
  constructor(data) {
    this.order_id = data.id;
    // this.sub_order_id = data.sub_order_id; // option
  }
}
