import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "styles/nav.scss";

export default class Navigation extends Component {

  render () {

    return (
      <nav className="navigation">
        <div className="navBox">
          <Link to="/items">Items</Link>
          <Link to="/people">People</Link>
          <Link to="/shops">Shops</Link>
          <Link to="/settlements">Settlements</Link>
          <Link to="/kingdoms">Kingdoms</Link>
        </div>
      </nav>
    )
  }
}