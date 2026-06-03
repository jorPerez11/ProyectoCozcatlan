import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        amount: {
          type: Number,
        },
        sub_total: {
          type: Number,
        },
      },
    ],
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clients",
    },
    total: {
      type: Number,
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("orders", orderSchema, "orders");
