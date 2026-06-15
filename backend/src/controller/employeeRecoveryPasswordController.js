import jsonwebtoken from "jsonwebtoken"; // Importar la libreria para generar el token
import bcrypt from "bcryptjs"; // Importar la libreria para la encriptacion de la contraseña
import crypto, { verify } from "crypto"; // Importar la libreria para generar codigos aleatorios
import nodemailer from "nodemailer"; // Importar la libreria para enviar los correos
import { config } from "../../config.js";
import employeeModel from "../models/employee.js"; // Se importa el modelo del employee
// Importar el archivo HTML
import HTMLPasswordRecovery from "../utils/SenderMail.js";

// Se crea el array de funciones 
const employeeRecoveryPasswordController = {};

employeeRecoveryPasswordController.requestCode = async (req, res) => {
    try {
        // Se solicitan los datos 
        const { email } = req.body;

        // Se valida que el correo puesto exista en la base de datos
        const employeeEmailFound = await employeeModel.findOne({ email });
        if (!employeeEmailFound) {
            return res.status(400).json({ message: "Email not found" })
        }

        // Se genera el código aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex");
        // Se guarda el token
        const token = jsonwebtoken.sign(
            // Se va a guardar
            { email, randomCode, userType: "Employee", verified: false },
            // La clave secreta 
            config.JWT.SECRET,
            // Tiempo de expiración
            { expiresIn: "15m" },
        );
        // El tiempo en que la cookie se restablecera
        res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 });

        // Se enviara el correo con el código aleatorio
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL.USER,
                pass: config.EMAIL.PASS,
            },
        });

        // mailOptions a quien se envia y como lo hace
        const mailOptions = {
            from: config.EMAIL.USER,
            to: email,   //config.EMAIL.USER
            subject: "Código de recuperación",
            text: `tu código de verificación es: ${randomCode} y expirará en 15 minutos. Por favor, ingresa este código en la aplicación para completar tu registro.`,
            html: HTMLPasswordRecovery.HTMLPasswordRecovery(randomCode, null/*`${config.FRONTEND_URL}/admin/verify-email`*/), //Se utilizará cuando se tenga la pantalla necesaria de redireccionamiento
        };

        // Se envia el correo 
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Error sending email" });
            }
        });
        return res.status(200).json({ message: "Email sent" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error 500 " + error });
    }
};

employeeRecoveryPasswordController.verifyCode = async (req, res) => {
    try {
        //Se solicitan los datos
        const { code } = req.body;

        // Se obtiene la informacion que esta dentro del token

        // Se accede a la cookie
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);

        // Lo siguiente es comparar el código que el usuario escribio
        // Con el que esta dentro del token
        if (code !== decoded.randomCode) {
            return res.status(400).json({ message: "Invalid code" });
        }

        // En cambio si escribe bien el código
        // Se va a colocar en el token que ya esta verificado
        const newToken = jsonwebtoken.sign(
            // Que vamos a guardar
            { email: decoded.email, userType: "Employee", verified: true },
            // La clave secreta
            config.JWT.SECRET,
            // En cuanto expira
            { expiresIn: "15m" },
        );
        
        res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000 });
        return res.status(200).json({ message: "Code verified successful" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error 500 " + error });
    }
};

employeeRecoveryPasswordController.newPassword = async (req, res) => {
    try {
        // Se solicitan los datos
        const { newPassword, confirmNewPassword } = req.body;
        // Se comparan las respuestas
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "The passwords do not match" });
        }
        // Se va a comprobar que en la constante verified que esta en el token
        // Ya este en true(Osea que haya pasado por el paso2)
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);
        if (!decoded.verified) {
            return res.status(400).json({ message: "Code not verified" });
        }

        // Encriptar la contraseña
        const passwordHash = await bcrypt.hash(newPassword, 10);
        // Actualizar la contraseña en la base de datos
        await employeeModel.findOneAndUpdate(
            { email: decoded.email },
            { password: passwordHash },
            { new: true },
        );

        res.clearCookie("recoveryCookie");

        return res.status(200).json({ message: "Password updated" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error 500 " + error });
    }
};

export default employeeRecoveryPasswordController;
