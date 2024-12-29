import express from "express";
import {
  createInformation,
  deleteInformation,
  getInformation,
  updateInformation,
} from "../controllers/control.js";

const router = express.Router();

router.route("/").get(getInformation).post(createInformation);
router.route("/:id").patch(updateInformation).delete(deleteInformation);

export default router;
