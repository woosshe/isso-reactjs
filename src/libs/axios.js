import axios from "axios";

export const axiosGet = axios.create({
  method: "get",
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export const axiosPost = axios.create({
  method: "post",
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

axiosPost.interceptors.request.use(
  (config) => {
    //console.info("=== axios request ===\n", config, "======================");
    if (config.url.indexOf("/sign") < 0) {
      const acsToken = window.localStorage.getItem("acsToken");
      config.headers.Authorization = `Bearer ${acsToken}`;
    }

    return config;
  },
  (error) => {
    //console.error("=== axios request error ===\n", error, "======================");
    return error;
  }
);

axiosPost.interceptors.response.use(
  (config) => {
    //console.info("=== axios response ===\n", config, "======================");
    const response = { ...config.data, status: config.status };
    return response;
  },
  (error) => {
    //console.error("=== axios response error ===\n", error, "======================");
    const response = { ...error.response.data, status: error.response.status };
    return response;
  }
);
