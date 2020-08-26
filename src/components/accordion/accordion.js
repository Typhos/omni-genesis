import React, { Component } from 'react';

import styles from "./accordion.module.scss";

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
      <div className={`${styles.accordion} ${ (this.state.active) ? "" : styles.closed}`}>
        <div className={styles.accordionHeader} onClick={ this.toggleAccordion }>
          <h4 className={styles.header}>{this.props.title}</h4>
          <button className={styles.toggle}>▲</button>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}