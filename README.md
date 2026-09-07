# Proyecto Cozcatlan

Cōzcatlan (que en Náhuat significa "Lugar de Joyas") es un emprendimiento salvadoreño diseñado como un puente cultural para conectar a la diáspora y a entusiastas culinarios con la esencia de El Salvador.

Los integrantes de este proyecto son:
- Kevin Eduardo Castro Domínquez             20210033
- Christopher Alexander Morales Quijano      20240207
- Jorge Andrés Pérez Santos                  20240057
- Astrid Berenice Murgas Herrera             20240235

## Tecnologías a Utilizar

El proyecto se divide en capas estratégicas para garantizar escalabilidad y un rendimiento óptimo  en web 

### Frontend (Interfaz de Usuario)
<table border="0">
  <tr>
    <td><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></td>
    <td><b>React:</b> Biblioteca principal para la interfaz web.</td>
  </tr>

  <tr>
    <td><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></td>
    <td><b>Vite:</b> Entorno de desarrollo rápido para optimizar React.</td>
  </tr>
  <tr>
    <td><img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap"></td>
    <td><b>Bootstrap:</b> Framework de estilos para un diseño responsivo.</td>
  </tr>
</table>

## 🛠️ Tecnologías y Dependencias

| Tecnología | Descripción |
| :--- | :--- |
| **React 19** | Biblioteca principal para la construcción de interfaces basadas en componentes funcionales. |
| **Vite 8** | Herramienta de nueva generación que proporciona un entorno de desarrollo extremadamente rápido. |
| **Tailwind CSS 4** | Framework de CSS orientado a utilidades para un diseño moderno y altamente personalizado. |
| **Bootstrap 5** | Utilizado para componentes de UI consistentes y un sistema de rejilla (grid) responsivo. |
| **React Router 7** | Estándar para la navegación dinámica y gestión de rutas en aplicaciones de una sola página (SPA). |

---------------------------------------------------------------------------------------------------------------------------------------------------------

# Cozcatlán — App Móvil

Versión móvil (Expo / React Native) de la tienda pública de Cōzcatlan. Consume el mismo backend
y la misma base de datos que el sitio web (`../backend` y `../Cozcatlan`); no se duplica lógica de
negocio ni se crea una base de datos aparte.

## Tecnologías y dependencias

| Paquete | Uso |
| --- | --- |
| `expo` (SDK 57) | Framework base, splash screen, iconos, variables de entorno. |
| `react-navigation` (`native`, `native-stack`, `bottom-tabs`) | Navegación: tabs inferiores + stack por sección con botón de retroceso nativo. |
| `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler` | Dependencias nativas requeridas por React Navigation. |
| `@react-native-async-storage/async-storage` | Persistencia local del token de sesión y del carrito (equivalente a `localStorage` en la web). |
| `expo-splash-screen` | Splash screen nativo configurado en `app.json`. |
| `@expo/vector-icons` | Iconografía de la barra de navegación y de la UI. |

## Configuración y ejecución

1. Instala dependencias:
   ```
   npm install
   ```
2. Copia `.env.example` a `.env` y coloca la IP LAN de la PC donde corre el backend (**no** uses
   `localhost`: el teléfono no la puede resolver a la computadora).
   - En Windows: `ipconfig` → busca la "Dirección IPv4" del adaptador Wi‑Fi.
   - El teléfono y la PC deben estar en la misma red Wi‑Fi.
   - Revisa que el firewall de Windows permita conexiones entrantes al puerto 4000.
   ```
   EXPO_PUBLIC_API_URL=http://<TU-IP-LAN>:4000/api
   ```
3. Levanta el backend (desde `../backend`):
   ```
   npm run dev
   ```
4. Levanta la app:
   ```
   npx expo start
   ```
   Escanea el QR con Expo Go (Android/iOS) o presiona `a` para abrir un emulador Android.



