// componentes
import Boton from './Boton'

// enrutado
import { useLocation } from 'wouter'

// estilos
import styles from '../styles/Header.module.css'


export default function Header() {
  const [location] = useLocation()
  return (
    <>
      <section className={styles.header}>
        <h1>☀️ MichiClima 😸</h1>

        {
          location === "/"
            ? <Boton componente="guia" texto="Guía de uso" />
            : <Boton componente="/" texto="atrás" />
        }
      </section>
    </>
  )
}
