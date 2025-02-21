// enrutado
import { Route, Switch } from "wouter";


// componentes 
import Clima from "./components/Clima";
import styles from "./styles/App.module.css"
import GuiaUsuario from "./components/GuiaUsario";
import Header from "./components/Header";


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
    </div>
  );
}