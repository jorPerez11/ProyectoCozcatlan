import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";

export default function StarRating({ value = 0, onChange, size = 20 }) {
  const editable = typeof onChange === "function";

  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= value;
        const Star = (
          <Ionicons
            key={star}
            name={filled ? "star" : "star-outline"}
            size={size}
            color={colors.orange}
            style={styles.star}
          />
        );
        if (!editable) return Star;
        return (
          <TouchableOpacity key={star} onPress={() => onChange(star)}>
            {Star}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  star: {
    marginRight: 2,
  },
});
