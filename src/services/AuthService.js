import API from "../config/api";

export default {
  login: async ({ credenciais }) => {
    try {
      let response = (await API.post(`/auth`, credenciais)).data;

      return response;
    } catch (error) {
      console.error(error);

      return [];
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem("passport");
    } catch (error) {
      console.error(error);
    }
  },

  isLogged: async () => {
    return await !!localStorage.getItem("passport");
  }
};
