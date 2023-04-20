import { asyncForEach } from "./extenders";
import { unpersist } from "./storage";

export const AUTH_KEYS = {
  USER_DATA: "userData",
  TOKEN: "token",
  FCM: "fcmToken",
  IS_LOGGED: "isLoggedIn",
};

export const handleLogout = async () => {
  await asyncForEach<string>({
    array: Object.values(AUTH_KEYS),
    callback: async (value) => {
      await unpersist(value);
    },
  });
};
