import express from "express";
import { sendMessage, getMessage } from "../controllers/controller.message.js";
import cookieGiver from "../middleware/cookieGiver.js";

const router = express.Router();

router.get("/:id", cookieGiver, getMessage);
router.post("/send/:id", cookieGiver, sendMessage);

export default router;
