import express from "express";
import { Auth } from "../middleware/Auth.js";
import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
import { searchUsers } from "../controllers/searchUsers.js";
import { updateInfo } from "../controllers/updateInfo.js";
import { validUser } from "../controllers/validUser.js";
import { getUserById } from "../controllers/getUserById.js";
import { accessChats } from "../controllers/accessChats.js";
import { fetchAllChats } from "../controllers/fetchAllChats.js";
import { createGroup } from "../controllers/createGroup.js";
import { renameGroup } from "../controllers/renameGroup.js";
import { addToGroup } from "../controllers/addToGroup.js";
import { removeFromGroup } from "../controllers/removeFromGroup.js";
import { googleAuth } from "../controllers/googleAuth.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/login", login);
router.get("/auth/valid", Auth, validUser);
router.get("/api/google", googleAuth);
router.post("/auth/search", searchUsers);
router.get("/auth/api/user", searchUsers);
router.get("/api/users/profile", getUserById);
router.post("/", Auth, accessChats);
router.get("/", Auth, fetchAllChats);
router.post("/group", Auth, createGroup);
router.post("/group/rename", Auth, renameGroup);
router.post("/groupAdd", Auth, addToGroup);
router.post("/api/users/update", updateInfo);
router.get("/api/users/update", searchUsers);
router.patch("/api/chat/groupRemove", Auth, removeFromGroup);
router.delete("/removeuser", Auth);

export default router;
