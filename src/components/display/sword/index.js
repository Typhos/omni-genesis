import "./sword.scss";

import React, { Component } from "react";

import Display from "../display";

export default class SwordDisplay extends Component {
  render() {
    const {
      state: { sword },
    } = this.props;
    const {
      type,
      condition,
      material,
      feel,
      edge,
      bladeWidth,
      bladeFlat,
      bladeType,
      tip,
      handle,
      guard,
      pommel,
    } = sword;

    return (
      <Display>
        <h1 className="displayLayout__heading">
          {material.name} {type}
        </h1>
        <p>
          <strong className="info__value">Condition:</strong>{" "}
          <span className="info__label">{condition.description}</span>
        </p>
        <p>
          <strong className="info__value">Feel:</strong>{" "}
          <span className="info__label">{feel.name}</span> <small>({feel.description})</small>
        </p>
        <section className="swordDisplay__details">
          <div className="swordDisplay__column">
            <h3 className="tabs__groupHeading">Blade</h3>
            <p>
              <strong className="info__value">Edge:</strong>{" "}
              <span className="info__label">{edge.name}</span> <small>({edge.description})</small>
            </p>
            <p>
              <strong className="info__value">Edge Style:</strong>{" "}
              <span className="info__label">{bladeType.name}</span>{" "}
              <small>({bladeType.description})</small>
            </p>
            <p>
              <strong className="info__value">Blade Width:</strong>{" "}
              <span className="info__label">{bladeWidth.name}</span>{" "}
              <small>({bladeWidth.description})</small>
            </p>
            <p>
              <strong className="info__value">Blade Flat:</strong>{" "}
              <span className="info__label">{bladeFlat.name}</span>{" "}
              <small>({bladeFlat.description})</small>
            </p>
            <p>
              <strong className="info__value">Tip:</strong>{" "}
              <span className="info__label">{tip.name}</span> <small>({tip.description})</small>
            </p>
          </div>
          <div className="swordDisplay__column">
            <h3 className="tabs__groupHeading">Handle</h3>
            <p>
              <strong className="info__value">Guard:</strong>{" "}
              <span className="info__label">{guard.name}</span> <small>({guard.description})</small>
            </p>
            <p>
              <strong className="info__value">Grip:</strong>{" "}
              <span className="info__label">{handle.name}</span>{" "}
              <small>({handle.description})</small>
            </p>
            <p>
              <strong className="info__value">Pommel:</strong>{" "}
              <span className="info__label">{pommel.name}</span>{" "}
              <small>({pommel.description})</small>
            </p>
          </div>
        </section>
      </Display>
    );
  }
}
