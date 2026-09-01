import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import OrderHistoryScreen from "../screens/Profile/OrderHistoryScreen";
import AboutUsScreen from "../screens/Profile/AboutUsScreen";
import ContactScreen from "../screens/Profile/ContactScreen";
import TermsScreen from "../screens/Profile/TermsScreen";
import { stackScreenOptions } from "./screenOptions";

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: "Mi perfil" }} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: "Mis pedidos" }} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ title: "Sobre nosotros" }} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: "Contacto" }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ title: "Términos y condiciones" }} />
    </Stack.Navigator>
  );
}
