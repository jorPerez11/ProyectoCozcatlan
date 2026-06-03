import {Schema, model} from "mongoose";

const clientSchema = new Schema({
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

export default model ("Cliente", clientSchema)