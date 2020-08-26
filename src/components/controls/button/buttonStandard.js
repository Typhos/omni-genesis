import React, { Component } from 'react';
import styles from "./button.module.scss";

export default class Button extends Component {

  render () {
    return (
      <button id={this.props.id} className={ `${styles.standard} ${this.props.className} `} onClick={this.props.onClick} >
        {this.props.children}
      </button>
    )
  }

}