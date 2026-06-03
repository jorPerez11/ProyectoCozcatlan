import multer from "multer"
import {CloudinaryStorage} from "multer-storage-cloudinary";
import {v2 as cloudinary} from "cloudinary";
import { config } from "../../config.js"

//Configuramos cloudinary con nuestras credenciales

cloudinary.config({
    cloud_name: config.CLOUDINARY.NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET
})

//#2 configuramos como guardar las imagenes
const storage = new CloudinaryStorage ({
    cloudinary,
    params: {
        folder: "grupo1B",
        allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"]
    }
})

//#3 configuramos multer

const upload = multer({storage})

export default upload