import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";
import { formatCurrency } from "../utils/format";

const placeholder = require("../../assets/placeholder.png");

export default function ProductCard({ product, onPress }) {
  const image = product.images?.[0]?.image;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={image ? { uri: image } : placeholder} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: colors.card,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: "100%",
    height: 120,
    backgroundColor: colors.background,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.navy,
    minHeight: 34,
  },
  price: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
    color: colors.green,
  },
});
