class AuthType {
  constructor(type) {
    this.title = type.title;
    this.btnText = type.btnText;
  }
}

export const AuthState = new AuthType({ title: 'Registration', btnText: 'Sign up' });
export const LoginState = new AuthType({ title: 'Log in', btnText: 'Log in' });

