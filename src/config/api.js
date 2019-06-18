import axios from "axios";

export const connection = window.location.host.split(".")[0];
export const apiURL = process.env.REACT_APP_API_URI;

const api = axios.create({
  baseURL: apiURL + connection
});

api.interceptors.request.use(
  async config => {
    const token = (await JSON.parse(localStorage.getItem("passport")))
      ? JSON.parse(localStorage.getItem("passport")).token
      : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    return Promise.reject(error);
  }
);

export default api;
