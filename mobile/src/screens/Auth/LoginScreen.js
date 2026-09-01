import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "../../components/Screen";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import colors from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";
import { ApiError } from "../../api/client";

const logo = require("../../../assets/splash-icon.png");

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Ingresa tu correo y tu contraseña.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

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

          <Button title={loading ? "Ingresando..." : "Iniciar sesión"} onPress={handleSubmit} loading={loading} />

          <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.linkText}>
              ¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text>
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
    justifyContent: "center",
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.navy,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: 24,
  },
  error: {
    color: colors.danger,
    marginBottom: 12,
    textAlign: "center",
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
