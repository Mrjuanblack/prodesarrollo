import { create } from "zustand";
import { User } from "@/domain/user";
import { removeAllCookies, removeCookie, setCookie } from "./cookie";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;

  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
  setLoading: (state: boolean) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,

  setUser: (user: User) => set({ user }),

  setToken: (token: string | null) => {
    set({ token });
    if (token) {
      setCookie("token", token);
    } else {
      removeCookie("token");
    }
  },

  setLoading: (state: boolean) => set({ loading: state }),

  logout: () => {
    set({ user: null, token: null });
    removeAllCookies();
  },
}));

// const validate = async () => {
//   setLoading(true);

// try {
//   await validateUserMutation.mutateAsync({
//     token: token ?? "",
//     userId: user?.id ?? "",
//   });
// } catch {
//   logout();
//   return null;
// } finally {
// setLoading(false);
// }
// };

// const logoutUser = async () => {
//   try {
//     setLoading(true);
//     await logoutMutation.mutateAsync(user?.id ?? "");
//     logout();
//   } catch (error) {
//     throw error;
//   } finally {
//     setLoading(false);
//   }
// };
