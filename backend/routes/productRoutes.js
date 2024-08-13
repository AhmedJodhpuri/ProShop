const router = express.Router();
import express from "express";
import { createProduct, getProductById, getProducts, updateProduct, deleteProduct, createProductReview,getTopProducts } from "../controllers/productControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/top', getTopProducts);

router.route('/:id' ).get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct )
router.route('/:id/reviews' ).post(protect, createProductReview)
export default router;  