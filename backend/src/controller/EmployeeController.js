import employeeModel from "../models/employee.js"; // Se importa el modelo del employee

const employeeController = {}; // Se inicializa el arra de funciones 

// Función del SELECT de Employee
employeeController.getEmployee = async (req, res) => {
    try {
        const employees = await employeeModel.find(); // Se manda a hacer un find de todos los Employee a la base de datos
        return res.status(200).json({ status: true, message: "Employee retrieved successfully", employees }); // Si los encuentra retorna un 200 y muestra los Employee
    }
    catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error 500 " + error, error: error.message });
    }
};

// Función del UPDATE de employee
employeeController.updateEmployee = async (req, res) => {
    try {
        // #1 Se solicitan los datos a actualizar del Employee
        const {
            firstName,
            lastName,
            phone,
            email,
            password,
            DUI,
            address,
            isActive,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body;

       

      

        const employeUpdate = await employeeModel.findByIdAndUpdate(
            req.params.id,
            {
                firstName,
                lastName,
                phone,
                email,
                password,
                DUI,
                address,
                isActive,
                isVerified,
                loginAttempts,
                timeOut
            },
            {
                //Se incluyen estas opciones para que nos devuelva el documento actualizado y el runValidators: true le dice a mongoose que vuelva al modelEmployee a revisar las validaciones antes de actualizar los campos, ya que si no se pone el runValidators al hacer el actualizar mongoose no validara los campos.
                new: true, runValidators: true
            },

        );

        if (!employeUpdate) {
            return res.status(404).json({ status: false, message: "Employee not found" });
        }
        return res.status(200).json({ status: true, message: "Employee updated successfully", employee: employeUpdate });
    }
    catch (error) {
        //Esto es lo que nos mostrara al activar el runValidators: las validaciones de mongoose para verificar cada campo que se actualiza cumplan con sus requerimientos
        // Este if la condición es que si el usuario quiere actualizar un campo, pero si ese campo no cumple con las validaciones entonces
        if (error.name === 'ValidationError') {
            // Se creara una const de los errores, donde Object creara un Array que saldra en forma de map como un recorrido de los campos que no cumplan las validaciones 
            // field: es el campo y con el err.path mongoose ira a buscar el nombre del campo que tiene el erro de validación
            // message : saldra el mensaje de porque el campo no cumple con la validación, esa es la función del err.message
            const errors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            //Luego mostrara el error 400 con el status: false que el update no se pudo realizar, saldra el mensaje que dira error de validación y posteriormente lanzaran todos los campos que no cumplan con las validaciones, errors: es la const que creamos arriba para manejar el array de los campos con sus validaciones
            return res.status(400).json({ status: false, message: 'Validation error', errors });
        }
        return res.status(500).json({ status: false, message: "Internal server error 500 " + error, error: error.message });
    }
};

// Eliminar
employeeController.deleteEmployee = async (req, res) => {
    try {
        const deleteEmployee = await employeeModel.findByIdAndDelete(req.params.id);

        // Si no se elimina es porque no encontro el ID
        if (!deleteEmployee) {
            return res.status(404).json({ status: false, message: "Employee not found" });
        }
        return res.status(200).json({ status: true, message: "Employee deleted successfully" });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error 500 " + error, error: error.message });
    }
};

export default employeeController; // Se exporta para poder utilizar los métodos en otros archivos
