import { User } from "../models/models.js";
import { Message } from "../models/messages.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getUserSocket, io } from "../lib/socket.js";

export const getUsers = async (req, res) => {
  try {
    const LoggedInUser = req.user._id;
    const users = await User.find({ _id: { $ne: LoggedInUser } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const LoggedInUser = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: LoggedInUser, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: LoggedInUser },
      ],
    });
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const result = await cloudinary.uploader.upload(image);
      imageUrl = result.secure_url;
    }

    const newMessage = new Message({
      receiverId,
      senderId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocket = getUserSocket(receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
