import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/routers.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", router);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL).then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log(`connect to port ${PORT}`);
  });
});
