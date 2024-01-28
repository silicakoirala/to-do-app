import { create } from "zustand";
import AuthService from "../services/AuthService";

const useAuthStore = create((set) => ({
  userData: null,
  loginData: {
    email: '',
    password: '',
  },

  login: async () => {
    const { loginData } = useAuthStore.getState();
    
    const data = await AuthService.login(loginData);
    set({
      userData: data,
      loginData: {
        email: '',
        password: '',
      },
    });
  },

  updateLoginData: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        loginData: {
          ...state.loginData,
          [name]: value,
        },
      };
    })
  }
})
);

export default useAuthStore;