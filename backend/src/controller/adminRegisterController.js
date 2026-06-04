//Importamos las librerías para realizar todo el proceso de encriptación y envío de correos
import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import adminsModel from "../models/admin.js";
import registerCodeModelHTML from "../utils/SenderMail.js";
import { config } from "../../config.js";

const registerAdminController = {};

//Realizamos el INSERT
//Creamos una función asíncrona que recibirá la req y la res
registerAdminController.registerAdmin = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;

  //Colocamos un trycatch para canalizar errores
  try {

    //Creamos instancia del modelo
    const newAdmin = new adminsModel({
      firstName,
      lastName,
      email,
      password,
      isVerified: true,
      loginAttempts: 0,
      timeOut: null,
    });

    //Validamos campos según el Schema
    await newAdmin.validate();

    //Verificamos si el correo ya existe
    const existsAdmin = await adminsModel.findOne({ email });

    if (existsAdmin) {
      return res.status(400).json({
        status: false,
        message: "Email already exists"
      });
    }

    //Encriptamos la contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Generamos un código aleatorio para la verificación del correo
    const verificationCode = crypto.randomBytes(3).toString("hex");

    //Guardamos en un token el código de verificación y el correo del usuario
    const token = jsonwebtoken.sign(
      {
        verificationCode,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isVerified: true,
        loginAttempts: 0,
        timeOut: null,
      },
      config.JWT.SECRET,
      { expiresIn: "15m" },
    );

    //Lo guardamos en la cookie
    res.cookie("registrationCookie", token, {
      maxAge: 15 * 60 * 1000, //15 minutos
    });

    //1. Enviamos el código por correo electrónico
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL.USER,
        pass: config.EMAIL.PASS,
      },
    });

    //2. Creación del mailoptions, que contiene el correo del destinatario, el asunto y el cuerpo del mensaje
    const mailOptions = {
      from: config.EMAIL.USER,
      to: email,
      subject: "Verificación de correo electrónico",
      text: `Hola ${firstName}, tu código de verificación es: ${verificationCode} y expirará en 15 minutos. Por favor, ingresa este código en la aplicación para completar tu registro.`,
      html: registerCodeModelHTML.HTMLConfirmEmail(
        verificationCode,
        null 
      ),
    };

    //3. Enviamos el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json({
          status: false,
          message: "Error sending email",
          error: error.message
        });
      }

      return res.status(200).json({
        status: true,
        message: "Verification code sent to email successfully",
      });
    });
  } catch (error) {
    //Aplicamos las validaciones de mongoose para verificar cada campo cumpla con sus requerimientos
    if (error.name === 'ValidationError') {

      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));

      return res.status(400).json({
        status: false,
        message: 'Validation error',
        errors
      });
    }

    //En caso de error de servidor, retornamos el error
    return res.status(500).json({
      status: false,
      message: "Internal server error 500",
      error: error.message
    });
  }
};

//Verificar el código de verificación
registerAdminController.verifyCode = async (req, res) => {
  const { verificationCodeRequest } = req.body;

  try {
    //Extraemos los datos del token
    const token = req.cookies.registrationCookie;

    //Extraer la información del token
    const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);

    const {
      verificationCode: storedCode,
      firstName,
      lastName,
      email,
      password,
      isVerified,
      loginAttempts,
      timeOut,
    } = decoded;

    //Comparar lo que el usuario escribió con el código que está en el token
    if (verificationCodeRequest !== storedCode) {
      return res
        .status(400)
        .json({ message: "Invalid verification code" });
    }

    //Si todo está bien, lo registramos en la DB
    const newAdmin = new adminsModel({
      firstName,
      lastName,
      email,
      password,
      isVerified,
      loginAttempts,
      timeOut,
    });

    //Guardamos TODOS los datos del administrador
    await newAdmin.save();

    //Limpiamos la cookie
    res.clearCookie("registrationCookie");

    //Retornamos la respuesta
    return res
      .status(201)
      .json({ message: "Admin registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error 500 " + error });
  }
};

export default registerAdminController;