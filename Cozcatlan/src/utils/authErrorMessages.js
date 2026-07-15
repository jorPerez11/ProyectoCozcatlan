const LOGIN_ERROR_MESSAGES = {
    "Invalid email": "El correo electrónico no es válido",
    "Email not found": "No existe una cuenta registrada con este correo electrónico",
    "Employee not found": "No existe una cuenta registrada con este correo electrónico",
    "Client not found": "No existe una cuenta registrada con este correo electrónico",
    "Admin not found": "No existe una cuenta registrada con este correo electrónico",
    "Incorrect password": "La contraseña es incorrecta",
    "Invalid password": "La contraseña es incorrecta",
    "Account blocked": "Tu cuenta está bloqueada temporalmente por múltiples intentos fallidos",
    "Account blocked due to multiple failed login attempts": "Tu cuenta está bloqueada temporalmente por múltiples intentos fallidos",
    "User temporarily blocked": "Tu cuenta está bloqueada temporalmente por múltiples intentos fallidos",
    "User blocked temporarily": "Tu cuenta está bloqueada temporalmente por múltiples intentos fallidos",
};

export const translateLoginError = (message) =>
    LOGIN_ERROR_MESSAGES[message] || message || "Error al iniciar sesión";
