import "./patrons.scss";

import React, { Component } from "react";

import Display from "../display";

export default class TavernPatronDisplay extends Component {
  render() {
    const {
      state: { tavern }
    } = this.props;

    const { patrons, tavernName, timeOfDay } = tavern;

    return (
      <Display>
        <h1 className="displayLayout__header">
          This {timeOfDay} at <br />
          <span className="info__key">{tavernName}</span>
        </h1>
        <h2 className="subHead">Total Patrons: {patrons.length}</h2>
        <ul className="tavernPatron-list">
          {patrons.map((patron, i) => {
            const { name, number, persons } = patron;
            return (
              <li key={i} className="tavernPatron-list__item">
                <p className="tavernPatron">
                  {number > 1 && <span>{number}</span>}
                  &nbsp;
                  {name}
                </p>
                {persons && persons.length > 0 && (
                  <ul className="randomPatrons-list">
                    {persons.map((p, j) => {
                      if (p.level) {
                        return (
                          <li key={p.name + j} className="randomPatrons-list__item">
                            {p.name}, {p.charClass !== "Adventurer" && p.charClass}{" "}
                            {p.charClass === "Adventurer" && p.race} {p.level}
                          </li>
                        );
                      } else {
                        return (
                          <li key={p.name.displayName + j} className="randomPatrons-list__item">
                            {p.name.displayName}
                          </li>
                        );
                      }
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </Display>
    );
  }
}
