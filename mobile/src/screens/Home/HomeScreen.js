import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../../components/Screen";
import Button from "../../components/Button";
import colors from "../../constants/colors";

const hero = require("../../../assets/hero.jpg");
const pupusas = require("../../../assets/pupusas-salvadorenas.jpg");
const riguas = require("../../../assets/riguas.jpg");

export default function HomeScreen({ navigation }) {
  return (
    <Screen edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={hero} style={styles.hero} resizeMode="cover" />

        <View style={styles.section}>
          <Text style={styles.title}>Bienvenidos a Cōzcatlan</Text>
          <Text style={styles.paragraph}>
            Es un placer para nosotros dar a conocer nuestro país con nuestro sazón tradicional que
            viene impregnado con nuestra historia, compartiendo el sabor de nuestro hogar a todas
            partes.
          </Text>

          <Button
            title="Ver productos"
            onPress={() => navigation.navigate("Productos", { screen: "ProductsMain" })}
            style={styles.cta}
          />

          <View style={styles.gallery}>
            <Image source={pupusas} style={styles.galleryImage} resizeMode="cover" />
            <Image source={riguas} style={styles.galleryImage} resizeMode="cover" />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
  },
  hero: {
    width: "100%",
    height: 220,
  },
  section: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.green,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    color: colors.navy,
    lineHeight: 21,
    textAlign: "justify",
    marginBottom: 20,
  },
  cta: {
    marginBottom: 24,
  },
  gallery: {
    flexDirection: "row",
    gap: 12,
  },
  galleryImage: {
    flex: 1,
    height: 140,
    borderRadius: 12,
  },
});
