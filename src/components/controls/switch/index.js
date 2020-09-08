import React, { Component } from "react";
import styles from "./switch.module.scss";

export default class Switch extends Component {
  render() {
    const { title, name, onChange, value } = this.props;

    return (
      <label className={styles.label}>
        <span className={styles.title}>{title}</span>
        <div className={styles.switch}>
          <input
            type='checkbox'
            className={styles.checkbox}
            name={name}
            onChange={onChange}
            checked={value}
          />
          <span className={styles.toggle}></span>
        </div>
      </label>
    );
  }
}
