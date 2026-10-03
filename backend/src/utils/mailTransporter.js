//Envío de correos con la API de Brevo (HTTPS).
//Render bloquea los puertos SMTP en el plan gratis, por eso no usamos nodemailer con Gmail.
//Se usa igual que el transporter de nodemailer: transporter.sendMail(mailOptions, callback)
import { config } from "../../config.js";

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

const sendWithBrevo = async (mailOptions) => {
  const response = await fetch(BREVO_URL, {
    method: "POST",
    headers: {
      "api-key": config.EMAIL.BREVO_API_KEY,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Cozcatlán", email: mailOptions.from },
      to: [{ email: mailOptions.to }],
      subject: mailOptions.subject,
      textContent: mailOptions.text,
      htmlContent: mailOptions.html,
    }),
    //Si Brevo no responde en 15 segundos, se cancela para no dejar la petición colgada
    signal: AbortSignal.timeout(15000),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Brevo respondió con estado ${response.status}`);
  }

  return data;
};

const mailTransporter = {
  sendMail(mailOptions, callback) {
    const sending = sendWithBrevo(mailOptions);

    //Si no se manda callback, se usa con await
    if (!callback) return sending;

    sending
      .then((info) => callback(null, info), (error) => callback(error))
      .catch((error) => console.log("Error en el callback de sendMail: " + error));
  },
};

export default mailTransporter;
