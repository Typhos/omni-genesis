import React, { Component } from 'react';

import "styles/aside.scss";

export default class Aside extends Component {

  render () {

    return (
      <aside className="leftAside">
        {this.props.children}
      </aside>
    )
  }
}