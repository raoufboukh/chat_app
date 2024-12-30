import express from "express";
import {
  createInformation,
  deleteInformation,
  getInformation,
  login,
  register,
  updateInformation,
  verify,
} from "../controllers/control.js";

const router = express.Router();

router.route("/").get(getInformation).post(createInformation);
router.route("/:id").patch(updateInformation).delete(deleteInformation);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/home").get(verify, (req, res) => res.send("Success"));
export default router;
