import express from "express";
import suppliersController from "../controller/suppliersController.js";

const router = express.Router();

router.route("/")
    .get(suppliersController.getSupplier)
    .post(suppliersController.createSupplier);

router.route("/:id")
  .put(suppliersController.updateSupplier)
  .delete(suppliersController.deleteSupplier)

export default router;
