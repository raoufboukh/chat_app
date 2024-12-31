import { information } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getInformation = (req, res) => {
  information.find().then((result) => {
    res.send(result);
  });
};

export const createInformation = (req, res) => {
  information
    .create(req.body)
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

export const updateInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await information.findByIdAndUpdate(id, req.body);
    if (update) {
      res.status(200).send(update);
    } else {
      res.status(404).send("No data found");
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const del = await information.findByIdAndDelete(id);
    if (del) {
      res.status(200).send("deleted successfully");
    } else {
      res.status(404).send("No data found");
    }
  } catch (err) {
    console.log(err);
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  if (email === "") {
    return res
      .status(500)
      .json({ message: "Please enter a valid email address" });
  }
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill the details" });
  }
  const user = await information.findOne({ email: email });
  if (user) return res.status(400).json({ message: "User already exists" });
  bcrypt.hash(password, 10).then((hash) => {
    information
      .create({ name, email, password: hash })
      .then((data) => res.status(201).send(data))
      .catch((err) => res.send(err));
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  information
    .findOne({ email: email })
    .then((data) => {
      if (data) {
        bcrypt.compare(password, data.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: data.email },
              process.env.JWT_SECRET,
              {
                expiresIn: "7d",
              }
            );
            res.cookie("token", token, {
              maxAge: 7 * 24 * 60 * 60 * 1000,
              httpOnly: true,
              sameSite: "strict",
              secure: process.env.NODE_ENV === "production" ? true : false,
            });
            res.send("Success");
          } else {
            res.send("the password is incorrect");
          }
        });
      } else {
        res.send("invalid credentials");
      }
    })
    .catch((err) => res.send(err));
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