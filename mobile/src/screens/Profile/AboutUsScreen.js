import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Screen from "../../components/Screen";
import colors from "../../constants/colors";

const imgHistory = require("../../../assets/saco-granos.jpg");
const imgPilares = require("../../../assets/comal-barro.jpg");

export default function AboutUsScreen() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={imgHistory} style={styles.image} resizeMode="cover" />
        <Text style={styles.paragraph}>
          Todo comenzó en 2018, en la sala de espera de un aeropuerto. Observamos cómo las maletas de
          los salvadoreños no solo iban llenas de ropa, sino cargadas de olor a café, semita, bolsas
          de relajo y el deseo profundo de llevarse un pedacito de su tierra en el equipaje.
        </Text>
        <Text style={styles.paragraph}>
          Entendimos que el "hermano lejano" no solo extraña a su gente; extraña el ritual de la
          cocina. Surgimos con la misión de eliminar las fronteras para que nadie tenga que recorrer
          diez tiendas distintas para encontrar ese sabor exacto que le recuerda a su infancia.{" "}
          <Text style={styles.bold}>
            Cōzcatlan nace para ser el puente directo entre el campo salvadoreño y tu mesa, estés
            donde estés.
          </Text>
        </Text>

        <Image source={imgPilares} style={styles.image} resizeMode="cover" />
        <Text style={styles.paragraph}>
          En Cōzcatlan, no solo vendemos productos; preservamos nuestra cultura a través de tres
          pilares fundamentales:
        </Text>
        <View style={styles.pillar}>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Sabor 100% Auténtico: </Text>
            Seleccionamos ingredientes cultivados en nuestras tierras, garantizando el mismo sabor
            que encontrarías en un mercado local de Santa Ana o San Miguel.
          </Text>
        </View>
        <View style={styles.pillar}>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Apoyo a lo Local: </Text>
            Nuestros proveedores son agricultores y artesanos salvadoreños. Al elegirnos, apoyas
            directamente el sustento de familias que mantienen vivas nuestras tradiciones.
          </Text>
        </View>
        <View style={styles.pillar}>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Herramientas con Alma: </Text>
            Sabemos que una tortilla no sabe igual si no pasa por un comal de barro. Por eso, llevamos
            hasta tu puerta utensilios de aluminio fundido y madera tallada a mano.
          </Text>
        </View>
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
    height: 180,
    borderRadius: 14,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 14,
    color: colors.navy,
    lineHeight: 21,
    textAlign: "justify",
    marginBottom: 20,
  },
  bold: {
    fontWeight: "700",
  },
  pillar: {
    marginBottom: 4,
  },
});
