import reviewModel from "../models/review.js";
import orderModel from "../models/order.js";
import "../models/client.js";

const reviewController = {};

// SELECT reseñas de un producto
reviewController.getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await reviewModel
            .find({ product_id: req.params.productId })
            .populate("client_id", "firstName lastName first_name last_name")
            .sort({ createdAt: -1 });

        return res.status(200).json(reviews);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// INSERT / UPDATE (una reseña por cliente y producto)
reviewController.createReview = async (req, res) => {
    try {
        const { product_id, client_id, rating, comment } = req.body;

        if (!product_id || !client_id || !rating) {
            return res.status(400).json({ message: "Faltan datos obligatorios" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "La calificación debe estar entre 1 y 5" });
        }

        // Solo puede valorar productos que haya comprado
        const hasPurchased = await orderModel.exists({
            client_id,
            "products.product_id": product_id,
        });

        if (!hasPurchased) {
            return res.status(403).json({ message: "Solo puedes valorar productos que hayas comprado" });
        }

        const review = await reviewModel.findOneAndUpdate(
            { product_id, client_id },
            { rating, comment: comment || "" },
            { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
        );

        return res.status(200).json({ message: "Reseña guardada exitosamente", review });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE
reviewController.deleteReview = async (req, res) => {
    try {
        const deletedReview = await reviewModel.findByIdAndDelete(req.params.id);

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        return res.status(200).json({ message: "Reseña eliminada exitosamente" });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default reviewController;
