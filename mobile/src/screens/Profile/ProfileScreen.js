import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../components/Screen";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import LoadingOverlay from "../../components/LoadingOverlay";
import colors from "../../constants/colors";
import { useAuth } from "../../context/AuthContext";
import { clientApi } from "../../hooks/clientApi";
import { ApiError } from "../../hooks/client";

const MENU_ITEMS = [
  { label: "Mis pedidos", icon: "receipt-outline", route: "OrderHistory" },
  { label: "Sobre nosotros", icon: "information-circle-outline", route: "AboutUs" },
  { label: "Contacto", icon: "mail-outline", route: "Contact" },
  { label: "Términos y condiciones", icon: "document-text-outline", route: "Terms" },
];

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await clientApi.getById(user.id);
        if (mounted && data) {
          setClient(data);
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setEmail(data.email || "");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user.id]);

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      await clientApi.update(user.id, { firstName, lastName, email });
      setSuccess("Tus datos se actualizaron correctamente.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudieron guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar cuenta",
      "Esta acción no se puede deshacer. ¿Seguro que quieres eliminar tu cuenta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await clientApi.remove(user.id);
              await logout();
            } catch {
              Alert.alert("Error", "No se pudo eliminar la cuenta.");
            }
          },
        },
      ],
    );
  };

  const handleLogout = () => {
    Alert.alert("¿Cerrar sesión?", "Estás seguro de que quieres cerrar tu sesión.", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sí, salir", onPress: logout },
    ]);
  };

  if (loading) return <LoadingOverlay label="Cargando tu perfil..." />;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Mi perfil</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}

        <TextField label="Nombre" value={firstName} onChangeText={setFirstName} />
        <TextField label="Apellido" value={lastName} onChangeText={setLastName} />
        <TextField
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Button title={saving ? "Guardando..." : "Guardar cambios"} onPress={handleSave} loading={saving} />

        <View style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.route}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}
            >
              <Ionicons name={item.icon} size={20} color={colors.navy} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <Button title="Cerrar sesión" onPress={handleLogout} variant="outline" style={{ marginTop: 24 }} />
        <TouchableOpacity onPress={handleDeleteAccount} style={styles.deleteRow}>
          <Text style={styles.deleteText}>Eliminar mi cuenta</Text>
        </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: "700",
    color: colors.navy,
    marginBottom: 16,
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
  menu: {
    marginTop: 28,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.navy,
    fontWeight: "500",
  },
  deleteRow: {
    marginTop: 16,
    alignItems: "center",
  },
  deleteText: {
    color: colors.danger,
    fontSize: 13,
  },
});
