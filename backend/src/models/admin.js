import {Schema, model} from "mongoose";

const adminSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    status: {
        type: String
    }
}, {
    timestamps: true,
    strict: false
})

export default model ("Admin", adminSchema)