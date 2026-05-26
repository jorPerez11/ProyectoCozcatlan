import {Schema, model} from "mongoose";

const employeeSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    nit: {
        type: String
    },
    birthday: {
        type: Date
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    },
    salary: {
        type: Number
    },
    afp: { //número único previsional del empleado
        type: String
    },
    status: {
        type: String
    }

}, {
    timestamps: true,
    strict: false
});

export default model ("Empleado", employeeSchema);