import {Schema, model} from "mongoose";

const supplierSchema = new Schema({
    suppliers_name: {
        type: String
    },
    type_supplier:{
        type: String
    },
    phone: {
        type: Number
    },
    email:{
        type: String
    },
    address:{
        street: { type: String },
        neighborhood: { type: String }
    },
    status:{
        type: Boolean
    }
}, {
    timestamps: true,
    strict: false
})

export default model ("suppliers", supplierSchema, "suppliers");