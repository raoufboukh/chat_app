import { User } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";


export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Email doesn't exist");
    const isPassword = bcrypt.compare(password, user.password);
    if (!isPassword) return res.status(401).send("Invalid Password");
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const verify = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.send("The token is not available");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, response) => {
      if (err) return response.send("token is wrong");
      next();
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { picture } = req.body;
    const id = req.user._id;
    if (!picture) {
      return res.status(400).json({ message: "Please upload a picture" });
    }
    const upload = await cloudinary.uploader.upload(picture);
    const update = await User.findByIdAndUpdate(
      id,
      {
        picture: upload.secure_url,
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};

export const check = (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Something went wrong");
  }
};
