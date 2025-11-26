import { cookies } from "next/headers";

export enum CookieKey {
  TOKEN = "token",
}

export const setCookie = async (name: string, value: string, days = 7) => {
  const maxAge = days * 24 * 60 * 60;

  (await cookies()).set({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge,
  });
};

export const getCookie = async (name: string) => {
  const cookie = (await cookies()).get(name);
  return cookie?.value ?? null;
};

export const removeCookie = async (name: string) => {
  (await cookies()).set({
    name,
    value: "",
    maxAge: 0,
    path: "/",
  });
};

export const removeAllCookies = async () => {
  const all = (await cookies()).getAll();

  all.forEach((c) => {
    (async () => {
      (await cookies()).set({
        name: c.name,
        value: "",
        maxAge: 0,
        path: "/",
      });
    })();
  });
};
