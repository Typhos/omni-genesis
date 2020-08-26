import React, { Component } from "react";
import styles from "./threeColumns.module.scss";

export default class ThreeColumnDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className={styles.infoTable}>{this.props.children}</ul>
      </React.Fragment>
    );
  }
}
