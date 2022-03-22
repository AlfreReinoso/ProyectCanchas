import React from "react";
import NavBar from "./components/NavBar";
import CanchaList from "./components/CanchaList";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <CanchaList mode="all" />
        </Route>

        <Route path="/misCanchas">
          <CanchaList mode="misCanchas" />
        </Route>

        <Route path="/favs">
          <CanchaList mode="favs" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
