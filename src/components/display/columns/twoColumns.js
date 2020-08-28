import React, { Component } from "react";
import "./twoColumns.scss";

export default class TwoColumnDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="infoTable two">{this.props.children}</ul>
      </React.Fragment>
    );
  }
}
