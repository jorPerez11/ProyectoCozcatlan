# Cozcatlán — App Móvil

Versión móvil (Expo / React Native) de la tienda pública de Cōzcatlan. Consume el mismo backend
y la misma base de datos que el sitio web (`../backend` y `../Cozcatlan`); no se duplica lógica de
negocio ni se crea una base de datos aparte.

Integrantes del equipo:

- Kevin Eduardo Castro Domínquez — 20210033
- Christopher Alexander Morales Quijano — 20240207
- Jorge Andrés Pérez Santos — 20240057
- Astrid Berenice Murgas Herrera — 20240235

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

## Alcance funcional

Se adaptó la tienda pública completa (todo lo que en la web vive bajo `PrivateRouteClient`,
excluyendo administración, empleados, proveedores y dashboard):

- **Autenticación**: inicio de sesión y registro (con verificación de correo) contra
  `POST /api/client/loginClient` y `POST /api/client/registerClient`.
- **Inicio**: bienvenida de marca, igual que `Home.jsx` en la web.
- **Productos**: listado con búsqueda y filtro por categoría, detalle de producto.
- **Reseñas**: ver, crear/actualizar y eliminar reseñas de un producto (`/api/reviews`).
- **Carrito**: agregar/quitar/ajustar cantidades (persistido en el dispositivo). "Finalizar compra"
  en el carrito solo navega a "Detalles de pago"; la orden (`/api/orders`) y la venta (`/api/sales`)
  se crean juntas ahí, y solo si el formulario de pago se envía con éxito — así el carrito no se
  vacía ni aparece nada en "Mis pedidos" si el usuario sale sin completar el pago. **Nota:** esto es
  distinto al sitio web (`ShoppingCart.jsx`), donde la orden se crea y el carrito se vacía apenas se
  toca "Finalizar Compra" en el carrito, antes de llenar los datos de pago — se corrigió solo en la
  app móvil porque no requería tocar el backend ni el frontend web.
- **Mis pedidos**: historial de compras del cliente (`/api/orders/client/:id`).
- **Perfil**: ver/editar datos del cliente, eliminar cuenta (`/api/client/:id`) y cerrar sesión.
- **Sobre nosotros, Contacto y Términos y Condiciones**: contenido estático igual al del sitio web.

Con esto la app hace CRUD real contra **clients, products, orders, reviews y sales** (5 de las
colecciones del lado cliente).

### Fuera de alcance: recuperar contraseña

El flujo de "recuperar contraseña" del backend (`clientRecoveryPasswordController.js`) depende de
una cookie `secure: true, sameSite: 'none'`. Las cookies `secure` solo se guardan sobre HTTPS, y la
app habla con el backend por HTTP simple a la IP LAN (no hay certificado TLS en desarrollo), así
que ese flujo no puede funcionar de forma confiable desde el teléfono. Tampoco aparece en las
capturas de Figma que se usaron como referencia, así que se dejó fuera del alcance móvil.

### Nota técnica: verificación de correo en el registro

El registro sí funciona porque el login devuelve el JWT en el cuerpo de la respuesta (no depende de
cookies), y la verificación de correo usa una cookie normal (sin `secure`), que debería viajar bien
con `fetch(..., { credentials: 'include' })` en un dispositivo real o emulador. Si en algún entorno
particular esa cookie no llega, es un problema de las cookies de sesión de Express/React Native, no
de la app: la solución sería que el backend devuelva también el código en el cuerpo de la respuesta
en vez de solo en la cookie.

## Estructura de carpetas

```
mobile/
  App.js                  # Mínimo: providers + RootNavigator
  app.json                # Config de Expo: nombre, icono, adaptive-icon, splash
  assets/                 # icon.png, android-icon-foreground.png, splash-icon.png, imágenes
  src/
    api/                  # Cliente fetch + un archivo por recurso del backend
    constants/             # Paleta de colores de marca, contenido estático de Términos
    context/               # AuthContext (sesión) y CartContext (carrito)
    components/            # Piezas reutilizables: Button, TextField, ProductCard, CartItemRow...
    navigation/             # RootNavigator, AuthNavigator, tabs y un stack por sección
    screens/
      Auth/    Home/    Products/    Cart/    Profile/
    utils/                  # Decodificación de JWT, formato de moneda/fecha
```

- **`App.js`** se mantiene mínimo: solo monta los providers (`AuthProvider`, `CartProvider`,
  `SafeAreaProvider`) y `RootNavigator`.
- **Navegación**: `RootNavigator` decide entre `AuthNavigator` (sin sesión) y `AppTabsNavigator`
  (con sesión). Los 4 tabs (Inicio, Productos, Carrito, Perfil) replican los íconos de la barra
  inferior de las capturas de Figma. Cada tab tiene su propio Stack, así que cualquier pantalla
  fuera del menú (detalle de producto, pago, mis pedidos, sobre nosotros, contacto, términos)
  obtiene automáticamente un header con botón de "atrás".
- **Splash / carga**: el splash nativo (`app.json` + `expo-splash-screen`) se oculta apenas monta
  el primer componente, y de inmediato se muestra `BrandSplash` (`src/components/BrandSplash.js`),
  una pantalla de bienvenida animada con el logo y el eslogan de la marca, antes de resolver si hay
  sesión activa.

## Convención de nomenclatura

- **PascalCase** para componentes y pantallas (nombre de archivo = nombre del componente exportado):
  `ProductCard.js`, `LoginScreen.js`.
- **camelCase** para todo lo demás: funciones, variables, hooks (`useAuth`, `useCart`) y archivos
  que no exportan un componente (`authApi.js`, `formatCurrency`).
- Los nombres de rutas del backend y los campos de los modelos (`firstName`, `client_id`,
  `sub_total`, etc.) se respetan tal cual están definidos en `../backend/src/models`, sin
  renombrarlos, para no desincronizarse con la API.
