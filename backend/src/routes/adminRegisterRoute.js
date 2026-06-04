import express from "express";
//Importamos el controlador PARA REFERENCIAR CADA ENDPOINT
import registerAdminController from "../controller/adminRegisterController.js";

//Acá nos ayudará Router() que contendrá todos los endpoints
const router = express.Router();

//Router tiene todos los MÉTODOS HTTP
router.route("/").post(registerAdminController.registerAdmin);

//Código de verificación de EMAIL
router.route("/verifyCodeEmail").post(registerAdminController.verifyCode);

export default router;