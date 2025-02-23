// enrutado
import { Route, Switch } from "wouter";

// componentes 
import Clima from "./components/Clima";
import GuiaUsuario from "./components/GuiaUsario";
import OtroDatos from "./components/OtrosDatos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TyC from "./components/TyC";

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

        <Route path="/otro-datos">
          <OtroDatos />
        </Route>

        <Route path="/tyc">
          <TyC />
        </Route>

      </Switch>
      <Footer />
    </div>
  );
}