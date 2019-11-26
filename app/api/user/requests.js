export class UpdateRequest {
  constructor(data) {
    this.email = data.email;
    this.first_name = data.customer_name;
    this.country = data.country;
    this.phone = data.phone;
  }
}

export class ChangePasswordRequest {
  constructor(data) {
    this.current_password = data.current_password;
    this.new_password = data.new_password;
    this.new_password_confirmation = data.new_password_confirmation;
  }
}
