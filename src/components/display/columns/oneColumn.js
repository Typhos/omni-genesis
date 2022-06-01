import "./oneColumn.scss";

import React, { Component } from "react";

export default class OneColumnDisplay extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="infoTable one">{this.props.children}</ul>
      </React.Fragment>
    );
  }
}
