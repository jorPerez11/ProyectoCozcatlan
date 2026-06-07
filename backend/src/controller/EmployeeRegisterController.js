import nodemailer from "nodemailer"; // Se importa para enviar correos
import crypto from "crypto"; // Se importa para generar los codigos aleatorios
import jsonwebtoken from "jsonwebtoken"; // Se importa para tener acceso a la creación de token
import bcrypt from "bcryptjs"; // Se importa para encriptar las contraseñas creadas
import registerCodeModelHTML from "../utils/SenderMail.js";
import employeeModel from "../models/employee.js"; // Se importa el modelo del employee
import { config } from "../../config.js"; // Se importa para tener acceso al archivo config

const registerEmployeeController = {}; // Se crea el array de funciones

registerEmployeeController.register = async (req, res) => {
    //#1 Se solicitan los datos del employee
    const { firstName, lastName, phone, email, password, DUI, address,birthday } = req.body;
    try {
        // Se valida que el correo no exista en la base de datis
        const existsEmployee = await employeeModel.findOne({ email });
        if (existsEmployee) {
            return res.status(400).json({ message: "Employee already exists" });
        }

        // Se encripta la contraseña
        // El numero 10 es para el salt number(Cuantas veces se repetira la iteración)
        const passwordHashed = await bcrypt.hash(password, 10);
        // Se generara un codigo aleatorio para enviar al correo con 3 numeros y 3 letras
        const randomNumber = crypto.randomBytes(3).toString("hex");

        // Se guardara toda la información en un token
        const token = jsonwebtoken.sign(
            {
                randomNumber,
                firstName,
                lastName,
                phone,
                email,
                password: passwordHashed,
                DUI,
                birthday,
                address,
                isActive: true
            },
            // Se guardara la secret key del token
            config.JWT.SECRET,
            // Se ingresa el tiempo de duración
            { expiresIn: "15m" },
        );

        res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 }); // Se ingresa el tiempo de la cookie

        // Se hace el proceso de enviar el código aleatorio por correo electrónico
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL.USER,
                pass: config.EMAIL.PASS,
            },
        });

        // Se hace el mailOption de quien lo recibe
        const mailOption = {
            from: config.EMAIL.USER,
            to: email,   //config.EMAIL.USER,
            subject: "Verificación de correo electrónico",
            text: `Hola ${firstName}, tu código de verificación es: ${randomNumber} y expirará en 15 minutos. Por favor, ingresa este código en la aplicación para completar tu registro.`,
            html: registerCodeModelHTML.HTMLConfirmEmail(randomNumber, null/*`${config.FRONTEND_URL}/admin/verify-email`*/), //Se utilizará cuando se tenga la pantalla necesaria de redireccionamiento
        };

        // Se hace el envio del correo electrónico
        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Error sending email" });
            }
            return res.status(200).json({ message: "Email sent" });
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error 500 " + error });
    }
};

// Se verifica el código que se acaba de enviar
registerEmployeeController.verifyCode = async (req, res) => {
    try {
        // #1 Se solicita el código que se escribe en el frontend
        const { verificationCodeRequest } = req.body;

        // Se obtiene el token de la cookie
        const token = req.cookies.registrationCookie;

        // Se manda a extraer la información del token
        const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);
        const {
            randomNumber: storedCode,
            firstName,
            lastName,
            phone,
            email,
            password,
            DUI,
            birthday,
            address,
            isVerified,
        } = decoded;
        // Se compara lo que el usuario escribio con el código que esta en el token
        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({ message: "Invalid code" });
        }
        // Si todo esta correcto y el usuario escribio el código, se registra en la BD
        const newEmployee = employeeModel({
            firstName,
            lastName,
            phone,
            email,
            password,
            DUI,
            address,
            birthday,
            isActive: true,
            isVerified: true,
        });
        await newEmployee.save();
        res.clearCookie("registrationCookie");
        return res.status(201).json({ message: "Employee registered" })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error 500 " + error });
    }
};

export default registerEmployeeController;
