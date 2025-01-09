import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

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
      console.log(error);
      set({ user: null });
    } finally {
      set({ isChecking: false });
    }
  },
  logout: () => set({ user: null }),
}));
