import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/routers.js";
import messageRouter from "./routers/message.route.js";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();

app.use(express.json({ limit: "20mb", extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", router);
app.use("/message", messageRouter);

const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(_dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
  });
}

mongoose.connect(process.env.CONNECTION_URL).then(() => {
  console.log("db connected");
  server.listen(PORT, () => {
    console.log(`connect to port ${PORT}`);
  });
});
