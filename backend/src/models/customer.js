import {Schema, model} from "mongoose";

const customerSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    }

}, {
    timestamps: true,
    strict: false
})