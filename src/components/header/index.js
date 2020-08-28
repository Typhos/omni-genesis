import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./header.module.scss";

export default class Header extends Component {
  render() {
    return (
      <header className={styles.appHeader}>
        <div className={styles.headerBox}>
          <Link to="/">
            <h1 className={styles.appTitle}>Omni Genesis</h1>
          </Link>
          <small className={styles.tagline}>an RPG random content generator</small>
        </div>
      </header>
    );
  }
}
