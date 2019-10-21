export class RegisterRequest {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }
}

export class RetrieveRequest {
  constructor(customer_token) {
    this.customer_token = customer_token;
  }
}

export class ForgotPasswordRequest {
  constructor(email) {
    this.email = email;
  }
}
