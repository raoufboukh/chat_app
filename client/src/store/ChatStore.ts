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
  getMessages: (id: string) => void;
  sendMessage: (data: any) => void;
  setSelectedUser: (selectedUser: any) => void;
}

export const useChatStore = create<chatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUser: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
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
      const res = await axiosInstance.get(`/message/${id}`);
      set({ messages: res.data });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (data: any) => {
    try {
      const { selectedUser, messages } = get();
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        data
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
  },
  setSelectedUser: (selectedUser: any) => set({ selectedUser }),
}));
