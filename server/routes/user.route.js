import express from "express";
import { authMiddleware, authorizeRole } from "../middleware/authMiddleware.js";
import { registerUser, loginUser, currentUser, getUser, getUsers, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/current", authMiddleware, currentUser);
router.get("/:id", authMiddleware, getUser);

// Admin-only routes
router.get("/", authMiddleware, authorizeRole(["admin"]), getUsers);
router.put("/:id", authMiddleware, authorizeRole(["admin", "user"]), updateUser);
router.delete("/:id", authMiddleware, authorizeRole(["admin", "user"]), deleteUser);

export default router;
