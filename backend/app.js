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
app.use("/api/admin", admin)
app.use("/api/sales", sales)

 
//Exportamos TODO
export default app;