import employeeModel from "../models/employee.js"; // Se importa el modelo del employee
import bcrypt from "bcryptjs"; // Se importa la libreria bcryptjs para encriptar contraseña
import jsonwebtoken from "jsonwebtoken"; // Se importla la libreria jsonwebtoken para el token y cookie
import { config } from "../../config.js" // Se importa el archivo config

const employeeLoginController = {}; // Se define el array de funciones

employeeLoginController.login = async (req, res) => {
    // Se solicitan los datos 
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Se valida 
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    try {
        const employeeFound = await employeeModel.findOne({ email });
        if (!employeeFound) {
            return res.status(400).json({ message: "Employee not found" });
        }

        // Se verifica si el usuario esta bloqueado
        if (employeeFound.timeOut && employeeFound.timeOut > Date.now()) {
            return res.status(403).json({ message: "Account blocked" });
        }
        // Se valida la contraseña
        const isMatch = await bcrypt.compare(password, employeeFound.password);

        if (!isMatch) {
            employeeFound.loginAttempts = (employeeFound.loginAttempts || 0) + 1;

            // Si llega a 5 intentos fallidos se bloquea la cuenta ACA
            if (employeeFound.loginAttempts >= 5) {
                employeeFound.timeOut = Date.now() + 5 * 60 * 1000;
                employeeFound.loginAttempts = 0;

                await employeeFound.save();

                return res.status(403).json({ message: "Account blocked due to multiple failed login attempts"});
            }

            await employeeFound.save();
            return res.status(400).json({ message: "Incorrect password" })
        };

        // Resetear intentos si el login correcto
        employeeFound.loginAttempts = 0;
        employeeFound.timeOut = null;
        await employeeFound.save();

        // Se genera el token
        const token = jsonwebtoken.sign(
            // #1 - Que datos se van a guardar
            { id: employeeFound._id, userType: "Employee" },
            // #2 - secret key
            config.JWT.SECRET,
            // #3 - cuando expira
            { expiresIn: "30d" },
        );

        // El token se guarda en una cookie
        res.cookie("authCookie", token);
        return res.status(200).json({ message: "Login successful",token });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error 500 " + error });
    }
};

export default employeeLoginController;
