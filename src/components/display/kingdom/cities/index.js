import React, { Component } from "react";
import Utils from "../../../utils";

export default class CityTabsDisplay extends Component {
  render() {
    const {
      // kingdom,
      kingdom: {
        settlements: {
          cityInfo: { cities },
        },
      },
    } = this.props;

    return cities.map((city, i) => {
      return (
        <li name={city.name} key={city.name} className={`infoTable__row numeric pointer`}>
          <span className='info__label'>
            {i === 0 && (
              <span
                role='img'
                className='emojiIcon text capital'
                aria-label='Capital City'
                data-balloon-pos='up'
              >
                👑
              </span>
            )}{" "}
            {city.name}:{" "}
          </span>
          <span className='info__value'>{Utils.numberWithCommas(city.population.total)}</span>
        </li>
      );
    });
  }
}
