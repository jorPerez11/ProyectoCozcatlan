import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { formatCurrency } from "../utils/format";

const placeholder = require("../../assets/placeholder.png");

export default function CartItemRow({ item, onIncrease, onDecrease, onRemove }) {
  const image = item.images?.[0]?.image;

  return (
    <View style={styles.row}>
      <Image source={image ? { uri: image } : placeholder} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.stock}>{item.stock > 0 ? "En stock" : "Agotado"}</Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={onIncrease}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.subtotal}>{formatCurrency(item.price * item.quantity)}</Text>
        <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
          <Ionicons name="trash-outline" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.navy,
  },
  stock: {
    fontSize: 12,
    color: colors.green,
    marginTop: 2,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 16,
    color: colors.navy,
    fontWeight: "700",
  },
  qtyValue: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
    color: colors.navy,
  },
  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  subtotal: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.navy,
  },
  removeBtn: {
    marginTop: 8,
  },
});
