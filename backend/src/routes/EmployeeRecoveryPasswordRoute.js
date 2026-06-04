import express from "express"; // Se importa la libreria express
import employeeRecoveryPasswordController from "../controller/EmployeeRecoveryPasswordController.js";

const router = express.Router();

router.route("/requestCode").post(employeeRecoveryPasswordController.requestCode);
router.route("/verifyCode").post(employeeRecoveryPasswordController.verifyCode);
router.route("/newPassword").post(employeeRecoveryPasswordController.newPassword);

export default router;