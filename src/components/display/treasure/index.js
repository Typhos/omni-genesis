import "./treasure.scss";

import React, { Component } from "react";

import Display from "../display";
import Utils from "../../utils";

export default class TreasureDisplay extends Component {
  render() {
    const {
      state: { treasure }
    } = this.props;

    const {
      treasureArray,
      gemValue,
      JewelryValue,
      specialValue,
      total,
      Jewelry,
      gems,
      specialTreasures,
      magicItems,
      itemsRoll
    } = treasure;

    let { treasureTable } = treasure;

    if (treasureTable === "onlyMagicItems") treasureTable = "Magic Items";

    const magicKeywords = ["magic", "potion", "scroll", "sword", "armor", "weapon"];

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
                  <ul className="infoTable one indent">
                    {Object.entries(gems).map(([description, data]) => {
                      const { count, value } = data;
                      return (
                        <li className="infoTable__row" key={description + i}>
                          <span className="treasure__jewelryDescriptions">
                            {`${count}x `}
                            {description.trim()}{" "}
                          </span>
                          <em className="treasure__gpValue">
                            ({Utils.numberWithCommas(value)} gp)
                          </em>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {tv.includes("jewelry") && (
                  <ul className="infoTable one indent">
                    {Jewelry.map((piece, i) => {
                      const { value, item } = piece;
                      const { displayName, description, engraving, carving } = item;
                      return (
                        <li className="infoTable__row" key={piece + i}>
                          <span className="treasure__jewelryDescriptions">
                            {displayName.trim()}{" "}
                          </span>
                          <em className="treasure__gpValue">
                            ({value}): {description} {engraving && engraving} {carving && carving}
                          </em>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {tv.includes("special treasure") && (
                  <ul className="infoTable one indent">
                    {specialTreasures.map((treasure, i) => {
                      const { item, weight } = treasure;
                      return (
                        <li className="infoTable__row" key={treasure + i}>
                          <span className="treasure__jewelryDescriptions">{item.trim()} </span>
                          <em className="treasure__gpValue">(weight: {weight})</em>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {tv.itemRolls !== "basic" && magicKeywords.some((word) => tv.includes(word)) && (
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
                            <span className="treasure__itemDescriptions">
                              ► {!!item.itemName ? item.itemName : item.itemType} {item.details}
                            </span>
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

        {(gemValue > 0 || JewelryValue > 0 || specialValue > 0) && (
          <h2 className="subHead">Summary</h2>
        )}

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
        {specialValue > 0 && (
          <p className="description">
            <strong>Special Treasure Value Sum: </strong>
            {Utils.numberWithCommas(specialValue)} gp
          </p>
        )}
      </Display>
    );
  }
}
