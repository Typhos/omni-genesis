import React, { Component } from "react";
import TwoColumnDisplay from "../../columns/twoColumns.js";

export default class NobleDisplay extends Component {
  render() {
    const {
      city: {
        economy: {
          merchants: { shops },
        },
      },
    } = this.props;

    let resp = [];
    let ind = 0;

    for (let [key, val] of Object.entries(shops)) {
      ind++;

      resp.push(
        <React.Fragment key={key + ind}>
          {" "}
          <h4 className="tabs__sectionHeading" key={key}>
            {key}{" "}
          </h4>
          <TwoColumnDisplay>
            {val.map((shop, i) => {
              if (i <= 5) {
                const {
                  name,
                  seed,
                  owner: {
                    name: { displayName },
                    race,
                  },
                } = shop;

                return (
                  <li key={name + i} className="names" seed={seed}>
                    <p className="tabs__subHeading">{name}</p>
                    <p className="tabs__subInfo">
                      <span className="tabs__title">Owner:</span>{" "}
                      <span className="tabs__name">{displayName} </span>
                      <span className="tabs__name">({race})</span>
                    </p>
                  </li>
                );
              }
              return undefined;
            })}
          </TwoColumnDisplay>
        </React.Fragment>
      );
    }

    return resp;
  }
}
