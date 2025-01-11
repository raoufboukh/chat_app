import express from "express";
import {
  getMessages,
  sendMessage,
  getUsers,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/middleware.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsers);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;
