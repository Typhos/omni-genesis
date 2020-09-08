import React, { Component } from "react";
import Utils from "../../../utils";

export default class TownTabsDisplay extends Component {
  render() {
    const {
      kingdom: {
        settlements: {
          townInfo: { towns },
        },
      },
    } = this.props;

    return towns.map((town, i) => {
      return (
        <li name={town.name} key={town.name} className={`infoTable__row numeric pointer`}>
          <span className='info__label'>{town.name}: </span>
          <span className='info__value'>{Utils.numberWithCommas(town.population.total)}</span>
        </li>
      );
    });
  }
}
