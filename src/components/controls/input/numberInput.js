import React, { Component } from 'react';
import styles from "./input.module.scss";

export default class NumberInput extends Component {

  render () {
    return (
      <label>
        <span className={styles.title}>{this.props.title}</span>
        <input 
          type="number" 
          className={styles.numberInput} 
          name={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </label>
    )
  }

}