import React, { Component } from "react";
import Display from "../display";
import ThreeColumnDisplay from "../columns/threeColumns.js";
import TwoColumnDisplay from "../columns/twoColumns.js";
import Utils from "../../utils";
import Noble from "../../generators/person/noble";

import Tabs from "../../tabs";
import PopulationDisplay from "./population";
import NobleDisplay from "./nobles";
import ShopsDisplay from "./shops";

import "./city.scss";

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
    const images = require.context("../../../img/", true);
    const path = images(`./${city.image}`) || "";

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

        <img className="cityImg" src={path} />

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
            {city.population.total <= 4000 && (
              <p className="info">
                <span className="info__label">Militia Levy: </span>
                <span className="info__value">{city.guards.militiaLevy}</span>
              </p>
            )}
            <br />
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
            <p className="info">
              <span className="info__label">Important People: </span>
              <span className="info__value">{city.population.importantPeople.number}</span>
            </p>
            <p className="info">
              <span className="info__label">Corruption: </span>
              <span className="info__value">{city.government.corruption}</span>
            </p>
          </div>
          <div className="info">
            <p className="cityType">
              <span className="info__label">Economy:</span>{" "}
              <span className="info__value">{city.economy.description}</span>
            </p>
            <p className="info">
              <span className="info__label">Economic Focus:</span>{" "}
              <span className="info__value">{city.economy.primary}</span>
            </p>
            <p className="info">
              <span className="info__label">Tradesfolk: </span>
              <span className="info__value">
                {Utils.numberWithCommas(city.economy.merchants.tradesTotal)}
              </span>
              <span className="info__value">
                {" "}
                ({((city.economy.merchants.tradesTotal / city.population.total) * 100).toFixed(1)}
                %)
              </span>
            </p>
            <p className="info">
              <span className="info__label">Shops: </span>
              <span className="info__value">
                {Utils.numberWithCommas(city.economy.merchants.shopsTotal)}
              </span>
            </p>
            <p className="info">
              <span className="info__label">Crime: </span>
              <span className="info__value">{city.economy.crime}</span>
            </p>
            <br />
            <p className="info">
              <span className="info__label">Temples: </span>
              <span className="info__value">{city.religion.temples.count}</span>
            </p>
            <p className="info">
              <span className="info__label">Shrines: </span>
              <span className="info__value">
                {Utils.numberWithCommas(city.religion.shrines.count)}
              </span>
            </p>
            <br />
            <p className="info">
              <span className="info__label">Water Source:</span>{" "}
              <span className="info__value">tbd</span>
            </p>
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
              {/* {this.numericalObjectDisplay(city.population.races)} */}
            </ThreeColumnDisplay>
          </div>
          <div label="Nobility">
            <h3 className="tabs__groupHeading">Nobility of {city.name}</h3>
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
          {city.economy.merchants.shopsTotal > 0 && (
            <div label="Shops">
              <h3 className="tabs__groupHeading">Prominent Shops of {city.name}</h3>
              <ShopsDisplay city={city} />
            </div>
          )}
          {city.economy.merchants.tradesTotal > 0 && (
            <div label="Tradesfolk">
              <h3 className="tabs__groupHeading">Tradesfolk of {city.name}</h3>
              <ThreeColumnDisplay>
                {this.numericalObjectDisplay(city.economy.merchants.tradesArray)}
              </ThreeColumnDisplay>
            </div>
          )}
          {(city.religion.temples.count > 0 || city.religion.shrines.count > 0) && (
            <div label="Religion">
              {city.religion.temples.count > 0 && (
                <React.Fragment>
                  <h3 className="tabs__groupHeading">Temples</h3>
                  <ThreeColumnDisplay>
                    {this.numericalObjectDisplay(city.religion.temples.breakdown)}
                  </ThreeColumnDisplay>
                </React.Fragment>
              )}
              {city.religion.shrines.count > 0 && (
                <React.Fragment>
                  <h3 className="tabs__groupHeading">Shrines</h3>
                  <ThreeColumnDisplay>
                    {this.numericalObjectDisplay(city.religion.shrines.breakdown)}
                  </ThreeColumnDisplay>
                </React.Fragment>
              )}
            </div>
          )}
        </Tabs>
      </Display>
    );
  }
}
