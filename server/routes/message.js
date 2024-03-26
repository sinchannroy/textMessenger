import express from "express";
import { sendMessage } from "../controllers/sendMessage.js"
import { getMessages } from "../controllers/getMessages.js";
import { Auth } from "../middleware/Auth.js";

const router = express.Router();

router.post("/", Auth, sendMessage);
router.get("/:chatId", Auth, getMessages);

export default router;