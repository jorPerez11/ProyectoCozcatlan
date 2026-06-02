import multer from "multer"
import {CloudinaryStorage} from "multer-storage-cloudinary";
import {v2 as cloudinary} from "cloudinary";
import { config } from "../../config.js"

//Configuramos cloudinary con nuestras credenciales

cloudinary.config({
    cloud_name: config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.clodinary_api_key,
    api_secret: config.cloudinary.clodinary_api_secret
})

//#2 configuramos como guardar las imagenes
const storage = new CloudinaryStorage ({
    cloudinary,
    params: {
        folder: "grupo1B",
        allowed_formats: ["jpg", "png", "jpeg", "gif"]
    }
})

//#3 configuramos multer

const upload = multer({storage})

export default upload