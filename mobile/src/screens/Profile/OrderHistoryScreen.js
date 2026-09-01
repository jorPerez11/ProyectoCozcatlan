import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Screen from "../../components/Screen";
import EmptyState from "../../components/EmptyState";
import LoadingOverlay from "../../components/LoadingOverlay";
import colors from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";
import { ordersApi } from "../../api/ordersApi";
import { formatCurrency, formatDate } from "../../utils/format";

const placeholder = require("../../../assets/placeholder.png");

const STATUS_COLORS = {
  Pendiente: colors.orange,
  Preparando: colors.cyan,
  "En camino": colors.cyan,
  Entregado: colors.green,
};

export default function OrderHistoryScreen() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await ordersApi.getByClient(user.id);
        if (mounted) setOrders(Array.isArray(data) ? data : []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user.id]);

  if (loading) return <LoadingOverlay label="Cargando tus pedidos..." />;

  return (
    <Screen>
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.orderId}>Pedido #{item._id.slice(-6).toUpperCase()}</Text>
                <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
              </View>
              <View
                style={[
                  styles.statusPill,
                  { backgroundColor: STATUS_COLORS[item.delivery_status] || colors.orange },
                ]}
              >
                <Text style={styles.statusText}>{item.delivery_status}</Text>
              </View>
            </View>

            {(item.products || []).map((p) => (
              <View key={p._id} style={styles.productRow}>
                <Image
                  source={p.product_id?.images?.[0]?.image ? { uri: p.product_id.images[0].image } : placeholder}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {p.product_id?.name || "Producto eliminado"}
                  </Text>
                  <Text style={styles.productQty}>Cantidad: {p.amount}</Text>
                </View>
                <Text style={styles.productSubtotal}>{formatCurrency(p.sub_total)}</Text>
              </View>
            ))}

            <View style={styles.cardFooter}>
              <Text style={styles.address} numberOfLines={1}>
                {item.delivery_address ? `Entrega en: ${item.delivery_address}` : "Sin dirección registrada"}
              </Text>
              <Text style={styles.total}>Total: {formatCurrency(item.total)}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState icon="receipt-outline" title="Sin pedidos" subtitle="Todavía no has realizado ningún pedido." />
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    flexGrow: 1,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.navy,
  },
  orderDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.white,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: colors.background,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.navy,
  },
  productQty: {
    fontSize: 12,
    color: colors.textMuted,
  },
  productSubtotal: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.navy,
  },
  cardFooter: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  address: {
    flex: 1,
    fontSize: 11,
    color: colors.textMuted,
  },
  total: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.green,
  },
});
