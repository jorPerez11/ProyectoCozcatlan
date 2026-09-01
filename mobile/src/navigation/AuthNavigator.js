import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import VerifyEmailScreen from "../screens/Auth/VerifyEmailScreen";
import { stackScreenOptions } from "./screenOptions";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "Crea tu cuenta" }} />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmailScreen}
        options={{ title: "Verifica tu correo" }}
      />
    </Stack.Navigator>
  );
}
