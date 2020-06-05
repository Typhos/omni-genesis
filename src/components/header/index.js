import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "styles/header.scss";

export default class Header extends Component {

  render () {

    return (
      <header className="appHeader">
        <div className="headerBox">
          <Link to="/"><h1>Omni Genesis</h1></Link>
          <small>an RPG random content generator</small>
        </div>
      </header>
    )
  }
}