import React, { Component } from "react";
import Utils from "../../../utils";

export default class PopulationDisplay extends Component {
  render() {
    const {
      city: {
        population: { races },
      },
    } = this.props;
    let sortArray = [];

    for (let [name, val] of Object.entries(races)) {
      sortArray.push([name, val]);
    }

    sortArray.sort((a, b) => {
      if (a[1] < b[1]) return 1;
      return -1;
    });

    return sortArray.map((array) => {
      const name = array[0];
      const val = array[1];

      return (
        <li name={name} key={name} className={`infoTable__row numeric ${val === 0 ? "zero" : ""}`}>
          <span className="name">{name}:</span>{" "}
          <span className="info__value">{Utils.numberWithCommas(val)}</span>
        </li>
      );
    });

    return null;
  }
}
