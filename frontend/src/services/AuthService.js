import axios from "axios";

class AuthService {
  static async signup(username, password) {
    try {
      const res = await axios.post("/api/v1/signup", { username, password });
      res.json(
        {
          success: true,
          message: "User signed in successfully.",
          data: {
            email: user.email,
            username: user.username,
            token: token
          }
        });
    } catch {
      console.error(error);
      res.status(500);
      res.json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  static async login(loginData) {
    console.log(loginData);
    try {
      const res = await axios.post('/auth/login', loginData, {
        withCredentials: true,
      });

      if (!res.data.success) {
        console.log(res.data.message);
        return null;
      }
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default AuthService;