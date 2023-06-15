import axios from "axios";
import store from "../Context/store.js";

const defaultOptions = {
  baseURL: `${process.env.REACT_APP_API_INDEX_URL}${process.env.REACT_APP_BACKEND_PORT}`,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.authToken;
  config.headers.Authorization = token !== "" ? `Bearer ${token}` : "";
  return config;
});

// axiosInstance.interceptors.response.use(
//   (res) => {
//     console.log("axios request used: ", res.request);
//     return res;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
