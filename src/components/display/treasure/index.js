import "./treasure.scss";

import React, { Component } from "react";

import Display from "../display";
import Utils from "../../utils";

export default class TreasureDisplay extends Component {
  render() {
    const {
      state: { treasure, table },
    } = this.props;

    const {
      treasureArray,
      gemValue,
      jewelleryValue,
      total,
      jewellery,
      gems,
      magicItems,
      itemsRoll,
    } = treasure;

    console.log(treasure);

    return (
      <Display>
        <h1 className="displayLayout__header">Treasure Table {table}</h1>

        <h2 className="subHead">Treasure Breakdown ({Utils.numberWithCommas(total)} gp)</h2>

        {treasureArray.map((tv, i) => {
          return (
            <ul key={tv + i} className="treasure__list">
              <li className="treasure__primary ">
                <span className="treasure__chevron">►</span> {tv}
                {tv.includes("gem") && (
                  <span>
                    {" "}
                    ( <em className="treasure__gpValue">{gems.join(", ")}</em> )
                  </span>
                )}
                {tv.includes("jewellery") && (
                  <span>
                    {" "}
                    ( <em className="treasure__gpValue">{jewellery.join(", ")}</em> )
                  </span>
                )}
                {tv.itemRolls !== "basic" && tv.includes("magic") && (
                  <ul className="infoTable one indent">
                    {magicItems.map((item, i) => {
                      if (itemsRoll === "vague") {
                        return (
                          <li className="infoTable__row numeric" key={item + i}>
                            <em className="treasure__gpValue">{item.itemType}</em>
                          </li>
                        );
                      } else {
                        return (
                          <li className="infoTable__row numeric pointer" key={item + i}>
                            <em className="treasure__itemDescriptions">
                              ► {!!item.itemName ? item.itemName : item.itemType} {item.details}
                            </em>
                          </li>
                        );
                      }
                    })}
                  </ul>
                )}
              </li>
            </ul>
          );
        })}

        {treasureArray.length <= 0 && <p className="description">► Empty Treasure Hoard</p>}

        <h2 className="subHead">Summary</h2>

        {gemValue > 0 && (
          <p className="description">
            <strong>Gem Value Sum: </strong>
            {Utils.numberWithCommas(gemValue)} gp
          </p>
        )}
        {jewelleryValue > 0 && (
          <p className="description">
            <strong>Jewellery Value Sum: </strong>
            {Utils.numberWithCommas(jewelleryValue)} gp
          </p>
        )}
      </Display>
    );
  }
}
