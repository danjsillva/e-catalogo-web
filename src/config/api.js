import axios from "axios";

export const apiURL = process.env.REACT_APP_API_URI;

const api = axios.create({
  baseURL: apiURL
});

api.interceptors.request.use(
  async config => {
    const token = (await localStorage.getItem("passport"))
      ? JSON.parse(localStorage.getItem("passport")).token
      : null;

    if (
      !config.preventShowLoading &&
      !window.location.href.includes("/login")
    ) {
      document.body.classList.add("loading-indicator");
    }

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
    document.body.classList.remove("loading-indicator");

    return response;
  },
  async error => {
    document.body.classList.remove("loading-indicator");

    if (
      error.response.status === 401 &&
      !window.location.href.includes("/login")
    ) {
      alert("Sessão expirada! Faça login e tente novamente.");

      window.location.hash = "#/login";
    }

    return Promise.reject(error);
  }
);

export default api;
