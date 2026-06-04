import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import employeeLoginController from "../controller/EmployeeLoginController.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").post(employeeLoginController.login);

export default router;