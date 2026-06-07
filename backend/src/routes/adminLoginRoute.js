import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import loginAdminController from "../controller/adminLoginController.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").post(loginAdminController.login);

export default router;