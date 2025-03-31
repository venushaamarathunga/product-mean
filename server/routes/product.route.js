import express from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { authMiddleware, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", authMiddleware, authorizeRole(["admin"]), createProduct);

router.put("/:id", authMiddleware, authorizeRole(["admin"]), updateProduct);

router.delete("/:id", authMiddleware, authorizeRole(["admin"]), deleteProduct);

export default router;
