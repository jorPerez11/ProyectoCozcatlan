import React, { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../components/Screen";
import ProductCard from "../../components/ProductCard";
import EmptyState from "../../components/EmptyState";
import LoadingOverlay from "../../components/LoadingOverlay";
import colors from "../../constants/colors";
import { productsApi } from "../../api/productsApi";

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await productsApi.getAll();
        if (mounted) setProducts(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setError("No se pudieron cargar los productos.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category).filter(Boolean))],
    [products],
  );

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !category || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  if (loading) return <LoadingOverlay label="Cargando productos..." />;

  return (
    <Screen>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Buscar producto..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor={colors.textMuted}
        />
      </View>

      {categories.length > 0 && (
        <FlatList
          data={["Todas", ...categories]}
          horizontal
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          style={styles.chipsList}
          contentContainerStyle={styles.chipsRow}
          renderItem={({ item }) => {
            const active = item === "Todas" ? !category : category === item;
            return (
              <TouchableOpacity
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setCategory(item === "Todas" ? null : item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => navigation.navigate("ProductDetail", { id: item._id })} />
        )}
        ListEmptyComponent={
          <EmptyState icon="basket-outline" title="Sin resultados" subtitle="Prueba con otra búsqueda o categoría." />
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  chipsList: {
    flexGrow: 0,
    height: 72,
  },
  chipsRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    justifyContent: "center",
  },
  chipActive: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  chipText: {
    fontSize: 12,
    color: colors.navy,
    fontWeight: "600",
  },
  chipTextActive: {
    color: colors.white,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
  errorText: {
    color: colors.danger,
    textAlign: "center",
    marginTop: 8,
  },
});
