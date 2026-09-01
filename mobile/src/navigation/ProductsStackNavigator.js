import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsScreen from "../screens/Products/ProductsScreen";
import ProductDetailScreen from "../screens/Products/ProductDetailScreen";
import { stackScreenOptions } from "./screenOptions";

const Stack = createNativeStackNavigator();

export default function ProductsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="ProductsMain" component={ProductsScreen} options={{ title: "Productos" }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Detalle del producto" }}
      />
    </Stack.Navigator>
  );
}
