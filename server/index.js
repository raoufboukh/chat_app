import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/routers.js";
import messageRouter from "./routers/message.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", router);
app.use("/message", messageRouter);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL).then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log(`connect to port ${PORT}`);
  });
});
