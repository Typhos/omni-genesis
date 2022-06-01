import React, { Component } from "react";

import styles from "./display.module.scss";

export default class Display extends Component {
  render() {
    return (
      <article className={`${styles.displayOutput} ${this.props.classes}`}>
        {this.props.children}
      </article>
    );
  }
}
