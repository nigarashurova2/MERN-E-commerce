import express from "express";
import { createCategory, updateCategory, deleteCategory, listCategory, getCategory } from "../controllers/categoryController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.route('/').post(authenticate, authorizeAdmin, createCategory)
router.route('/:categoryId')
.put(authenticate, authorizeAdmin, updateCategory)
.delete(authenticate, authorizeAdmin, deleteCategory)

router.route('/categories').get(authenticate, listCategory)
router.route('/:id').get(authenticate, getCategory)

export default router;
