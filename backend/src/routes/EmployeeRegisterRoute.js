import express from "express"; // Se importa la libreria express
import registerEmployeeController from "../controller/EmployeeRegisterController.js";

const router = express.Router();
router.route("/").post(registerEmployeeController.register); // Ruta para el POST del Employee
router.route("/verifyCodeEmail").post (registerEmployeeController.verifyCode); // Ruta para el POST del Employee verificar el código

export default router;