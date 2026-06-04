//Importamos las librerías necesarias para realizar recuperación exitosa
import jsonwebtoken from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { config } from "../../config.js";
import bcrypt from "bcryptjs";
import adminModel from "../models/admin.js";
import HTMLPasswordRecovery from "../utils/SenderMail.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const adminRecoveryPasswordController = {};

//Realizamos la función para la recuperación de contraseña
adminRecoveryPasswordController.requestCode = async (req, res) => {
  //Solicitamos los datos
  const { email } = req.body;

  //Validamos el formato del código
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //Comparamos
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      status: false,
      message: "Invalid email"
    });
  }

  try {
    //Buscamos si el correo existe
    const adminFound = await adminModel.findOne({ email });

    //Si no existe el correo en la base de datos
    if (!adminFound) {
      return res.status(404).json({
        status: false,
        message: "Email not found"
      });
    }

    //Generamos un código aleatorio para la verificación del correo
    const verificationCode = crypto.randomBytes(3).toString("hex");

    //Guardamos en un token el código de verificación y el correo del usuario
    const token = jsonwebtoken.sign(
      {
        email,
        verificationCode,
        userType: "Admin",
        verified: false,
      },
      config.JWT.SECRET,
      { expiresIn: "15m" },
    );

    //Lo guardamos en la cookie
    res.cookie("recoveryCookie", token, {
      maxAge: 15 * 60 * 1000,
    });

    //Enviamos el correo electrónico
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.EMAIL.USER,
        pass: config.EMAIL.PASS,
      },
    });

    //Se crea el MAIL OPTIONS
    const mailOptions = {
      from: config.EMAIL.USER,
      to: email,
      subject: "Verificación de correo electrónico",
      text: `Hola, tu código de verificación es: ${verificationCode} y expirará en 15 minutos. Por favor, ingresa este código en la aplicación para completar tu recuperación de contraseña.`,
      html: HTMLPasswordRecovery.HTMLRecoveryEmail(
        verificationCode,
        //Se utilizará la ruta pertinente a la recuperación de contraseña
        null /*${config.FRONTEND_URL}/admin/verify-email*/
      )
    };

    //Enviamos el correo
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
        message: "Verification email sent successfully"
      });
    });
  } catch (error) {
    //En caso de error
    return res.status(500).json({
      status: false,
      message: "Internal server error 500",
      error: error.message
    });
  }
};

//Verificar el código de verificación
adminRecoveryPasswordController.verifyCode = async (req, res) => {
  //Solicitamos los datos
  const { verificationCodeRequest } = req.body;

  try {
    //Extraemos los datos del token
    const token = req.cookies.recoveryCookie;

    //Extraer la información del token
    const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);

    //Validamos el código
    if (verificationCodeRequest !== decoded.verificationCode) {
      return res.status(401).json({
        status: false,
        message: "Invalid verification code"
      });
    }

    //Generamos un nuevo token
    const newToken = jsonwebtoken.sign(
      {
        email: decoded.email,
        userType: "Admin",
        verified: true,
      },
      config.JWT.SECRET,
      { expiresIn: "15m" },
    );

    //Lo guardamos en la cookie
    res.cookie("recoveryCookie", newToken, {
      maxAge: 15 * 60 * 1000,
    });

    //Retornamos la respuesta
    return res.status(200).json({
      status: true,
      message: "Verification code verified successfully"
    });
  } catch (error) {
    //En caso de error
    return res.status(500).json({
      status: false,
      message: "Internal server error 500",
      error: error.message
    });
  }
};

//Creamos el método para restablecer la contraseña
adminRecoveryPasswordController.newPassword = async (req, res) => {
  try {
    //Solicitamos los datos
    const { newPassword, confirmPassword } = req.body;

    //Comparamos las contraseñas
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Passwords do not match"
      });
    }

    //Comprobamos que la constante verified que está en el token ya esté en true
    const token = req.cookies.recoveryCookie;
    const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);

    //Verificamos
    if (!decoded.verified) {
      return res.status(403).json({
        status: false,
        message: "Verification code not verified"
      });
    }

    //Encriptamos la contraseña
    const passwordHash = await bcrypt.hash(newPassword, 10);

    //Guardamos la contraseña
    const updatedAdmin = await adminModel.findOneAndUpdate(
      { email: decoded.email },
      { password: passwordHash },
      { new: true },
    );

    //Validamos existencia
    if (!updatedAdmin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found"
      });
    }

    //Limpiamos la cookie
    res.clearCookie("recoveryCookie");

    //Retornamos la respuesta
    return res.status(200).json({
      status: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    //En caso de error
    return res.status(500).json({
      status: false,
      message: "Internal server error 500",
      error: error.message
    });
  }
};

//Exportamos la función
export default adminRecoveryPasswordController;