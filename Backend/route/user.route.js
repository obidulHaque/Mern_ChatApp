import express from "express";
import cookieGiver from "../middleware/cookieGiver.js";
import { getUsers } from "../controllers/controller.getUsers.js";

const router = express.Router();

router.get("/", cookieGiver, getUsers);

export default router;
