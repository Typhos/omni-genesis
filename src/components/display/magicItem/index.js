import React, { Component } from "react";

import Display from "../display";
import Utils from "../../utils";

export default class MagicItemDisplay extends Component {
  render() {
    const {
      state: { magicItem },
    } = this.props;
    console.log(magicItem);
    const { itemName, details } = magicItem;

    return (
      <Display>
        <h1 className="displayLayout__subHeading">{itemName}</h1>
        {details && <p className="description">{details}</p>}
      </Display>
    );
  }
}
