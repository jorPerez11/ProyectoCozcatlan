
import mongoose, {Schema, model} from "mongoose";

const productSchema = new Schema({
    name: {
        type: String
    },
    images: [{
        image: {
            type: String
        },
        public_id: {
            type: String
        }
    }],
    category: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    description: {
        type: String
    },
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proveedor"
    },

}, {
    timestamps: true,
    strict: false
});

export default model ("Producto", productSchema);