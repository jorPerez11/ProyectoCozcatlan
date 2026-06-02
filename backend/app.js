//Imports que nos ayudarán a crear el servidor y manejo de cookies y CORS
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import productRoutes from "./src/routes/products.js";
 
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
app.use("/api/products", productRoutes);    
 
 
 
 
//Exportamos TODO
export default app;