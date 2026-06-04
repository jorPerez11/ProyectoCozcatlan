import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import clientController from "../controller/ClientController.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").get(clientController.getClient);

//Por ID
router
  .route("/:id")
  .put(clientController.updateClient)
  .delete(clientController.deleteClient);

export default router;