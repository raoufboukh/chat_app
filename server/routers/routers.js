import express from "express";
import {
  check,
  // createInformation,
  // deleteInformation,
  // getInformation,
  login,
  logout,
  register,
  // updateInformation,
  updateProfile,
  verify,
} from "../controllers/control.js";
import { protectRoute } from "../middelware/middelware.js";

const router = express.Router();

// router.route("/").get(getInformation).post(createInformation);
// router.route("/:id").patch(updateInformation).delete(deleteInformation);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/home").get(verify, (req, res) => res.send("Success"));
router.route("/logout").post(logout);
router.route("/update-profile").put(protectRoute, updateProfile);
router.route("/check").post(protectRoute, check);
export default router;
