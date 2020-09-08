import React, { Component } from "react";
import styles from "./input.module.scss";

export default class NumberInput extends Component {
  render() {
    const { title, name, onChange, value } = this.props;

    return (
      <label>
        <span className={styles.title}>{title}</span>
        <input
          type='number'
          className={styles.numberInput}
          name={name}
          onChange={onChange}
          value={value}
        />
      </label>
    );
  }
}
