
import axios, { AxiosResponse, AxiosError } from "axios";
import {BASE_API_FASTAPI, BASE_API_AREA ,BASE_API_FILTER} from "../config";
// import AuthService from "@/api/login/auth.service";

const createApiInstance = (baseURL: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Xử lý lỗi mạng hoặc lỗi từ server ở đây
      console.error("API request failed:", error);

      if (error?.response?.status == 401) {
        //loi 401 thi call lại api refresh tại đây
        const originalRequest = error?.config;
        if (error?.response?.status == 401 && localStorage.getItem("jwt")) {
    
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

const api = createApiInstance(BASE_API_FASTAPI || "");
const apiarea = createApiInstance(BASE_API_AREA|| "");
const apifilter = createApiInstance(BASE_API_FILTER|| "");




export { api,apiarea,apifilter};