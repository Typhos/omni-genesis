import React, { Component } from 'react';

import "styles/display.scss";

export default class Display extends Component {

  render () {

    return (
      <article className="displayOutput">
        {this.props.children}
      </article>
    )
  }
}