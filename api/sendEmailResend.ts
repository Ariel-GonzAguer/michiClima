import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { name, email, message } = req.body;

  const emailData = {
    from: "no-reply@michicompany.info",
    to: ["ariegonzaguer@gmail.com"],
    subject: "Nuevo mensaje desde MichiCompany.info",
    html: `<h2>Nuevo mensaje</h2>
           <p><strong>Nombre:</strong> ${name}</p>
           <p><strong>Correo:</strong> ${email}</p>
           <p><strong>Mensaje:</strong> ${message}</p>`,
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailData),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Error al enviar el correo" });
  }
}
