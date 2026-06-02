//Importamos la librería dotenv
import dotenv from "dotenv";
//Cargamos las variables de entorno desde el archivo .env
dotenv.config();
 
//Exportamos un objeto de configuración que contiene las variables de entorno necesarias para la aplicación
export const config ={
    db:{
        URI: process.env.DB_URI
    },
    JWT:{
        SECRET: process.env.JWT_SECRET
    },
    EMAIL:{
        USER: process.env.EMAIL_USER,
        PASS: process.env.EMAIL_PASS
    },
    CLOUDINARY:{
        NAME: process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY: process.env.CLOUDINARY_API_KEY,
        API_SECRET: process.env.CLOUDINARY_API_SECRET
    }
};