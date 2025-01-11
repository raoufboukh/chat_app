/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { enqueueSnackbar } from "notistack";

interface User {
  name: string;
  email: string;
  password: string;
  picture: string;
}

interface AuthStore {
  user: User | null;
  isChecking: boolean;
  isSigninUp: boolean;
  isLoggingIn: boolean;
  isUpdating: boolean;
  checkAuth: () => void;
  signUp: (da: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isChecking: true,
  isSigninUp: false,
  isLoggingIn: false,
  isUpdating: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/check");
      set({ user: res.data });
    } catch (error) {
      console.log("the error is ", error);
      set({ user: null });
    } finally {
      set({ isChecking: false });
    }
  },
  signUp: async (data: any) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/register", data);
      set({ user: res.data });
      enqueueSnackbar("Account Created Successfully", { variant: "success" });
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "An error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      set({ isSigninUp: false });
    }
  },
  logout: () => set({ user: null }),
}));
