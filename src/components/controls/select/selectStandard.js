import React, { Component } from 'react';
import styles from "./select.module.scss";

export default class Button extends Component {

  render () {
    const disabled = this.props.disabled ? "disabled" : "";

    return (
      <label>
        <span className={styles.title}>{this.props.title}</span>
        <select 
          name={this.props.name} 
          className={styles.select} 
          onChange={this.props.onChange} 
          value={this.props.value}
          disabled={disabled}
        >
          {this.props.children}
        </select>
      </label>
    )
  }

}