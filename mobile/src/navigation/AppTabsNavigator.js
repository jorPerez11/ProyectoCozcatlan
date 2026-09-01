import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStackNavigator from "./HomeStackNavigator";
import ProductsStackNavigator from "./ProductsStackNavigator";
import CartStackNavigator from "./CartStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import colors from "../constants/colors";
import { useCart } from "../context/CartContext";

const Tab = createBottomTabNavigator();

const ICONS = {
  Inicio: "home",
  Productos: "list",
  Carrito: "cart",
  Perfil: "person",
};

export default function AppTabsNavigator() {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.navy, borderTopWidth: 0 },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={`${ICONS[route.name]}${focused ? "" : "-outline"}`} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStackNavigator} />
      <Tab.Screen name="Productos" component={ProductsStackNavigator} />
      <Tab.Screen
        name="Carrito"
        component={CartStackNavigator}
        options={{ tabBarBadge: cartCount > 0 ? cartCount : undefined }}
      />
      <Tab.Screen name="Perfil" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}
