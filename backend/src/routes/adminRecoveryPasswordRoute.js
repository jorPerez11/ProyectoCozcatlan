//Importamos EXPRESS y todo lo necesario
import express from "express";
import adminRecoveryPasswordController from "../controller/adminRecoveryPasswordController.js";

//Inicializamos el router
const router = express.Router();

//Lo utilizamos
router
  .route("/requestCode")
  .post(adminRecoveryPasswordController.requestCode);
router
  .route("/verifyCode")
  .post(adminRecoveryPasswordController.verifyCode);
router
  .route("/newPassword")
  .post(adminRecoveryPasswordController.newPassword);

//Exportamos todo
export default router;