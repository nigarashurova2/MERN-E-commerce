import express from "express";
import formidable from "express-formidable"
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { 
    addProduct, 
    updateProductDetails, 
    deleteProduct, 
    fetchProducts, 
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts
} from "../controllers/productController.js";

const router = express.Router()


router.route('/')
.get(authenticate, fetchProducts)
.post(authenticate, authorizeAdmin, formidable(), addProduct)


router.route('/allProducts').get(authenticate, authorizeAdmin, fetchAllProducts)
router.route('/:id/reviews').post(authenticate, authorizeAdmin, checkId, addProductReview)

router.get('/top', authenticate, fetchTopProducts)
router.get('/new', authenticate, fetchNewProducts)

router.route('/:id')
.get(authenticate, fetchProductById)
.put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
.delete(authenticate, authorizeAdmin, deleteProduct)


export default router