import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Header from "./components/header";
import Navigation from "./components/navigation";

import App from "./pages/app";
import ItemGenerator from "./pages/items/index";
import People from "./pages/people/index";
import Shops from "./pages/shops/index";
import Cities from "./pages/cities/index";
import Kingdoms from "./pages/kingdoms/index";
import { Error404 } from "./pages/404/index";

const routing = (
  <Router>
    <Header />
    <Navigation />
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/items/" component={ItemGenerator} />
      <Route path="/people/" component={People} />
      <Route path="/shops/" component={Shops} />
      <Route path="/cities/" component={Cities} />
      <Route path="/kingdoms/" component={Kingdoms} />

      <Route component={Error404} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
