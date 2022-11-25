import { atom } from "recoil";

export const isLoginState = atom({
  key: "isLogin",
  default: false,
});

export const userInfoState = atom({
  key: "userInfo",
  default: {},
});
