import React, { Component } from "react";

import Display from "../display";
import Inventory from "./inventory";
import Staff from "./staff";
import Tabs from "../../tabs";
import TwoColumnDisplay from "../columns/twoColumns.js";

// import Utils from "../../utils";

// import StatBlock from "../statBlock/statBlock";

export default class InventoryDisplay extends Component {
  render() {
    const {
      shop,
      shop: { name, size, atmosphere, shopDescriptor, shopType, staff, inventory },
    } = this.props;

    return (
      <Display>
        <h2 className="displayLayout__name">{name}</h2>
        <h3 className="displayLayout__subHeading">{shopType}</h3>
        <div className="shopInfo">
          <p className="displayLayout__description">
            {name} is a {size}, {atmosphere} {shopDescriptor || shopType}.
          </p>
          <p className="displayLayout__description">
            This {shopDescriptor || "shop"} is owned by {staff[0].name.displayName}, the{" "}
            {staff[0].age} year old {staff[0].race} {staff[0].occupation}.
          </p>
        </div>
        <Tabs>
          <div label="Staff">
            <h3 className="tabs__groupHeading">Staff</h3>
            {staff && (
              <TwoColumnDisplay>
                <Staff shop={shop} />
              </TwoColumnDisplay>
            )}
          </div>
          <div label="Inventory">{inventory && <Inventory shop={shop} />}</div>
        </Tabs>
      </Display>
    );
  }
}
