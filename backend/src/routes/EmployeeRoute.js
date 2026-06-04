import express from "express"; // Se importa la libreria Express
import employeeController from "../controller/EmployeeController.js"; // Se importa el employee controller

const router = express.Router(); // Se implementa Router() de la libreria de express para definir los métodos HTTP 

// Acceso a los endpoints Get
router.route("/").get(employeeController.getEmployee);

// Por ID
router
    .route("/:id")
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

export default router; // Se exporta router para utilizarlo en otro archivo
