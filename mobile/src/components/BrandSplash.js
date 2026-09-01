import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

const mark = require("../../assets/splash-icon.png");

// Pantalla de bienvenida personalizada que se muestra una vez oculto el splash
// nativo, antes de resolver si hay sesión activa o no.
export default function BrandSplash({ onFinish, duration = 1400 }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onFinish?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish, opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity, alignItems: "center" }}>
        <Image source={mark} style={styles.mark} resizeMode="contain" />
        <Text style={styles.title}>Cōzcatlan</Text>
        <Text style={styles.subtitle}>El sabor de tu hogar</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.navy,
  },
  mark: {
    width: 140,
    height: 140,
  },
  title: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: colors.green,
    fontWeight: "600",
  },
});
