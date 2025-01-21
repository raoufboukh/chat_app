/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { enqueueSnackbar } from "notistack";
import { axiosInstance } from "../lib/axios";

interface chatStore {
  messages: any[];
  users: any[];
  selectedUser: any;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUser: () => void;
}

export const useChatStore = create<chatStore>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUser: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/users");
      set({ users: res.data });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (id: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/${id}`);
      set({ messages: res.data });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
