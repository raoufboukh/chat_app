/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { enqueueSnackbar } from "notistack";
import { Socket, io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

interface User {
  _id: string; // Ajout de l'identifiant de Mongoose
  name: string;
  email: string;
  password: string;
  picture: string;
  createdAt: string; // Ajout de la propriété createdAt
}

interface AuthStore {
  user: User | null;
  isChecking: boolean;
  isSigninUp: boolean;
  isLoggingIn: boolean;
  isUpdating: boolean;
  socket: Socket | null;
  checkAuth: () => void;
  login: (data: any) => void;
  signUp: (da: any) => void;
  logout: () => void;
  updateProfile(data: any): void;
  connectSocket: () => void;
  disconnectSocket: () => void;
  OnlineUsers: string | any[];
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isChecking: true,
  isSigninUp: false,
  isLoggingIn: false,
  isUpdating: false,

  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/check");
      set({ user: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("the error is ", error);
      set({ user: null });
    } finally {
      set({ isChecking: false });
    }
  },
  login: async (data: any) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/login", data);
      set({ user: res.data });
      enqueueSnackbar("Welcome Back", { variant: "success" });
      get().connectSocket();
    } catch (error) {
      enqueueSnackbar("Invalid Credential", { variant: "error" });
    } finally {
      set({ isLoggingIn: false });
    }
  },
  signUp: async (data: any) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/register", data);
      set({ user: res.data });
      enqueueSnackbar("Account Created Successfully", { variant: "success" });
      get().connectSocket();
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "An error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      set({ isSigninUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.get("/logout");
      set({ user: null });
      enqueueSnackbar("Logged out successfully", { variant: "success" });
      get().disconnectSocket();
    } catch (error) {
      enqueueSnackbar("An error occurred", { variant: "error" });
    }
  },
  updateProfile: async (data: any) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put("/update-profile", data);
      set({ user: res.data });
      enqueueSnackbar("Profile Updated Successfully", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(String(error), { variant: "error" });
    } finally {
      set({ isUpdating: false });
    }
  },
  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: user._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (users) => {
      set({ OnlineUsers: users });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket?.disconnect();
      set({ socket: null });
    }
  },
  OnlineUsers: [],
}));
