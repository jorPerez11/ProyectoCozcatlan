//Importamos el Schema de la colección que vamos a utilizar
import adminModel from "../models/admin.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const adminController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la req y la res
adminController.getAdmin = async (req, res) => {
    try {
        const admin = await adminModel.find();

        //Devolvemos la respuesta
        return res.status(200).json({
            status: true,
            message: "Admin retrieved successfully",
            admin
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

//Realizamos el UPDATE
//Creamos una función asíncrona que recibirá la req y la res
adminController.updateAdmin = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut,
        } = req.body;

        //Actualizar registro
        const updatedAdmin = await adminModel.findByIdAndUpdate(
            req.params.id,
            {
                firstName,
                lastName,
                email,
                password,
                isVerified,
                loginAttempts,
                timeOut,
            },
            {
                //Se incluyen las validaciones de mongoose realizadas en el modelo para verificar que cada campo cumpla con los requerimientos
                new: true,
                runValidators: true
            }
        );

        //Validar existencia
        if (!updatedAdmin) {
            return res.status(404).json({
                status: false,
                message: "Admin not found"
            });
        }

        //Retornamos respuesta 200 si se actualizó correctamente
        return res.status(200).json({
            status: true,
            message: "Admin updated successfully",
            admin: updatedAdmin
        });
    } catch (error) {

        //Aplicamos las validaciones de mongoose para verificar cada campo que se actualiza cumplan con sus requerimientos
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

//Realizamos el DELETE
adminController.deleteAdmin = async (req, res) => {
    try {
        //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
        const deletedAdmin = await adminModel.findByIdAndDelete(req.params.id);

        //Por si no existe el ID, validarlo y retornar un mensaje de error
        if (!deletedAdmin) {
            return res.status(404).json({
                status: false,
                message: "Admin not found"
            });
        }

        //Eliminamos el registro
        return res.status(200).json({
            status: true,
            message: "Admin deleted successfully"
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

//Exportamos TODO
export default adminController;