import { Account } from "@typings/api/Account";

import { api } from "../api";
import { AUTH_KEYS } from "../logout";
import { persist } from "../storage";

export type OtpRequest = {
  phoneNo: string;
};

export const generateOtp = async (req: OtpRequest) => {
  await api.post("/auth/generate-otp", req);
};

export type LoginRequest = {
  phoneNo: string;
  otp: string;
};

export type LoginResponse = {
  token?: string;
  account?: Account;
};

export const login = async (req: LoginRequest): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", req);
  if (data.token) {
    persist(AUTH_KEYS.TOKEN, data.token);
    persist(AUTH_KEYS.USER_DATA, data.account);
    persist(AUTH_KEYS.IS_LOGGED, true);
  }
  return data;
};
