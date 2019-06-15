import API from "../config/api";

export default {
  login: async ({ credenciais }) => {
    try {
      let response = (await API.post(`/auth`, credenciais)).data;

      return response;
    } catch (error) {
      console.error(error.response.data);

      return [];
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem("passport");
    } catch (error) {
      console.error(error.response.data);
    }
  },

  isLogged: async () => {
    return await !!localStorage.getItem("passport");
  }
};
