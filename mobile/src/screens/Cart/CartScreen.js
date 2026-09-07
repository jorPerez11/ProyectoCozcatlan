import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Screen from "../../components/Screen";
import CartItemRow from "../../components/CartItemRow";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import LoadingOverlay from "../../components/LoadingOverlay";
import colors from "../../constants/colors";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { productsApi } from "../../hooks/productsApi";
import { formatCurrency } from "../../utils/format";

export default function CartScreen({ navigation }) {
  const { items, loaded, updateQuantity, removeItem, clear } = useCart();
  const { user } = useAuth();

  const [hydrated, setHydrated] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!loaded) return;
      if (items.length === 0) {
        setHydrated([]);
        setLoadingProducts(false);
        return;
      }
      setLoadingProducts(true);
      try {
        const products = await Promise.all(
          items.map(async (item) => {
            const product = await productsApi.getById(item.id);
            return { ...product, quantity: item.quantity };
          }),
        );
        if (mounted) setHydrated(products);
      } finally {
        if (mounted) setLoadingProducts(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [items, loaded]);

  const subtotal = hydrated.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleClearCart = () => {
    Alert.alert("¿Vaciar carrito?", "Se eliminarán todos los productos.", [
      { text: "Cancelar", style: "cancel" },
      { text: "Vaciar", style: "destructive", onPress: clear },
    ]);
  };

  const handleCheckout = () => {
    if (!user?.id) {
      Alert.alert("Inicia sesión", "Debes iniciar sesión para finalizar tu compra.");
      return;
    }
    // El pedido (orden + venta) se crea hasta que se completa el formulario
    // de "Detalles de pago", no antes: así el carrito no se vacía ni aparece
    // nada en "Mis pedidos" si el usuario sale sin terminar de pagar.
    navigation.navigate("PaymentDetails");
  };

  if (!loaded || loadingProducts) return <LoadingOverlay label="Cargando tu carrito..." />;

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Mi carrito</Text>
        {hydrated.length > 0 && (
          <TouchableOpacity onPress={handleClearCart}>
            <Text style={styles.clearLink}>Vaciar carrito</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={hydrated}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CartItemRow
            item={item}
            onIncrease={() => updateQuantity(item._id, 1)}
            onDecrease={() => updateQuantity(item._id, -1)}
            onRemove={() => removeItem(item._id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState icon="cart-outline" title="Tu carrito está vacío" subtitle="Agrega productos desde la tienda." />
        }
      />

      {hydrated.length > 0 && (
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
          </View>
          <Button title="Finalizar compra" onPress={handleCheckout} />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.navy,
  },
  clearLink: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "600",
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  summary: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.navy,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.green,
  },
});
