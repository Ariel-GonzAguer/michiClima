import { useRef, useState } from "react";

// estilos
import styles from "../styles/Contact.module.css";

const EmailForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<{ message: string }>({
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sendEmailResend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameRef.current ? nameRef.current.value : "",
          email: emailRef.current ? emailRef.current.value : "",
          message: messageRef.current ? messageRef.current.value : "",
        }),
      });

      const result = await response.json();
      setStatus({ message: "Mensaje enviado correctamente" });
      nameRef.current!.value = "";
      emailRef.current!.value = "";
      messageRef.current!.value = "";
      console.log(result);
    } catch (error) {
      console.log(error);
      setStatus({ message: "Error al enviar el mensaje" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      {status.message && <p>{status.message}</p>}

      <p>
        Si quiere saber más o tiene algún comentario sobre MichiClima puede
        enviar un mensaje acá
      </p>

      <label htmlFor="name">Nombre</label>
      <input type="text" ref={nameRef} placeholder="Tu nombre" required />
      <label htmlFor="email">Correo</label>
      <input type="email" ref={emailRef} placeholder="Tu correo" required />
      <label htmlFor="message">Mensaje</label>
      <textarea ref={messageRef} placeholder="Tu mensaje" required></textarea>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default EmailForm;
