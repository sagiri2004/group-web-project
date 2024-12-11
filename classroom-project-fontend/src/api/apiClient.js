import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://group-web-project-3.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// lay ra token tu localStorage
const token = localStorage.getItem("token");

// seting axios interceptor
apiClient.interceptors.request.use((config) => {
  if (token) {
    config.headers
      ? (config.headers.Authorization = `Bearer ${token}`)
      : (config.headers = { Authorization: `Bearer ${token}` });
  }
  return config;
});

export default apiClient;
