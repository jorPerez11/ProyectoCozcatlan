//Colores de nuestra marca
const colors = {
  bgLight: "#F5F4EB",      //Blanco grisaseo
  bgCard: "#F0E4CB",       //Amarillento
  accent: "#694C3C",       //Café Sutil
  textMain: "#694C3C",
  textMuted: "#8c7365",
};

const HTMLRecoveryEmail = (verificationCode, otpUrl) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verificación de cuenta</title>
  </head>
  <body style="margin:0;padding:0;background-color:${colors.bgLight};font-family:Arial,Helvetica,sans-serif;color:${colors.textMain};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${colors.bgLight};padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:${colors.bgCard};border-radius:18px;overflow:hidden;border:1px solid ${colors.accent}33;">
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg, ${colors.bgCard} 0%, ${colors.bgLight} 100%);padding:40px 30px;border-bottom:1px solid ${colors.accent}22;">
                <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};font-weight:700;opacity:0.8;">Planner by Luisa</p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;color:${colors.accent};font-weight:700;">Confirma tu cuenta</h1>
                <p style="margin:14px 0 0 0;font-size:15px;line-height:1.6;color:${colors.textMuted};max-width:480px;">
                  Estamos listos para empezar. Usa el siguiente código para activar tu acceso y comenzar la experiencia.
                </p>
              </td>
            </tr>

            <!-- Sección del Código -->
            <tr>
              <td style="padding:30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px dashed ${colors.accent};border-radius:14px;background:${colors.bgLight};">
                  <tr>
                    <td align="center" style="padding:20px 16px 5px 16px;font-size:12px;color:${colors.accent};font-weight:600;letter-spacing:1px;text-transform:uppercase;">
                      Código de seguridad
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:0 16px 20px 16px;">
                      <span style="display:inline-block;font-size:36px;letter-spacing:6px;font-weight:800;color:${colors.accent};">
                        ${verificationCode}
                      </span>
                    </td>
                  </tr>
                </table>

                <!-- Botón -->
                <div style="margin:30px 0 10px 0;text-align:center;">
                  <a href="${otpUrl}" style="display:inline-block;background:${colors.accent};color:${colors.bgLight};text-decoration:none;padding:14px 30px;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:0.5px;">
                    Verificar mi cuenta ahora
                  </a>
                </div>

                <p style="margin:25px 0 0 0;font-size:13px;line-height:1.6;color:${colors.text_muted};text-align:center;">
                  Este código expira en <b>15 minutos</b>. Si no solicitaste este registro, puedes ignorar este mensaje.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px;background:${colors.accent};text-align:center;">
                <p style="margin:0;font-size:11px;line-height:1.5;color:${colors.bgLight};opacity:0.7;">
                  Este es un mensaje automático. Por favor no respondas a este correo.<br>
                  &copy; 2026 Planner by Luisa.
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

const HTMLConfirmEmail = (verificationCode, otpUrl) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recuperación de contraseña</title>
  </head>
  <body style="margin:0;padding:0;background-color:${colors.bgLight};font-family:Arial,Helvetica,sans-serif;color:${colors.textMain};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${colors.bgLight};padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:${colors.bgCard};border-radius:18px;overflow:hidden;border:1px solid ${colors.accent}33;">
            <tr>
              <td style="background:linear-gradient(135deg, ${colors.bgCard} 0%, ${colors.bgLight} 100%);padding:40px 30px;border-bottom:1px solid ${colors.accent}22;">
                <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};font-weight:700;opacity:0.8;">Seguridad</p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;color:${colors.accent};font-weight:700;">Restablecer contraseña</h1>
                <p style="margin:14px 0 0 0;font-size:15px;line-height:1.6;color:${colors.textMuted};max-width:480px;">
                  Recibimos una solicitud para cambiar tu contraseña. No te preocupes, utiliza el código de abajo para continuar.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px dashed ${colors.accent};border-radius:14px;background:${colors.bgLight};">
                  <tr>
                    <td align="center" style="padding:20px 16px 5px 16px;font-size:12px;color:${colors.accent};font-weight:600;text-transform:uppercase;">
                      Código de recuperación
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding:0 16px 20px 16px;">
                      <span style="display:inline-block;font-size:36px;letter-spacing:6px;font-weight:800;color:${colors.accent};">
                        ${verificationCode}
                      </span>
                    </td>
                  </tr>
                </table>
                <div style="margin:30px 0 10px 0;text-align:center;">
                  <a href="${otpUrl}" style="display:inline-block;background:${colors.accent};color:${colors.bgLight};text-decoration:none;padding:14px 30px;border-radius:10px;font-size:14px;font-weight:700;">
                    Cambiar mi contraseña
                  </a>
                </div>
                <p style="margin:25px 0 0 0;font-size:13px;line-height:1.6;color:${colors.textMuted};text-align:center;">
                  Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña actual no se verá afectada.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;background:${colors.accent};text-align:center;">
                <p style="margin:0;font-size:11px;line-height:1.5;color:${colors.bgLight};opacity:0.7;">
                  Este es un mensaje automático. Por favor no respondas a este correo.<br>
                  &copy; 2026 Planner by Luisa.
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

//Exportamos ambas funciones
export default { HTMLRecoveryEmail, HTMLConfirmEmail };