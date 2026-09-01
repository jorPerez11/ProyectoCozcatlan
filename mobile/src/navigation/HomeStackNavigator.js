import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import ProductDetailScreen from "../screens/Products/ProductDetailScreen";
import { stackScreenOptions } from "./screenOptions";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: "Cozcatlán" }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Detalle del producto" }}
      />
    </Stack.Navigator>
  );
}
