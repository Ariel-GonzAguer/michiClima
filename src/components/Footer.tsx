import styles from "../styles/Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Creado por <a href="https://ariegonzaguer.netlify.app/" target="blank" rel="noopener noreferrer">Ariel GonzAgüer</a></p>
      <p>Al usar la página acepta los <a href="/tyc">TyC</a></p>
    </footer>
  )
}
