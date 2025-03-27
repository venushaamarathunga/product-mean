import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { registerUser, loginUser, currentUser, getUser, getUsers, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/current", authMiddleware, currentUser);
router.get("/:id", authMiddleware, getUser);
router.get("/", authMiddleware, getUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
