import express from "express";
import saleController from "../controller/salesController.js";

const router = express.Router();

router.route("/").get(saleController.getSales).post(saleController.insertSales);
router
  .route("/:id")
  .put(saleController.updateSaleStatus)
  .delete(saleController.deleteSale);

export default router;