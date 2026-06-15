//Importamos el Schema de la colección que vamos a utilizar
import clientModel from "../models/client.js";

//Creamos un array de métodos DENTRO de la carpeta controlador
const clientController = {};

//Realizamos el SELECT
//Creamos una función asíncrona que recibirá la req y la res
clientController.getClient = async (req, res) => {
  try {
    const client = await clientModel.find();
    //Devolvemos la respuesta
    return res.status(200).json({
      status: true,
      message: "Client retrieved successfully",
      client
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
clientController.updateClient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      clientType,
      NIT,
      DUI,
      isActive,
      isVerified,
      loginAttempts,
      timeOut,
    } = req.body;

    //Actualizar registro
    const updatedClient = await clientModel.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        phone,
        email,
        password,
        clientType,
        NIT,
        DUI,
        isActive,
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
    if (!updatedClient) {
      return res.status(404).json({
        status: false,
        message: "Client not found"
      });
    }

    //Retornamos respuesta 200 si se actualizó correctamente
    return res.status(200).json({
      status: true,
      message: "Client updated successfully",
      client: updatedClient
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
//Creamos una función asíncrona que recibirá la req y la res
clientController.deleteClient = async (req, res) => {
  try {
    //Esperamos la respuesta de la busqueda por ID mediante el método de eliminación
    const deletedClient = await clientModel.findByIdAndDelete(req.params.id);

    //Por si no existe el ID, validarlo y retornar un mensaje de error
    if (!deletedClient) {
      return res.status(404).json({
        status: false,
        message: "Client not found"
      });
    }

    //Eliminamos el registro
    return res.status(200).json({
      status: true,
      message: "Client deleted successfully"
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
export default clientController;