import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

const VARIANTS = {
  primary: { background: colors.orange, textColor: colors.white, border: "transparent" },
  secondary: { background: colors.navy, textColor: colors.white, border: "transparent" },
  outline: { background: "transparent", textColor: colors.navy, border: colors.navy },
  danger: { background: "transparent", textColor: colors.danger, border: colors.danger },
};

export default function Button({ title, onPress, variant = "primary", disabled, loading, style }) {
  const palette = VARIANTS[variant] || VARIANTS.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      style={[
        styles.base,
        { backgroundColor: palette.background, borderColor: palette.border },
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.textColor} />
      ) : (
        <Text style={[styles.text, { color: palette.textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.55,
  },
});
