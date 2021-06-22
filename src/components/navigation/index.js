import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./nav.scss";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navigation">
        <div className="navBox">
          <Link to="/items">Items</Link>
          <Link to="/people">People</Link>
          <Link to="/clan">Clan</Link>
          <Link to="/shops">Shops</Link>
          <Link to="/cities">Cities</Link>
          <Link to="/kingdoms">Kingdoms</Link>
        </div>
      </nav>
    );
  }
}
