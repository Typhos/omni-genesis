import React, { Component } from "react";

import "./castles.scss";

export default class CastleTabsDisplay extends Component {
  render() {
    const { castles } = this.props;

    const borderCastles = castles.map((castle, i) => {
      const {
        name,
        size,
        details: { location },
        commander,
        garrison,
        levies,
        age,
        structuralStatus,
        siegeHoldoutTime,
      } = castle;

      return (
        <li name={castle.name} key={castle.name + i} className={`infoTable__row pointer`}>
          <p className="tabs__subHeading">{name}</p>
          {commander && (
            <p className="tabs__subInfo">
              <span className="tabs__title break">Commander</span>{" "}
              <span className="info__value break">
                {commander.occupation} {commander.name.displayName}{" "}
              </span>{" "}
              {/* <small className="info__text">({commander.race})</small> */}
            </p>
          )}
          <p className="tabs__subInfo">
            <span className="tabs__title">Size:</span>{" "}
            <span className="info__value">{size.sizeDescription} </span>
          </p>
          <p className="tabs__subInfo">
            <span className="tabs__title">Structure Age:</span>{" "}
            <span className="info__value">{age} </span>
          </p>
          <p className="tabs__subInfo">
            <span className="tabs__title">Location:</span>{" "}
            <span className="info__value">{location} </span>
          </p>
          {structuralStatus && (
            <p className="tabs__subInfo">
              <span className="tabs__title">Structural Integrity:</span>{" "}
              <span className="info__value">{structuralStatus.description} </span>
            </p>
          )}
          {garrison && (
            <p className="tabs__subInfo">
              <span className="tabs__title">Garrison:</span>{" "}
              <span className="info__value">{garrison} </span>
            </p>
          )}
          {levies && (
            <p className="tabs__subInfo">
              <span className="tabs__title">Local Levies:</span>{" "}
              <span className="info__value">{levies} </span>
            </p>
          )}
          {siegeHoldoutTime && (
            <p className="tabs__subInfo">
              <span className="tabs__title">Siege Holdout:</span>{" "}
              <span className="info__value">{siegeHoldoutTime} days</span>
            </p>
          )}
          {castle.remnants && (
            <p className="tabs__subInfo">
              <span className="tabs__title">Occupant(s):</span>{" "}
              {!castle.remnants.residents && <span className="info__value">none</span>}
              {castle.remnants.residents && (
                <span className="info__value">{castle.remnants.residents.creature}</span>
              )}
            </p>
          )}
        </li>
      );
    });

    return <React.Fragment>{borderCastles}</React.Fragment>;
  }
}
