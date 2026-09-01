import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import AuthNavigator from "./AuthNavigator";
import AppTabsNavigator from "./AppTabsNavigator";
import BrandSplash from "../components/BrandSplash";
import LoadingOverlay from "../components/LoadingOverlay";

export default function RootNavigator() {
  const { user, loading } = useAuth();
  const [showIntro, setShowIntro] = useState(true);

  // El splash nativo (app.json / expo-splash-screen) ya cumplió su función en
  // cuanto se montó el primer componente de React; a partir de aquí la
  // bienvenida animada (BrandSplash) toma el relevo como pantalla de carga.
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  if (showIntro) {
    return <BrandSplash onFinish={() => setShowIntro(false)} />;
  }

  if (loading) {
    return <LoadingOverlay label="Preparando tu sesión..." />;
  }

  return <NavigationContainer>{user ? <AppTabsNavigator /> : <AuthNavigator />}</NavigationContainer>;
}
