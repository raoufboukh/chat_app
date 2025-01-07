import express from "express";
import {
  getMessages,
  sendMessage,
  updateMessage,
  deleteMessage,
  getUsers,
} from "../controllers/message.controller.js";
// import { Message } from "../models/message.model.js";
import { protectRoute } from "../middelware/middelware.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsers);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;
