import styles from "../styles/Boton.module.css";

import type { BotonProps } from "../types/types";

/**
 * Componente Boton que renderiza un enlace estilizado como botón
 * @param props - Propiedades del componente
 * @returns Un enlace estilizado como botón
 */
export default function Boton({ componente, texto }: BotonProps) {
  return (
    <a href={`${componente}`} className={styles.boton}>
      {texto}
    </a>
  );
}

