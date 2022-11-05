import express from "express";
import { getAllCategories, addCategory,deleteCategory } from "../controllers/category-controller";
import {verifyAdminAccessToken} from "../middleware/check-auth";
const router = express.Router();

router.get("/getAllCategories",verifyAdminAccessToken, getAllCategories);
router.post("/addCategory",verifyAdminAccessToken, addCategory);
router.delete("/:id",verifyAdminAccessToken, deleteCategory);

export default router;