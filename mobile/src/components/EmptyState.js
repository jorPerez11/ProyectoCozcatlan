import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

export default function EmptyState({ icon = "leaf-outline", title, subtitle }) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={40} color={colors.green} />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "700",
    color: colors.navy,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
  },
});
