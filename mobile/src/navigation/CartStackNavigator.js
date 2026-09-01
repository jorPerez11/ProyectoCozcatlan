import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/Cart/CartScreen";
import PaymentDetailsScreen from "../screens/Cart/PaymentDetailsScreen";
import { stackScreenOptions } from "./screenOptions";

const Stack = createNativeStackNavigator();

export default function CartStackNavigator() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="CartMain" component={CartScreen} options={{ title: "Mi carrito" }} />
      <Stack.Screen
        name="PaymentDetails"
        component={PaymentDetailsScreen}
        options={{ title: "Detalles del pago" }}
      />
    </Stack.Navigator>
  );
}
