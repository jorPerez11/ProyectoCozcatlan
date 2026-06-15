import express from "express"; // Se importa la libreria express
import employeeRecoveryPasswordController from "../controller/employeeRecoveryPasswordController.js";

const router = express.Router();

router.route("/requestCode").post(employeeRecoveryPasswordController.requestCode);
router.route("/verifyCode").post(employeeRecoveryPasswordController.verifyCode);
router.route("/newPassword").post(employeeRecoveryPasswordController.newPassword);

export default router;