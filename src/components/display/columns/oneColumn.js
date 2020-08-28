import React, { Component } from "react";
import "./oneColumn.scss";

export default class ThreeColumnDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="infoTable one">{this.props.children}</ul>
      </React.Fragment>
    );
  }
}
