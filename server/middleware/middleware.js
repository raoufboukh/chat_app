import jwt from "jsonwebtoken";
import { User } from "../models/models.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token found" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token is invalid" });
    }
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Unauthorized - No user found" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send("Unauthorized");
  }
};
