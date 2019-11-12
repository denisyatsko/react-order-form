import Cookies from 'universal-cookie';

export class AuthController {
  constructor() {
    this.cookies = new Cookies();
  }

  getToken() {
    return this.cookies.get('TOKEN') ? this.cookies.get('TOKEN') : false;
  }

  setToken(TOKEN, rememberMe) {
    rememberMe
      ? this.cookies.set('TOKEN', TOKEN)
      : this.cookies.set('TOKEN', TOKEN, { maxAge: 300 })
  }

  removeToken() {
    return this.cookies.remove('TOKEN');
  }
}
