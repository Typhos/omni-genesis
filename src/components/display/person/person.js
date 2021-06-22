import React, { Component } from "react";
import Utils from "../../utils";
import Display from "../display";
import StatBlock from "../statBlock/statBlock";
import TwoColumnDisplay from "../columns/twoColumns.js";
import OneColumnDisplay from "../columns/oneColumn.js";

import displayStyles from "../display.module.scss";
// import styles from "./person.module.scss";

export default class PersonDisplay extends Component {
  constructor(props) {
    super(props);

    this.updateDisplay = this.updateDisplay.bind(this);
    this.raceString = this.raceString.bind(this);
    this.backOneEntry = this.backOneEntry.bind(this);
  }

  updateDisplay(display) {
    if (this.props.state.display === display) {
      this.props.stateHandler({ display: null });
    } else {
      this.props.stateHandler({ display: display });
    }
  }

  raceString(person) {
    if (person.subRace && person.subRace.name && person.subRace.name !== "Variant") {
      if (person.subRace.alias) {
        return `${person.subRace.alias[0].toLowerCase()} ${person.race}`;
      }

      return `${person.subRace.name.toLowerCase()} ${person.race}`;
    }

    return person.race;
  }

  backOneEntry() {
    const priorEntry = this.props.state.previousEntries[
      this.props.state.previousEntries.length - 1
    ];
    this.props.state.previousEntries.pop();

    this.props.stateHandler({
      [priorEntry.type]: priorEntry,
      person: null,
      display: "nobles",
    });
  }

  displayPopulationInformation(fullObj, array, type) {
    const list = [];

    for (let i = 0; i < array.length; i++) {
      let capital = type === "cities" && i === 0 ? "capital" : "";

      list.push(
        <li
          name={array[i].name}
          key={array[i].name + i}
          className={`infoTable__row numeric pointer`}
          onClick={() => {
            this.sendToCityEntry(fullObj, array[i].name, type);
          }}
        >
          <strong>
            {capital !== "" && (
              <span
                role="img"
                className="emjoiIcon text capital"
                aria-label="capital city"
                data-balloon-pos="up"
              >
                👑
              </span>
            )}{" "}
            {array[i].name}:{" "}
          </strong>
          <span>{Utils.numberWithCommas(array[i].population.total)}</span>
        </li>
      );
    }

    return list;
  }

  render() {
    const { person } = this.props;

    console.log(person);

    return (
      <Display>
        {this.props.state &&
          this.props.state.previousEntries &&
          this.props.state.previousEntries.length > 0 && (
            <React.Fragment>
              <button
                className={displayStyles.backButton}
                onClick={() => {
                  this.backOneEntry();
                }}
              >
                &laquo; Back to{" "}
                {this.props.state.previousEntries[this.props.state.previousEntries.length - 1].name}
              </button>
              <br />
            </React.Fragment>
          )}
        <h2 className={`displayLayout__name ${displayStyles.headline} ${displayStyles.name}`}>
          {person.name.displayName}
        </h2>
        <h2 className="displayLayout__subHeading">
          {this.raceString(person)} {person.occupation}
        </h2>

        <TwoColumnDisplay>
          <li className="infoTable__row">
            <span className="info__label">Sex:</span>{" "}
            <span className="info__value">{person.sex}</span>
          </li>
          <li className="infoTable__row">
            <span className="info__label">Alignment:</span>{" "}
            <span className="info__value">{person.alignment}</span>
          </li>
          <li className="infoTable__row">
            <span className="info__label">Age:</span>{" "}
            <span className="info__value">
              {person.age} ({person.ageGroup})
            </span>
          </li>
        </TwoColumnDisplay>

        {person.physical && (
          <TwoColumnDisplay>
            {this.props.state.imperial && (
              <React.Fragment>
                <li className="infoTable__row">
                  <span className="info__label">Height:</span>{" "}
                  <span className="info__value">
                    {Math.floor(person.physical.imperial.height / 12)} ft{" "}
                    {person.physical.imperial.height % 12} in
                  </span>
                </li>
                <li className="infoTable__row">
                  <span className="info__label">Weight:</span>{" "}
                  <span className="info__value">{person.physical.imperial.weight} lbs.</span>
                </li>
              </React.Fragment>
            )}
            {!this.props.state.imperial && (
              <React.Fragment>
                <li>
                  <span className="info__label">Height:</span>{" "}
                  <span className="info__value">{person.physical.metric.height} cm</span>
                </li>
                <li>
                  <span className="info__label">Weight:</span>{" "}
                  <span className="info__value">{person.physical.metric.weight} kg</span>
                </li>
              </React.Fragment>
            )}
          </TwoColumnDisplay>
        )}

        {person.description && (
          <OneColumnDisplay>
            {/* <li className="infoTable__row">
              <span className="info__label">Likes: </span>{" "}
              <span className="capitalize info__value">{person.description.likes}</span>
            </li>
            <li className="infoTable__row">
              <span className="info__label">Dislikes: </span>{" "}
              <span className="capitalize info__value">{person.description.dislikes}</span>
            </li> */}
            {/* <li className="infoTable__row">
              <span className="info__label">Random Fact: </span>{" "}
              <span className="info__value">{person.description.statsDescription[0]}</span>
            </li> */}
            <li className="infoTable__row">
              <span className="info__label">Personality: </span>{" "}
              <span className="info__value">{person.description.personality.text}</span>
            </li>
            <li className="infoTable__row">
              <span className="info__label">Quirk: </span>{" "}
              <span className="info__value">{person.description.quirk}</span>
            </li>
          </OneColumnDisplay>
        )}
        {person.stats && (
          <React.Fragment>
            <StatBlock person={person} />
          </React.Fragment>
        )}
      </Display>
    );
  }
}
