import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
    products: [
        {product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Producto"
        },
        amount: {
            type: Number
        },
        sub_total: {
            type: Number
        }
    }
    ],
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente"
    },
    total: {
        type: Number
    }
}, {
    timestamps: true,
    strict: false
});

export default model ("Orden", orderSchema)