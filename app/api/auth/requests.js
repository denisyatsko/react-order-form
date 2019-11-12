export class RegisterRequest {
  constructor(data) {
    this.email = data.email;
    this.password = data.password;
  }
}

export class ForgotPasswordRequest {
  constructor(email) {
    this.email = email;
  }
}
