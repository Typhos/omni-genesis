import React, { Component } from 'react';

import styles from "./aside.module.scss";

export default class Aside extends Component {

  render () {

    return (
      <aside className={styles.aside}>
        {this.props.children}
      </aside>
    )
  }
}