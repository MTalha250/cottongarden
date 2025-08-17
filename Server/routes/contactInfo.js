import express from "express";
import {
  createContactInfo,
  updateContactInfo,
  getContactInfo,
} from "../controllers/contactInfo.js";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();
router.post("/", createContactInfo);
router.get("/", getContactInfo);
router.put("/", verifyToken, verifyAdmin, updateContactInfo);

export default router;
