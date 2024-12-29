import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export const information = mongoose.model("information", user);
