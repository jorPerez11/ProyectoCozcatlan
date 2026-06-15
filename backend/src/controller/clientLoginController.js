//Importamos el Schema de la colección que vamos a utilizar
import clientModel from "../models/client.js";

//Importamos las librerías necesarias para realizar un login exitoso
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { config } from "../../config.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const loginClientController = {};

//Realizamos la función para la realización del login
loginClientController.login = async (req, res) => {
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
    const clientFound = await clientModel.findOne({ email });

    //Si no existe el correo en la base de datos
    if (!clientFound) {
      return res.status(404).json({
        status: false,
        message: "Email not found"
      });
    }

    //Verificamos si el usuario no está bloqueado dentro de la aplicación
    if (clientFound.loginAttempts && clientFound.timeOut > Date.now()) {
      return res.status(403).json({
        status: false,
        message: "User blocked temporarily"
      });
    }

    //Validamos la contraseña
    const isMatch = await bcryptjs.compare(password, clientFound.password);

    if (!isMatch) {
      //Si la contraseña no coincide, incrementamos los intentos de inicio de sesión
      clientFound.loginAttempts = (clientFound.loginAttempts || 0) + 1;

      if (clientFound.loginAttempts >= 3) {
        //Si se alcanzan los 3 intentos, bloqueamos al usuario durante 15 minutos
        clientFound.timeOut = new Date(Date.now() + 15 * 60 * 1000);
        clientFound.loginAttempts = 0;

        await clientFound.save();

        return res.status(403).json({
          status: false,
          message: "User blocked temporarily"
        });
      }

      //Guardamos el número de intentos de inicio de sesión en la base de datos
      await clientFound.save();

      return res.status(401).json({
        status: false,
        message: "Incorrect password"
      });
    }

    //Reseteamos los intentos de inicio de sesión y el tiempo de bloqueo si la contraseña es correcta
    clientFound.loginAttempts = 0;
    clientFound.timeOut = null;

    await clientFound.save();

    //Generamos el token JWT
    const token = jsonwebtoken.sign(
      { id: clientFound._id, userType: "Client" },
      config.JWT.SECRET,
      { expiresIn: "30d" },
    );

    //Guardamos el token en la cookie del cliente
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

export default loginClientController;