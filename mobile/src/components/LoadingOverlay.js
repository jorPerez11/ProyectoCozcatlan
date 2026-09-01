import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default function LoadingOverlay({ label = "Cargando..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.orange} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  label: {
    marginTop: 12,
    color: colors.textMuted,
    fontSize: 14,
  },
});
