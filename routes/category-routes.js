import express from "express";
import {
  getCategories,
  createCategories,
  deleteCategories,
  updateCategories,
} from "../controllers/category-controllers.js";

const router = express.Router();
router.get("/", getCategories);
router.post("/", createCategories);
router.delete("/:id", deleteCategories);
router.put("/:id", updateCategories);

export default router;
