import express from 'express';
import productsController from '../controller/productsController.js';

const router = express.Router();

router
    .route("/")
    .get(productsController.getProducts)
    .post(productsController.createProduct);

router
    .route("/:id")
    .delete(productsController.deleteProduct);

export default router;