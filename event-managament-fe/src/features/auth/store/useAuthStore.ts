import { create } from "zustand";
import { persist } from "zustand/middleware";
import { signIn, signUp, getMe, signOut } from "../services/authService";
import Cookies from "js-cookie";
import { AuthState, SignIn, SignUp } from "../types/auth.types";

export const useStoreLogin = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      error: null,
      isAuthenticated: false,

      signIn: async (data: SignIn) => {
        try {
          const res = await signIn(data);
          const { user, accessToken, refreshToken } = res.data;

          Cookies.set("token", accessToken);
          Cookies.set("refreshToken", refreshToken);

          set({
            user,
            accessToken,
            refreshToken,
            error: null,
            isAuthenticated: true,
          });
          return true;
        } catch (error: any) {
          console.error("Login failed", error);
          // Handle specific backend error format { error: { message: "..." } }
          const errorMessage =
            error.response?.data?.message || // Standard Axios error structure
            error.error?.message || // Backend custom structure { error: { message: "" } } via apiFetch interceptor
            error.message || // Standard JS Error
            "Login failed";

          set({
            error: errorMessage,
            isAuthenticated: false,
          });
          return false;
        }
      },

      signUp: async (data: SignUp) => {
        try {
          await signUp(data);
          set({ error: null });
          return true;
        } catch (error: any) {
          console.error("Registration failed", error);
           const errorMessage =
            error.response?.data?.message ||
            error.error?.message ||
            error.message ||
            "Registration failed";
          set({
            error: errorMessage,
          });
          return false;
        }
      },

      signOut: async () => {
        try {
          await signOut();
        } catch (error) {
          //
        } finally {
          Cookies.remove("token");
          Cookies.remove("refreshToken");
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
        }
        return true;
      },

      me: async () => {
        try {
          const token = Cookies.get("token");
          if (!token) {
            set({ user: null, accessToken: null, isAuthenticated: false });
            return null;
          }
          const user = await getMe();
          set({ user, isAuthenticated: true });
          return user;
        } catch (error) {
          set({ user: null, accessToken: null, isAuthenticated: false });
          return null;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
