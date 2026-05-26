import {Schema, model} from "mongoose";

const supplierSchema = new Schema({
    supplier_name: {
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
        type: String
    },
    status:{
        type: String
    }
}, {
    timestamps: true,
    strict: false
})

export default model ("Proveedor", supplierSchema);