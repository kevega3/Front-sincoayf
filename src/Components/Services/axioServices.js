import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    // config.baseURL = "http://127.0.0.1:1880/api/"; // api Node-red Node.js
    config.baseURL = "http://localhost:5030/api/"; // api Node-red Node.js
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  return Promise.reject(error);
});

export default axios;
