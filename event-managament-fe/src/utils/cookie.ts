import Cookies from "js-cookie";

export const setCookie = (name: string, value: string, expires: number = 7) => {
  Cookies.set(name, value, { expires, secure: true, sameSite: "strict" });
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};
