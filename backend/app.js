//Imports que nos ayudarán a crear el servidor y manejo de cookies y CORS
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import productRoutes from "./src/routes/products.js";
import orderRoutes from "./src/routes/order.js";
import suppliersRoutes from "./src/routes/suppliers.js"
import admin from "./src/routes/adminRoute.js"
import sales from "./src/routes/sales.js"

//Employee
import employeeRegisterRoutes from "./src/routes/EmployeeRegisterRoute.js";
import employeeRoutes from "./src/routes/EmployeeRoute.js";
import employeeLoginRoutes from "./src/routes/EmployeeLoginRoute.js";
import employeeRecoveryPasswordRoutes from "./src/routes/EmployeeRecoveryPasswordRoute.js";
//Client
import clientRegisterRoutes from "./src/routes/ClientRegisterRoute.js";
import clientRoutes from "./src/routes/ClientRoute.js";
import clientLoginRoutes from "./src/routes/ClientLoginRoute.js";
import clientRecoveryPasswordRoutes from "./src/routes/ClientRecoveryPasswordRoute.js";
//Admin
import adminRegisterRoutes from "./src/routes/AdminRegisterRoute.js";
import adminRoutes from "./src/routes/AdminRoute.js";
import adminLoginRoutes from "./src/routes/AdminLoginRoute.js";
import adminRecoveryPasswordRoutes from "./src/routes/AdminRecoveryPasswordRoute.js";
 
//Constante EXPRESS
const app = express();
 
//Configuración de CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    credentials: true,
  }),
);
 
//Para que acepte los json desde postman o API
app.use(express.json());
app.use(cookieParser())

// Endpoints
app.use("/api/products", productRoutes);   
app.use("/api/orders", orderRoutes) ;
app.use("/api/suppliers", suppliersRoutes)
app.use("/api/sales", sales)


//CRUD COMPLETO CON REGISTRO, LOGIN Y RECUPERACION DE CONTRASEÑA
//Employee
app.use("/api/employee/registerEmployee", employeeRegisterRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/employee/loginEmployee", employeeLoginRoutes);
app.use("/api/employee/recoveryPasswordEmployee", employeeRecoveryPasswordRoutes);

//Admin
app.use("/api/admin/registerAdmin", adminRegisterRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/loginAdmin", adminLoginRoutes);
app.use("/api/admin/recoveryPasswordAdmin", adminRecoveryPasswordRoutes);

//Client
app.use("/api/client/registerClient", clientRegisterRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/client/loginClient", clientLoginRoutes);
app.use("/api/client/recoveryPasswordClient", clientRecoveryPasswordRoutes);


 
//Exportamos TODO
export default app;