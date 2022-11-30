import "./city.scss";

import React, { Component } from "react";

import Display from "../display";
import Noble from "../../../generators/person/noble";
import NobleDisplay from "./nobles";
import PopulationDisplay from "./population";
import ShopsDisplay from "./shops";
import Tabs from "../../tabs";
import ThreeColumnDisplay from "../columns/threeColumns.js";
import TwoColumnDisplay from "../columns/twoColumns.js";
import Utils from "../../utils";

export default class CityDisplay extends Component {
  constructor(props) {
    super(props);

    this.updateDisplay = this.updateDisplay.bind(this);
    this.backOneEntry = this.backOneEntry.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  updateDisplay(display) {
    if (this.props.state.display === display) {
      this.props.stateHandler({ display: null });
    } else {
      this.props.stateHandler({ display: display });
    }
  }

  updateName(e) {
    let city = this.props.city;
    city.name = e.target.value;
    this.props.stateHandler({
      city: city,
      name: e.target.value,
    });
  }

  backOneEntry() {
    const priorEntry = this.props.state.previousEntries[
      this.props.state.previousEntries.length - 1
    ];
    this.props.state.previousEntries.pop();

    this.props.stateHandler({
      [priorEntry.type]: priorEntry,
      city: null,
    });
  }

  sendToPersonEntry(city, displayName, path) {
    let targetPerson = path.find((s) => s.name.displayName === displayName);

    const newNoble = new Noble({
      ...targetPerson.inputParams,
      seed: targetPerson.seed,
    });

    let previousEntries = this.props.state.previousEntries || [];
    previousEntries.push(city);

    let newState = { ...this.props.state };
    newState.display = null;
    newState.kingdom = null;
    newState.city = null;
    newState.person = newNoble;
    newState.previousEntries = previousEntries;

    this.props.stateHandler(newState);
  }

  numericalObjectDisplay(obj) {
    const list = [];

    for (let [name, val] of Object.entries(obj)) {
      list.push(
        <li name={name} key={name} className={`infoTable__row numeric ${val === 0 ? "zero" : ""}`}>
          <span className="name">{name}:</span>{" "}
          <span className="info__value">{Utils.numberWithCommas(val)}</span>
        </li>
      );
    }

    return list;
  }

  render() {
    const { city } = this.props;

    return (
      <Display>
        {this.props.state &&
          this.props.state.previousEntries &&
          this.props.state.previousEntries.length > 0 && (
            <React.Fragment>
              <button
                className="backButton"
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

        <h1 className="displayLayout__header">{city.name}</h1>

        <div className="iconContainer right">
          <span
            role="img"
            className="emojiIcon seed"
            data-balloon-pos="up"
            aria-label={`seed: ${city.seed}`}
            onClick={() => {
              navigator.clipboard.writeText(city.seed);
            }}
          >
            🌱
          </span>

          <span
            role="img"
            className="emojiIcon save"
            aria-label={`Copy URL to ${city.name}`}
            data-balloon-pos="left"
            onClick={() => {
              navigator.clipboard.writeText(Utils.buildShareURL(city));
            }}
          >
            🔗
          </span>

          <span
            role="img"
            className="emojiIcon copyData"
            aria-label={`Copy JSON for ${city.name}`}
            data-balloon-pos="left"
          >
            📋
          </span>
        </div>

        <div className="displayLayout">
          <div className="column">
            <p className="info">
              <span className="info__label">Size: </span>
              <span className="info__value capitalize">{city.citySize}</span>
            </p>
            <p className="info">
              <span className="info__label">Pop: </span>
              <span className="info__value">{Utils.numberWithCommas(city.population.total)}</span>
            </p>

            <br />

            <p className="info">
              <span className="info__label">Prof. Guards: </span>
              <span className="info__value">{city.guards.count}</span>
            </p>

            <p className="info">
              <span className="info__label">Militia Levy: </span>
              <span className="info__value">
                {city.population.total >= 4000 ? "N/A" : city.guards.militiaLevy}
              </span>
            </p>
            {/* <p className="info">
              <span className="info__label">Important People: </span>
              <span className="info__value">{city.population.importantPeople.number}</span>
            </p>
            <p className="info">
              <span className="info__label">Corruption: </span>
              <span className="info__value">{city.government.corruption}</span>
            </p> */}
          </div>
          <div className="info">
            {/* <p className="cityType">
              <span className="info__label">Economy:</span>{" "}
              <span className="info__value">{city.economy.description}</span>
            </p>
            <p className="info">
              <span className="info__label">Economic Focus:</span>{" "}
              <span className="info__value">{city.economy.primary}</span>
            </p> */}
            {/* <p className="info">
              <span className="info__label">Tradesfolk: </span>
              <span className="info__value">
                {Utils.numberWithCommas(city.economy.merchants.tradesTotal)}
              </span>
              <span className="info__value">
                {" "}
                ({((city.economy.merchants.tradesTotal / city.population.total) * 100).toFixed(1)}
                %)
              </span>
            </p> */}
            <p className="info">
              <span className="info__label">Government: </span>
              <span className="info__value">{city.government.details.name}</span>
              <span
                role="img"
                className="emojiIcon text"
                aria-label={city.government.details.description}
                data-balloon-length="large"
                data-balloon-pos="right"
              >
                ❓
              </span>
            </p>
            <p className="info">
              <span className="info__label">Leader: </span>
              <span className="info__value">{city.government.leader.occupation} </span>
              <span className="info__value">{city.government.leader.name.displayName}</span>
            </p>
            <br />
            <p className="info">
              <span className="info__label">Churches of Law: </span>
              <span className="info__value">{city.religion.lawChurches}</span>
            </p>
            <p className="info">
              <span className="info__label">Temples of Chaos: </span>
              <span className="info__value">
                {Utils.numberWithCommas(city.religion.chaosTemples)}
              </span>
            </p>
            <p className="info">
              <span className="info__label">Local Deity Shrines: </span>
              <span className="info__value">{Utils.numberWithCommas(city.religion.shrines)}</span>
            </p>
            <br />
            {/* <p className="info">
              <span className="info__label">Water Source:</span>{" "}
              <span className="info__value">tbd</span>
            </p> */}
            {/* <br />
            <p className="info">
              <span className="info__label">Architecture:</span>{" "}
              <span className="info__value">{city.houses}</span>
            </p> */}
          </div>
        </div>

        <Tabs>
          <div label="Population">
            <h3 className="tabs__groupHeading">Population of {city.name}</h3>
            <ThreeColumnDisplay>
              <PopulationDisplay city={city} />
            </ThreeColumnDisplay>
          </div>
          <div
            label={`Leaders (${Utils.numberWithCommas(
              city.population.importantPeople.noblePeopleArray.length
            )})`}
          >
            <h3 className="tabs__groupHeading">Important People of {city.name}</h3>
            <TwoColumnDisplay>
              {city.population.importantPeople.noblePeopleArray.sort().map((obj, ind) => (
                <NobleDisplay
                  key={ind}
                  nobles={obj}
                  city={city}
                  index={ind}
                  // sendToPersonEntry={this.sendToPersonEntry}
                />
              ))}
            </TwoColumnDisplay>
          </div>
          <div label="Traits">
            <h3 className="tabs__groupHeading">
              Origin: <span className="info__value">{city.origin.name}</span>
            </h3>
            <p>
              <small>{city.origin.description}</small>
            </p>

            <h3 className="tabs__groupHeading">
              Activity: <span className="info__value">{city.activity.name}</span>
            </h3>
            <p>
              <small>{city.activity.description}</small>
            </p>

            {city.obstacles.map((ob) => {
              return (
                <React.Fragment key={ob.name}>
                  <h3 className="tabs__groupHeading">
                    Obstacle: <span className="info__value">{ob.name}</span>
                  </h3>
                  <p>
                    <small>{ob.description}</small>
                  </p>
                </React.Fragment>
              );
            })}
          </div>
          <div label="Nearby Ruins">
            {city.ruins.map((ob) => {
              const {
                type,
                typeDescription,
                trait,
                traitDescription,
                obstacle,
                obstacleDescription,
              } = ob;
              return (
                <React.Fragment key={type + trait}>
                  <h3 className="tabs__groupHeading">{type}</h3>
                  <small>{typeDescription}</small>
                  <p className="info">
                    <span className="info__value">Ruin Trait:</span>&nbsp;
                    <span className="info__label">{trait}</span>
                  </p>
                  <p>
                    <small>{traitDescription}</small>
                  </p>
                  <p className="info">
                    <span className="info__value">Ruin Obstacle:</span>&nbsp;
                    <span className="info__label">{obstacle}</span>
                  </p>
                  <p>
                    <small>{obstacleDescription}</small>
                  </p>
                </React.Fragment>
              );
            })}
          </div>
          {city.economy.merchants.shopsTotal > 0 && (
            <div label={`Shops (${Utils.numberWithCommas(city.economy.merchants.shopsTotal)})`}>
              <h3 className="tabs__groupHeading">
                Prominent Shops of {city.name}
                {city.population.total > 2499 && "*"}
              </h3>
              {city.population.total > 2499 && (
                <small>
                  *Due to the number of shops generated in {city.name}, a limited selection of its
                  shops are presented here
                </small>
              )}
              <ShopsDisplay city={city} />
            </div>
          )}
          {/* {city.economy.merchants.tradesTotal > 0 && (
            <div label="Tradesfolk">
              <h3 className="tabs__groupHeading">Tradesfolk of {city.name}</h3>
              <ThreeColumnDisplay>
                {this.numericalObjectDisplay(city.economy.merchants.tradesArray)}
              </ThreeColumnDisplay>
            </div>
          )} */}
        </Tabs>
      </Display>
    );
  }
}
