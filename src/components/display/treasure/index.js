import "./treasure.scss";

import React, { Component } from "react";

import Display from "../display";
import Utils from "../../utils";

export default class TreasureDisplay extends Component {
  render() {
    const {
      state: { treasure },
    } = this.props;

    const {
      treasureTable,
      treasureArray,
      gemValue,
      JewelryValue,
      total,
      Jewelry,
      gems,
      magicItems,
      itemsRoll,
    } = treasure;

    console.log(treasure);

    return (
      <Display>
        <h1 className="displayLayout__header">Treasure Table {treasureTable}</h1>

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
                {tv.includes("Jewelry") && (
                  <span>
                    {" "}
                    ( <em className="treasure__gpValue">{Jewelry.join(", ")}</em> )
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

        {(gemValue > 0 || JewelryValue > 0) && <h2 className="subHead">Summary</h2>}

        {gemValue > 0 && (
          <p className="description">
            <strong>Gem Value Sum: </strong>
            {Utils.numberWithCommas(gemValue)} gp
          </p>
        )}
        {JewelryValue > 0 && (
          <p className="description">
            <strong>Jewelry Value Sum: </strong>
            {Utils.numberWithCommas(JewelryValue)} gp
          </p>
        )}
      </Display>
    );
  }
}
