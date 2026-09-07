import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../components/Screen";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import colors from "../../constants/colors";
import { authApi } from "../../hooks/authApi";
import { ApiError } from "../../hooks/client";

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!firstName || !lastName || !email || !password) {
      setError("Completa todos los campos.");
      return;
    }
    if (!acceptedTerms) {
      setError("Debes aceptar los Términos y Condiciones.");
      return;
    }

    setLoading(true);
    try {
      await authApi.register({ firstName, lastName, email, password });
      navigation.navigate("VerifyEmail", { email });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Crea tu cuenta</Text>
          <Text style={styles.subtitle}>Bienvenido. Empecemos con una nueva cuenta.</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextField label="Nombre" placeholder="Ingresa tu nombre" value={firstName} onChangeText={setFirstName} />
          <TextField label="Apellido" placeholder="Ingresa tu apellido" value={lastName} onChangeText={setLastName} />
          <TextField
            label="Dirección de correo electrónico"
            placeholder="Ingresa tu correo electrónico"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextField
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.termsRow} onPress={() => setAcceptedTerms((v) => !v)}>
            <Ionicons
              name={acceptedTerms ? "checkbox" : "square-outline"}
              size={22}
              color={colors.green}
            />
            <Text style={styles.termsText}>
              He leído y acepto los <Text style={styles.termsLink}>Términos y Condiciones</Text>
            </Text>
          </TouchableOpacity>

          <Button title={loading ? "Registrando..." : "Registrarse"} onPress={handleSubmit} loading={loading} />

          <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>
              ¿Ya tienes cuenta? <Text style={styles.linkBold}>Inicia sesión</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.green,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 20,
  },
  error: {
    color: colors.danger,
    marginBottom: 12,
    textAlign: "center",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 4,
  },
  termsText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: colors.textMuted,
  },
  termsLink: {
    color: colors.orange,
    fontWeight: "700",
  },
  linkRow: {
    marginTop: 18,
    alignItems: "center",
  },
  linkText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  linkBold: {
    color: colors.orange,
    fontWeight: "700",
  },
});
