import React, { Component } from "react";
import styles from "./twoColumns.module.scss";

export default class TwoColumnDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className={styles.infoTable}>{this.props.children}</ul>
      </React.Fragment>
    );
  }
}
