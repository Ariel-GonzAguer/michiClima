import styles from '../styles/Boton.module.css'

export default function Boton({ componente, texto }: { componente: string; texto: string; }) {
  return (
    <a href={`${componente}`} className={styles.boton}>
      {texto}
    </a>
  )
}
