import axios from "axios";
import { parseCookies } from "nookies";

const getStoredToken = (): string | null => {
  const cookies = parseCookies();

  return cookies["webapp.token"] || null;
};

const createApiClient = (token?: string) => {
  const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
};

const storagedToken = getStoredToken();

const api = createApiClient(storagedToken || "");

export const setApiToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default api;
