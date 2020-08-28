import React, { Component } from "react";
import "./threeColumns.scss";

export default class ThreeColumnDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="infoTable three">{this.props.children}</ul>
      </React.Fragment>
    );
  }
}
