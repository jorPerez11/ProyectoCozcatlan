import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Screen from "../../components/Screen";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import colors from "../../constants/colors";
import { authApi } from "../../api/authApi";
import { ApiError } from "../../api/client";

export default function VerifyEmailScreen({ route, navigation }) {
  const email = route.params?.email;
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setError("");
    if (!code) {
      setError("Ingresa el código de verificación.");
      return;
    }
    setLoading(true);
    try {
      await authApi.verifyEmailCode(code);
      setSuccess(true);
      setTimeout(() => navigation.navigate("Login"), 1200);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "No se pudo verificar el código. Intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.title}>Verifica tu correo</Text>
        <Text style={styles.subtitle}>
          Enviamos un código de 6 caracteres a{email ? ` ${email}` : " tu correo"}. Ingrésalo para
          activar tu cuenta.
        </Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>¡Cuenta verificada! Redirigiendo...</Text> : null}

        <TextField
          label="Código de verificación"
          placeholder="Ej. a1b2c3"
          autoCapitalize="none"
          value={code}
          onChangeText={setCode}
        />

        <Button title={loading ? "Verificando..." : "Verificar"} onPress={handleVerify} loading={loading} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.navy,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 24,
    lineHeight: 19,
  },
  error: {
    color: colors.danger,
    marginBottom: 12,
    textAlign: "center",
  },
  success: {
    color: colors.green,
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "600",
  },
});
