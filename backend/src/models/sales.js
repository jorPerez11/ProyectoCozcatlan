import mongoose, {Schema, model} from "mongoose";

const salesSchema = new Schema ({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orden"
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empleado"
    },
    delivery_address:{
        type: String
    },
    payment_method:{
        type: String
    },
    payment_status: {
        type: String
    },
    purchase_date: {
        type: Date
    },
    delivery_status: {
        type: String
    }

}, {
    timestamps: true,
    strict: false
});

