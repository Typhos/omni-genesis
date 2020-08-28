import React, { Component } from "react";
import Utils from "../../../utils";
import TwoColumnDisplay from "../../columns/twoColumns.js";

export default class InventoryDisplay extends Component {
  render() {
    const {
      shop: {
        name,
        inventory: { gpValue, items },
      },
    } = this.props;

    return (
      <React.Fragment>
        <h3 className="tabs__groupHeading">{name} Inventory</h3>

        <TwoColumnDisplay>
          {items.map((item) => {
            let {
              name,
              subtype,
              fiveEStats: { value },
            } = item;

            const gpValue = Math.floor(value);
            const spValue = (value - gpValue) * 10;
            const cpValue = ((value - gpValue) * 10 - spValue) * 10;

            return (
              <li className="infoTable__row names pointer">
                <span className="info__label capitalize">{subtype} </span>
                <small className="info__value">
                  {gpValue > 1 && <React.Fragment>{gpValue} gp</React.Fragment>}
                  {gpValue < 1 && spValue > 1 && <React.Fragment>{spValue} sp</React.Fragment>}
                  {gpValue < 1 && spValue < 1 && <React.Fragment>?? gp</React.Fragment>}
                </small>
              </li>
            );
          })}
        </TwoColumnDisplay>
        <h4 className="tabs__subHeader">Total Value: {Utils.numberWithCommas(gpValue)} gp</h4>
      </React.Fragment>
    );
  }
}
