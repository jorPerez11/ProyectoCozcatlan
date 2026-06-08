// Colores de la marca Cozcatlan extraídos de la paleta oficial
const colors = {
  bgLight: "#FFFFFF",      // Fondo blanco puro
  bgCard: "#0D253C",       // Azul Oscuro de fondo para las tarjetas principales
  accentOrange: "#E47528", // Anaranjado Cozcatlan
  accentGreen: "#6FC44C",  // Verde Cozcatlan
  textMain: "#FFFFFF",     // Texto principal claro para contrastar sobre azul oscuro
  textMuted: "#A5B4FC",    // Texto secundario suavizado
};

const HTMLConfirmEmail = (verificationCode, otpUrl) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verificación de cuenta - Cozcatlan</title>
  </head>
  <body style="margin:0;padding:0;background-color:${colors.bgLight};font-family:Arial,Helvetica,sans-serif;color:${colors.textMain};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${colors.bgLight};padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:${colors.bgCard};border-radius:18px;overflow:hidden;box-shadow: 0 4px 12px rgba(13,37,60,0.15);">
            <tr>
              <td style="background:linear-gradient(135deg, ${colors.bgCard} 0%, #1E3A5F 100%);padding:40px 30px;border-bottom:2px solid ${colors.accentGreen};">
                <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${colors.accentOrange};font-weight:700;">Cozcatlan</p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;color:${colors.textMain};font-weight:700;">Confirma tu cuenta</h1>
                <p style="margin:14px 0 0 0;font-size:15px;line-height:1.6;color:${colors.textMuted};max-width:480px;">
                  ¡Bienvenido a la familia! Estamos listos para empezar. Usa el siguiente código para activar tu acceso y disfrutar del verdadero sabor de tu hogar.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px dashed ${colors.accentGreen};border-radius:14px;background:rgba(255,255,255,0.05);">
                  <tr>
                    <td align="center" style="padding:20px 16px 5px 16px;font-size:12px;color:${colors.accentGreen};font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                      Código de seguridad
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:0 16px 20px 16px;">
                      <span style="display:inline-block;font-size:36px;letter-spacing:6px;font-weight:800;color:${colors.accentOrange};">
                        ${verificationCode}
                      </span>
                    </td>
                  </tr>
                </table>

                <div style="margin:30px 0 10px 0;text-align:center;">
                  <a href="${otpUrl}" style="display:inline-block;background:${colors.accentOrange};color:#FFFFFF;text-decoration:none;padding:14px 30px;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:0.5px;box-shadow:0 4px 10px rgba(228,117,40,0.3);">
                    Verificar mi cuenta ahora
                  </a>
                </div>

                <p style="margin:25px 0 0 0;font-size:13px;line-height:1.6;color:${colors.textMuted};text-align:center;opacity:0.8;">
                  Este código expira en <b>15 minutos</b>. Si no solicitaste este registro, puedes ignorar este mensaje de forma segura.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:24px;background:#081827;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
                <p style="margin:0;font-size:11px;line-height:1.5;color:${colors.textMuted};opacity:0.7;">
                  Este es un mensaje automático. Por favor no respondas a este correo.<br>
                  &copy; 2026 Cozcatlan. El sabor de tu hogar.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const HTMLRecoveryEmail = (verificationCode, otpUrl) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recuperación de contraseña - Cozcatlán</title>
  </head>
  <body style="margin:0;padding:0;background-color:${colors.bgLight};font-family:Arial,Helvetica,sans-serif;color:${colors.textMain};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${colors.bgLight};padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:${colors.bgCard};border-radius:18px;overflow:hidden;box-shadow: 0 4px 12px rgba(13,37,60,0.15);">
            <tr>
              <td style="background:linear-gradient(135deg, ${colors.bgCard} 0%, #1E3A5F 100%);padding:40px 30px;border-bottom:2px solid ${colors.accentOrange};">
                <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${colors.accentGreen};font-weight:700;">Seguridad</p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;color:${colors.textMain};font-weight:700;">Restablecer contraseña</h1>
                <p style="margin:14px 0 0 0;font-size:15px;line-height:1.6;color:${colors.textMuted};max-width:480px;">
                  Recibimos una solicitud para cambiar tu contraseña de acceso. No te preocupes, utiliza el código de abajo para continuar con el restablecimiento.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px dashed ${colors.accentOrange};border-radius:14px;background:rgba(255,255,255,0.05);">
                  <tr>
                    <td align="center" style="padding:20px 16px 5px 16px;font-size:12px;color:${colors.accentOrange};font-weight:600;text-transform:uppercase;">
                      Código de recuperación
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:0 16px 20px 16px;">
                      <span style="display:inline-block;font-size:36px;letter-spacing:6px;font-weight:800;color:${colors.accentGreen};">
                        ${verificationCode}
                      </span>
                    </td>
                  </tr>
                </table>

                <div style="margin:30px 0 10px 0;text-align:center;">
                  <a href="${otpUrl}" style="display:inline-block;background:${colors.accentGreen};color:#FFFFFF;text-decoration:none;padding:14px 30px;border-radius:10px;font-size:14px;font-weight:700;box-shadow:0 4px 10px rgba(111,196,76,0.3);">
                    Cambiar mi contraseña
                  </a>
                </div>

                <p style="margin:25px 0 0 0;font-size:13px;line-height:1.6;color:${colors.textMuted};text-align:center;opacity:0.8;">
                  Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña actual no se verá afectada de ninguna manera.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:24px;background:#081827;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
                <p style="margin:0;font-size:11px;line-height:1.5;color:${colors.textMuted};opacity:0.7;">
                  Este es un mensaje automático. Por favor no respondas a este correo.<br>
                  &copy; 2026 Cozcatlan. El sabor de tu hogar.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

// Exportamos ambas funciones corregidas
export default { HTMLRecoveryEmail, HTMLConfirmEmail };