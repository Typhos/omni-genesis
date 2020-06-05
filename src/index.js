import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Header from "components/header";
import Navigation from "components/navigation";
import ScrollToTop from 'components/scrollToTop';

import App from './pages/app';
import ItemGenerator from './pages/items/index';
import People from './pages/people/index';
import Shops from './pages/shops/index';
import Settlements from './pages/settlements/index';
import States from './pages/states/index';
import {Error404} from './pages/404/index';

const routing = (
  <Router>
    <ScrollToTop>
      <Header/>
      <Navigation/>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/items/" component={ItemGenerator} />
        <Route path="/people/" component={People} />
        <Route path="/shops/" component={Shops} />
        <Route path="/settlements/" component={Settlements} />
        <Route path="/states/" component={States} />

        <Route component={Error404} />
      </Switch>
    </ScrollToTop>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));
