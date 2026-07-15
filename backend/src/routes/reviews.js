import express from "express";
import reviewController from "../controller/reviewController.js";

const router = express.Router();

router.route("/product/:productId").get(reviewController.getReviewsByProduct);
router.route("/").post(reviewController.createReview);
router.route("/:id").delete(reviewController.deleteReview);

export default router;
