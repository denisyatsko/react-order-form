import Cookies from 'universal-cookie';

export class AuthController {
  constructor() {
    this.cookies = new Cookies();
    this.userToken = 'TOKEN';
  }

  getToken() {
    return this.cookies.get(this.userToken) ? this.cookies.get(this.userToken) : false;
  }

  setToken(TOKEN, rememberMe) {
    rememberMe
      ? this.cookies.set(this.userToken, TOKEN)
      : this.cookies.set(this.userToken, TOKEN, { maxAge: 300 })
  }

  removeToken() {
    return this.cookies.remove(this.userToken);
  }
}
