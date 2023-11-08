import axios, {AxiosInstance} from "axios";

const API_URL = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_KEY}`
const apiClient = () => {
  const headerConfig = {
    Accept: "application/json",
  };
  const instance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      post: headerConfig,
      get: headerConfig,
      delete: headerConfig,
    },
  });

  instance.interceptors.request.use(
    function (config) {
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export const client = apiClient();