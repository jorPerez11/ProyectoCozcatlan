import { Schema, model } from "mongoose";

const employeeSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    dui: {
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
        type: String
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean
    },
    loginAttempts: {
        type: Number
    },
    timeOut: {
        type: Date
    },
}, {
    timestamps: true,
    strict: false
});

export default model("employees", employeeSchema, "employees");