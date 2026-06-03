import express from "express";
import orderController from "../controller/orderController.js";

const router = express.Router();

router.route("/")
    .get(orderController.getOrders)
    .post(orderController.insertOrder);

router.route("/:id")
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder)
  .get(orderController.getOrderById);

export default router;
