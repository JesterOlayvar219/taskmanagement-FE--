import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

interface User {
  username: string;
  password: string;
  email?: string;
  accessToken?: string;
}

class AuthService {
  login(username: string, password: string): Promise<User> {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout(): void {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string): Promise<void> {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthService();
