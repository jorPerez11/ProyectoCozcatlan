import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../components/Screen";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import colors from "../../constants/colors";

const SOCIALS = ["logo-instagram", "logo-facebook", "logo-twitter", "logo-youtube"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactFields({ name, email, message }) {
  const errors = {};

  if (name.trim().length < 3) {
    errors.name = "Ingresa tu nombre completo.";
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }
  if (message.trim().length < 10) {
    errors.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
  }

  return errors;
}

export default function ContactScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSend = () => {
    const errors = validateContactFields({ name, email, message });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    Alert.alert("¡Gracias por escribirnos!", "Te responderemos lo antes posible.");
    setName("");
    setEmail("");
    setMessage("");
    setFieldErrors({});
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Contáctanos</Text>

        <View style={styles.formCard}>
          <TextField
            label="Nombre completo"
            placeholder="Ingresa tu nombre completo"
            value={name}
            onChangeText={setName}
            error={fieldErrors.name}
          />
          <TextField
            label="Correo electrónico"
            placeholder="Ingresa tu correo electrónico"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            error={fieldErrors.email}
          />
          <TextField
            label="Mensaje"
            placeholder="Ingresa tu mensaje"
            value={message}
            onChangeText={setMessage}
            multiline
            style={{ minHeight: 100, textAlignVertical: "top" }}
            error={fieldErrors.message}
          />
          <Button title="Enviar" onPress={handleSend} />
        </View>

        <Text style={styles.followTitle}>Síguenos</Text>
        <View style={styles.socialRow}>
          {SOCIALS.map((icon) => (
            <View key={icon} style={styles.socialIcon}>
              <Ionicons name={icon} size={20} color={colors.white} />
            </View>
          ))}
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="logo-whatsapp" size={22} color={colors.green} />
          <Text style={styles.infoText}>+503 7831-4183</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail" size={22} color={colors.green} />
          <Text style={styles.infoText}>contacto@cozcatlan.com</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.green,
    textAlign: "center",
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  followTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.green,
    marginTop: 28,
    marginBottom: 12,
  },
  socialRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: colors.green,
    fontWeight: "600",
  },
});
