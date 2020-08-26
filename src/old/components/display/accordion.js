import React, { Component } from 'react';

import "styles/accordion.scss";

export default class Accordion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false
    }

    this.toggleAccordion = this.toggleAccordion.bind(this);
  }

  toggleAccordion() {
    this.setState({active: !this.state.active})
  }

  render () {

    return (
      <div className={`accordion ${ (this.state.active) ? "" : "closed"}`}>
        <div className="accordionHeader" onClick={ this.toggleAccordion }>
          <h4 className="header">{this.props.title}</h4>
          <button className="toggle">▲</button>
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}