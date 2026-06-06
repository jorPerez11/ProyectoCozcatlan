import express from 'express';
import productsController from '../controller/productsController.js';
import upload from "../utils/cloudinaryConfig.js"
const router = express.Router();

router
    .route("/")
    .get(productsController.getProducts)
    .post(upload.array("images.image"),productsController.createProduct);

router
    .route("/:id")
    .get(productsController.getProductById)
    .delete(productsController.deleteProduct)
    .put(upload.array("images.image"), productsController.updateProduct)

export default router;