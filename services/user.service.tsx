import axios, { AxiosResponse } from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test";

class UserService {
  getPublicContent(): Promise<AxiosResponse<string>> {
    return axios.get<string>(API_URL + "all");
  }

  getUserBoard(): Promise<AxiosResponse<string>> {
    return axios.get<string>(API_URL + "user", { headers: authHeader() });
  }

  getModeratorBoard(): Promise<AxiosResponse<string>> {
    return axios.get<string>(API_URL + "mod", {
      headers: authHeader(),
    });
  }

  getAdminBoard(): Promise<AxiosResponse<string>> {
    return axios.get<string>(API_URL + "admin", {
      headers: authHeader(),
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
