import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text } from "react-native";
import Screen from "../../components/Screen";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import colors from "../../constants/colors";
import { ordersApi } from "../../api/ordersApi";
import { salesApi } from "../../api/salesApi";
import { ApiError } from "../../api/client";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.match(/.{1,4}/g)?.join("-") || digits;
}

function formatExpiryDate(value) {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  if (digits.length >= 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

function formatCVV(value) {
  return value.replace(/\D/g, "").slice(0, 3);
}

function isValidExpiry(value) {
  const match = value.match(/^(\d{2})\/(\d{4})$/);
  if (!match) return false;
  const month = Number(match[1]);
  const year = Number(match[2]);
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
  if (year > currentYear + 20) return false;
  return true;
}

function validateFields({ direccion, titular, numeroTarjeta, vencimiento, cvv }) {
  const errors = {};

  if (direccion.trim().length < 5) {
    errors.direccion = "Ingresa una dirección más completa.";
  }
  if (!/^[A-Za-zÀ-ÿ\s]{3,}$/.test(titular.trim())) {
    errors.titular = "Ingresa el nombre completo del titular (solo letras).";
  }
  if (numeroTarjeta.replace(/\D/g, "").length !== 16) {
    errors.numeroTarjeta = "El número de tarjeta debe tener 16 dígitos.";
  }
  if (!isValidExpiry(vencimiento)) {
    errors.vencimiento = "Fecha inválida o ya vencida (mm/yyyy).";
  }
  if (!/^\d{3}$/.test(cvv)) {
    errors.cvv = "El CVV debe tener 3 dígitos.";
  }

  return errors;
}

export default function PaymentDetailsScreen({ navigation }) {
  const { items, clear } = useCart();
  const { user } = useAuth();

  const [direccion, setDireccion] = useState("");
  const [titular, setTitular] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      Alert.alert("Carrito vacío", "No tienes productos para procesar.", [
        { text: "OK", onPress: () => navigation.navigate("CartMain") },
      ]);
    }
    // Solo se evalúa al entrar a la pantalla; el carrito se vacía al terminar
    // la compra, momento en el que ya no importa si vuelve a quedar vacío.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setError("");

    const errors = validateFields({ direccion, titular, numeroTarjeta, vencimiento, cvv });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setError("Revisa los datos marcados en rojo.");
      return;
    }

    if (!user?.id) {
      setError("Debes iniciar sesión para completar la compra.");
      return;
    }

    setLoading(true);
    try {
      // El pedido y la venta se crean juntos aquí, solo cuando el pago se
      // confirma. Si algo falla, no se toca el carrito ni "Mis pedidos".
      const payloadProducts = items.map((item) => ({ product_id: item.id, amount: item.quantity }));
      const orderData = await ordersApi.create(user.id, payloadProducts);
      const orderId = orderData.orderId || orderData._id;

      await salesApi.create(orderId, direccion.trim());
      await clear();

      Alert.alert("¡Éxito!", "Su compra ha sido procesada exitosamente.", [
        {
          text: "OK",
          onPress: () => {
            // Regresa el stack del tab Carrito a su pantalla inicial antes de
            // salir, para que la próxima vez que se abra ese tab no se quede
            // pegada en "Detalles de pago".
            navigation.navigate("CartMain");
            navigation.navigate("Inicio");
          },
        },
      ]);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo procesar la compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Detalles del pago</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextField
          label="Dirección"
          placeholder="Calle, Colonia, Número de casa..."
          value={direccion}
          onChangeText={setDireccion}
          error={fieldErrors.direccion}
        />
        <TextField
          label="Titular de la tarjeta"
          placeholder="Nombre completo"
          value={titular}
          onChangeText={setTitular}
          error={fieldErrors.titular}
        />
        <TextField
          label="Número de tarjeta"
          placeholder="0000-0000-0000-0000"
          keyboardType="number-pad"
          value={numeroTarjeta}
          onChangeText={(v) => setNumeroTarjeta(formatCardNumber(v))}
          maxLength={19}
          error={fieldErrors.numeroTarjeta}
        />
        <TextField
          label="Fecha de vencimiento (mm/yyyy)"
          placeholder="00/0000"
          keyboardType="number-pad"
          value={vencimiento}
          onChangeText={(v) => setVencimiento(formatExpiryDate(v))}
          maxLength={7}
          error={fieldErrors.vencimiento}
        />
        <TextField
          label="Código de seguridad CVV"
          placeholder="123"
          keyboardType="number-pad"
          secureTextEntry
          value={cvv}
          onChangeText={(v) => setCvv(formatCVV(v))}
          maxLength={3}
          error={fieldErrors.cvv}
        />

        <Button title={loading ? "Procesando..." : "Finalizar compra"} onPress={handleSubmit} loading={loading} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.navy,
    marginBottom: 20,
  },
  error: {
    color: colors.danger,
    marginBottom: 12,
    textAlign: "center",
  },
});
