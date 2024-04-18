import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import App from "./pages/app";
import Cities from "./pages/cities/index";
import Clans from "./pages/clans/index";
import { Error404 } from "./pages/404/index";
import Header from "./components/header";
import Hirelings from "./pages/hirelings/index";
import Kingdoms from "./pages/kingdoms/index";
import Navigation from "./components/navigation";
import React from "react";
import ReactDOM from "react-dom";
import RivalAdventurers from "./pages/rival-adventurers";
import TreasurePage from "./pages/treasure/index";

const routing = (
  <Router>
    <Header />
    <Navigation />
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/hirelings/" component={Hirelings} />
      <Route path="/cities/" component={Cities} />
      <Route path="/kingdoms/" component={Kingdoms} />
      <Route path="/clan/" component={Clans} />
      <Route path="/treasure/" component={TreasurePage} />
      <Route path="/rival-adventurers/" component={RivalAdventurers} />

      <Route component={Error404} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
