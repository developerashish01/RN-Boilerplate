import { Platform } from "react-native";

import axios, { AxiosRequestConfig } from "axios";
import Config from "react-native-config";

import { AUTH_KEYS } from "../logout";
import { hydrate } from "../storage";

export const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
  headers: {
    Family: Platform.OS,
  },
});
async function getAccessToken() {
  const token = await hydrate<string>(AUTH_KEYS.TOKEN);
  if (!token) {
    return undefined;
  }
  return `Bearer ${token}`;
}

api.interceptors.request.use(async (request: AxiosRequestConfig) => {
  const token = await getAccessToken();
  console.log("-->", request);
  if (!token) {
    return request;
  } else {
    request.headers.Authorization = token;
    console.log("req1", request);
    return request;
  }
});

api.interceptors.response.use(
  (response) => {
    console.log({ response });
    if (
      response?.data?.status === true ||
      response?.data?.status === 200 ||
      response?.data?.status_code === true ||
      response?.data?.status_code === 200 ||
      response?.status === 200
    ) {
      return response;
    }

    return Promise.reject(new Error(response?.data?.message || "Oops! Something went wrong"));
  },
  (e) => {
    console.log({ e });
    if (e?.message === "Network Error") {
      return Promise.reject(new Error("Please check your internet"));
    }
    return Promise.reject(new Error(e.response?.data?.message || "Oops! Something went wrong"));
  },
);

export type DefaultApiResponse<DATATYPE = any> = {
  status: boolean;
  data: DATATYPE;
};
