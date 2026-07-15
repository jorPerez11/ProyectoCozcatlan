import mongoose, { Schema, model } from "mongoose";

const reviewSchema = new Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
        },
        client_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "clients",
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        comment: {
            type: String,
        },
    },
    {
        timestamps: true,
        strict: false,
    },
);

export default model("reviews", reviewSchema, "reviews");
