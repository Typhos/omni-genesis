import React, { Component } from "react";

import styles from "./input.module.scss";

export default class CheckBoxInput extends Component {
  render() {
    const { title, name, onChange, value } = this.props;

    return (
      <div className={styles.inputSection}>
        <label className={styles.checkBox__label}>
          <input
            className={styles.checkBox__input}
            type="checkbox"
            name={name}
            onChange={onChange}
            value={value}
          />
          <span className={styles.checkBox__title}>{title}</span>
        </label>
      </div>
    );
  }
}
