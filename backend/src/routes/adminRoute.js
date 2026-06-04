import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import adminController from "../controller/adminController.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").get(adminController.getAdmin);

//Por ID
router
  .route("/:id")
  .put(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);

export default router;