export default class LoginData {
  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    this.token = urlParams.get('token')
  }

  getToken() {
    return this.token;
  }
}
