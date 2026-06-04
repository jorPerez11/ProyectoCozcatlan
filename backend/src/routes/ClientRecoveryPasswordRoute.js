//Importamos EXPRESS y todo lo necesario
import express from "express";
import clientRecoveryPasswordController from "../controller/ClientRecoveryPasswordController.js";

//Inicializamos el router
const router = express.Router();

//Lo utilizamos
router
  .route("/requestCode")
  .post(clientRecoveryPasswordController.requestCode);
router
  .route("/verifyCode")
  .post(clientRecoveryPasswordController.verifyCode);
router
  .route("/newPassword")
  .post(clientRecoveryPasswordController.newPassword);

//Exportamos todo
export default router;