import "./nav.scss";

import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navigation">
        <div className="navBox">
          <Link to="/cities">Cities</Link>
          <Link to="/hirelings">Hirelings</Link>
          <Link to="/items">Jewelry</Link>
          {/* <Link to="/people">People</Link> */}
          {/* <Link to="/shops">Shops</Link> */}
          <Link to="/kingdoms">Kingdoms</Link>
          <Link to="/swords">Swords</Link>
          <Link to="/clan">Samurai Clan</Link>
          <Link to="/tavern-patrons">Tavern Patrons</Link>
          <Link to="/treasure">Treasure</Link>
        </div>
      </nav>
    );
  }
}
