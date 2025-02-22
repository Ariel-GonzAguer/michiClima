// enrutado
import { Route, Switch } from "wouter";

// componentes 
import Clima from "./components/Clima";
import GuiaUsuario from "./components/GuiaUsario";
import Header from "./components/Header";
import Footer from "./components/Footer";

// estilos
import styles from "./styles/App.module.css"

export default function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Switch>
        <Route path="/">
          <Clima />
        </Route>

        <Route path="/guia">
          <GuiaUsuario />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}