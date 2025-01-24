import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/routers.js";
import messageRouter from "./routers/message.route.js";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";

dotenv.config();

app.use(express.json({ limit: "20mb", extended: true }));
app.use(
  cors({
    origin: ["https://chat-app-eight-flame.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", router);
app.use("/message", messageRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL).then(() => {
  console.log("db connected");
  server.listen(PORT, () => {
    console.log(`connect to port ${PORT}`);
  });
});
