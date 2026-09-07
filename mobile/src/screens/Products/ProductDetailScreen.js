import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Screen from "../../components/Screen";
import Button from "../../components/Button";
import StarRating from "../../components/StarRating";
import LoadingOverlay from "../../components/LoadingOverlay";
import colors from "../../constants/colors";
import { productsApi } from "../../hooks/productsApi";
import { reviewsApi } from "../../hooks/reviewsApi";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { formatCurrency, formatDate } from "../../utils/format";
import { ApiError } from "../../hooks/client";

const placeholder = require("../../../assets/placeholder.png");

export default function ProductDetailScreen({ route }) {
  const { id } = route.params;
  const { addItem } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [savingReview, setSavingReview] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadReviews = useCallback(async () => {
    try {
      const data = await reviewsApi.getByProduct(id);
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      // silencioso: la sección de reseñas es secundaria a la ficha del producto
    }
  }, [id]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await productsApi.getById(id);
        if (mounted) setProduct(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    loadReviews();
    return () => {
      mounted = false;
    };
  }, [id, loadReviews]);

  if (loading) return <LoadingOverlay label="Cargando producto..." />;
  if (!product) return <LoadingOverlay label="Producto no encontrado." />;

  const image = product.images?.[0]?.image;
  const myReview = reviews.find((r) => r.client_id?._id === user?.id);
  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const handleAddToCart = async () => {
    const result = await addItem(id, quantity, product.stock);
    if (!result.ok) {
      if (result.available <= 0) {
        Alert.alert("Sin stock suficiente", `Ya tienes el máximo disponible (${product.stock} u.) en tu carrito.`);
      } else {
        Alert.alert("Límite de stock", `Solo quedan ${result.available} unidades disponibles para añadir.`);
      }
      return;
    }
    setQuantity(1);
    Alert.alert("Agregado", `${product.name} añadido al carrito.`);
  };

  const handleSaveReview = async () => {
    setReviewError("");
    if (!rating) {
      setReviewError("Selecciona una calificación.");
      return;
    }
    if (!user) {
      setReviewError("Debes iniciar sesión para dejar una reseña.");
      return;
    }
    setSavingReview(true);
    try {
      await reviewsApi.save(id, user.id, rating, comment);
      setRating(0);
      setComment("");
      await loadReviews();
    } catch (err) {
      setReviewError(
        err instanceof ApiError ? err.message : "No se pudo guardar tu reseña.",
      );
    } finally {
      setSavingReview(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!myReview) return;
    try {
      await reviewsApi.remove(myReview._id);
      await loadReviews();
    } catch {
      setReviewError("No se pudo eliminar tu reseña.");
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={image ? { uri: image } : placeholder} style={styles.image} resizeMode="cover" />

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Categoría: {product.category}</Text>
          <Text style={styles.metaText}>Stock: {product.stock} unidades</Text>
        </View>

        <View style={styles.qtyRow}>
          <View style={styles.qtyPicker}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
          <Button title="Añadir al carrito" onPress={handleAddToCart} style={{ flex: 1 }} />
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>
          Reseñas {reviews.length > 0 && `· ${averageRating.toFixed(1)} ★ (${reviews.length})`}
        </Text>

        {reviewError ? <Text style={styles.errorText}>{reviewError}</Text> : null}

        <View style={styles.reviewForm}>
          <Text style={styles.reviewFormLabel}>
            {myReview ? "Actualiza tu reseña" : "Deja tu reseña"}
          </Text>
          <StarRating value={rating || myReview?.rating || 0} onChange={setRating} />
          <TextInput
            placeholder="Cuéntanos qué te pareció..."
            placeholderTextColor={colors.textMuted}
            value={comment}
            onChangeText={setComment}
            multiline
            style={styles.commentInput}
          />
          <View style={styles.reviewFormActions}>
            <Button
              title={savingReview ? "Guardando..." : "Guardar reseña"}
              onPress={handleSaveReview}
              loading={savingReview}
              variant="secondary"
            />
            {myReview ? (
              <TouchableOpacity onPress={handleDeleteReview} style={{ marginTop: 8 }}>
                <Text style={styles.deleteLink}>Eliminar mi reseña</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {reviews.map((review) => (
          <View key={review._id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewAuthor}>
                {review.client_id?.firstName || "Cliente"} {review.client_id?.lastName || ""}
              </Text>
              <Text style={styles.reviewDate}>{formatDate(review.createdAt)}</Text>
            </View>
            <StarRating value={review.rating} size={14} />
            {review.comment ? <Text style={styles.reviewComment}>{review.comment}</Text> : null}
          </View>
        ))}

        {reviews.length === 0 && (
          <Text style={styles.emptyReviews}>Todavía no hay reseñas para este producto.</Text>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 14,
    backgroundColor: colors.card,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.navy,
    marginTop: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.green,
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: 10,
  },
  metaRow: {
    marginTop: 12,
  },
  metaText: {
    fontSize: 13,
    color: colors.navy,
    marginBottom: 4,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },
  qtyPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: "hidden",
  },
  qtyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.card,
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.navy,
  },
  qtyValue: {
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: "600",
    color: colors.navy,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.navy,
    marginBottom: 12,
  },
  errorText: {
    color: colors.danger,
    marginBottom: 10,
  },
  reviewForm: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 16,
  },
  reviewFormLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.navy,
    marginBottom: 8,
  },
  commentInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 10,
    minHeight: 60,
    textAlignVertical: "top",
    color: colors.textPrimary,
  },
  reviewFormActions: {
    marginTop: 12,
  },
  deleteLink: {
    color: colors.danger,
    fontSize: 12,
    textAlign: "center",
  },
  reviewCard: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  reviewAuthor: {
    fontWeight: "600",
    color: colors.navy,
    fontSize: 13,
  },
  reviewDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  reviewComment: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textMuted,
  },
  emptyReviews: {
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 8,
  },
});
