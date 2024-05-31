export default class LoginData {
  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log('+++ LoginDataLocalSystem.js (line: 4)',urlParams.get('token'));
    this.token = urlParams.get('token')
  }

  getToken() {
    return this.token;
  }
}
