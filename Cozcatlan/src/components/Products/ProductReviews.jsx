import React, { useEffect, useMemo, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "sonner";
import { useAuth } from "../../hooks/UseAuthClient.js";
import "./ProductReviews.css";

const API_REVIEWS = "http://localhost:4000/api/reviews";
const API_ORDERS = "http://localhost:4000/api/orders";

const getReviewerName = (client) => {
    if (!client) return "Cliente";
    const first = client.firstName || client.first_name || "";
    const last = client.lastName || client.last_name || "";
    const name = `${first} ${last}`.trim();
    return name || "Cliente";
};

const getClientId = (clientRef) => (clientRef && typeof clientRef === "object" ? clientRef._id : clientRef);

const StarPicker = ({ value, onChange }) => (
    <div className="d-flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className="reviews-star-input" onClick={() => onChange(n)}>
                {n <= value ? <FaStar /> : <FaRegStar />}
            </span>
        ))}
    </div>
);

const StarDisplay = ({ value }) => (
    <div className="d-flex gap-1 reviews-star">
        {[1, 2, 3, 4, 5].map((n) => (n <= Math.round(value) ? <FaStar key={n} /> : <FaRegStar key={n} />))}
    </div>
);

const ProductReviews = ({ productId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasPurchased, setHasPurchased] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${API_REVIEWS}/product/${productId}`);
            const data = await response.json().catch(() => []);
            setReviews(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al cargar las reseñas:", error);
            setReviews([]);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const load = async () => {
            setLoading(true);
            await fetchReviews();

            if (user?.id) {
                try {
                    const response = await fetch(`${API_ORDERS}/client/${user.id}`);
                    const orders = await response.json().catch(() => []);
                    const purchased =
                        Array.isArray(orders) &&
                        orders.some((order) =>
                            (order.products || []).some((item) => getClientId(item.product_id) === productId),
                        );
                    if (isMounted) setHasPurchased(purchased);
                } catch (error) {
                    console.error("Error al verificar la compra:", error);
                }
            }

            if (isMounted) setLoading(false);
        };

        load();

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId, user?.id]);

    const myExistingReview = user?.id
        ? reviews.find((review) => getClientId(review.client_id) === user.id)
        : null;

    // Si el cliente ya tiene una reseña, precargamos el formulario para editarla
    useEffect(() => {
        if (myExistingReview) {
            setRating(myExistingReview.rating);
            setComment(myExistingReview.comment || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myExistingReview?._id]);

    const average = useMemo(() => {
        if (reviews.length === 0) return 0;
        return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    }, [reviews]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating < 1) {
            toast.error("Selecciona una calificación de 1 a 5 estrellas");
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch(API_REVIEWS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id: productId,
                    client_id: user.id,
                    rating,
                    comment: comment.trim(),
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.message || "No se pudo guardar tu reseña");
            }

            toast.success(myExistingReview ? "Reseña actualizada" : "¡Gracias por tu reseña!");
            await fetchReviews();
        } catch (error) {
            toast.error(error.message || "No se pudo guardar tu reseña");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="reviews-section">
            <h3>Valoraciones y comentarios</h3>

            {reviews.length > 0 ? (
                <div className="reviews-summary">
                    <StarDisplay value={average} />
                    <span className="fw-bold">{average.toFixed(1)}</span>
                    <span className="text-muted">
                        ({reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"})
                    </span>
                </div>
            ) : (
                !loading && <p className="text-muted">Este producto todavía no tiene reseñas.</p>
            )}

            {user?.id && hasPurchased && (
                <form className="reviews-form" onSubmit={handleSubmit}>
                    <p className="fw-bold mb-2">
                        {myExistingReview ? "Edita tu reseña" : "Compraste este producto, ¡déjanos tu opinión!"}
                    </p>
                    <StarPicker value={rating} onChange={setRating} />
                    <textarea
                        className="form-control mt-2"
                        rows="3"
                        placeholder="Cuéntanos qué te pareció el producto (opcional)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button type="submit" className="reviews-submit-btn mt-2" disabled={submitting}>
                        {submitting ? "Guardando..." : myExistingReview ? "Actualizar reseña" : "Publicar reseña"}
                    </button>
                </form>
            )}

            {reviews.map((review) => (
                <div key={review._id} className="review-card">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <strong>{getReviewerName(review.client_id)}</strong>
                        <StarDisplay value={review.rating} />
                    </div>
                    {review.comment && <p className="mb-0 mt-1">{review.comment}</p>}
                </div>
            ))}
        </div>
    );
};

export default ProductReviews;
