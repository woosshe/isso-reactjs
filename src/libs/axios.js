import axios from "axios";

export const axiosGet = axios.create({
  method: "get",
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: false,
});

export const axiosPost = axios.create({
  method: "post",
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
});

// axiosPost.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosPost.interceptors.response.use(
  (config) => {
    //console.log("=== axios response ===\n", config, "======================");
    const response = { ...config.data, status: config.status };
    return response;
  },
  (error) => {
    const response = { ...error.response.data, status: error.response.status };
    return response;
  }
);
