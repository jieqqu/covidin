import axios from "axios";
const API_URL = "http://localhost:899/";

class AuthService {
  login(medical_account, password) {
    return axios.post(API_URL + "login", { medical_account, password });
  }

  logout() {
    return axios.get(API_URL + "logout");
  }
}

export default new AuthService();
