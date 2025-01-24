import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chat-app-api-eosin.vercel.app",
  withCredentials: true,
});
