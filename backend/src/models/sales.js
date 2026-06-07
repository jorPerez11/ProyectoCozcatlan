import mongoose, {Schema, model} from "mongoose";

const salesSchema = new Schema ({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orden"
    },
    delivery_address:{
        type: String
    },
    payment_status: {
        type: String,
        default: "Pendiente"
    },
    purchase_date: {
        type: Date,
        default: Date.now
    },
    delivery_status: {
        type: String,
        default: "Pendiente"
    }

}, {
    timestamps: true,
    strict: false
});

export default model("sales", salesSchema, "sales");