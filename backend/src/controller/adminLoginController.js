//Importamos el Schema de la colección que vamos a utilizar
import adminsModel from "../models/admin.js";

//Importamos las librerías necesarias para realizar un login exitoso
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { config } from "../../config.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const loginAdminController = {};

//Realizamos la función para la realización del login
loginAdminController.login = async (req, res) => {
  //1. Solicitamos los datos
  const { email, password } = req.body;

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
    //2. Buscamos el correo electrónico en la base de datos
    const adminFound = await adminsModel.findOne({ email });

    //Si no existe el correo en la base de datos
    if (!adminFound) {
      return res.status(404).json({
        status: false,
        message: "Email not found"
      });
    }

    //Verificamos si el usuario no está bloqueado dentro de la aplicación
    if (adminFound.loginAttempts && adminFound.timeOut > Date.now()) {
      return res.status(403).json({
        status: false,
        message: "User temporarily blocked"
      });
    }

    //Validamos la contraseña
    const isMatch = await bcryptjs.compare(password, adminFound.password);

    if (!isMatch) {
      //Si la contraseña no coincide, incrementamos los intentos de inicio de sesión
      adminFound.loginAttempts = (adminFound.loginAttempts || 0) + 1;
      if (adminFound.loginAttempts >= 3) {
        //Si se alcanzan los 3 intentos, bloqueamos al usuario durante 15 minutos
        adminFound.timeOut = new Date(Date.now() + 15 * 60 * 1000);
        adminFound.loginAttempts = 0;

        await adminFound.save();

        return res.status(403).json({
          status: false,
          message: "User temporarily blocked"
        });
      }

      //Guardamos el número de intentos de inicio de sesión en la base de datos
      await adminFound.save();

      return res.status(401).json({
        status: false,
        message: "Invalid password"
      });
    }

    //Reseteamos los intentos de inicio de sesión y el tiempo de bloqueo si la contraseña es correcta
    adminFound.loginAttempts = 0;
    adminFound.timeOut = null;

    await adminFound.save();

    //Generamos el token JWT
    const token = jsonwebtoken.sign(
      { id: adminFound._id, userType: "Admin" },
      config.JWT.SECRET,
      { expiresIn: "30d" },
    );

    //Guardamos el token en la cookie del administrador
    res.cookie("authCookie", token);

    //Devolvemos la respuesta del login
    return res.status(200).json({
      status: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    //En caso de error de servidor, retornamos el error
    return res.status(500).json({
      status: false,
      message: "Internal server error 500",
      error: error.message
    });
  }
};

export default loginAdminController;