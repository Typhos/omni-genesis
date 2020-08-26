import React, { Component } from "react";
import Display from "../display";
import ThreeColumnDisplay from "../columns/threeColumns.js";
import TwoColumnDisplay from "../columns/twoColumns.js";
import Utils from "../../utils";
import City from "../../generators/city";
import Tabs from "../../tabs";

import CityTabsDisplay from "./cities";
import TownTabsDisplay from "./towns";

import "./kingdom.scss";

export default class KingdomDisplay extends Component {
  constructor(props) {
    super(props);

    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  updateName(e) {
    let kingdom = this.props.kingdom;
    kingdom.name = e.target.value;
    this.props.stateHandler({
      kingdom: kingdom,
      name: e.target.value,
    });
  }

  updateDisplay(display) {
    if (this.props.state.display === display) {
      this.props.stateHandler({ display: null });
    } else {
      this.props.stateHandler({ display: display });
    }
  }

  sendToCityEntry(kingdom, entryName, type) {
    let targetCity = kingdom.settlements[type][type].find((s) => s.name === entryName);

    const newCity = new City({
      ...targetCity.inputParams,
      seed: targetCity.seed,
      lightWeight: false,
    });

    let previousEntries = this.props.state.previousEntries || [];
    previousEntries.push(kingdom);

    let newState = { ...this.props.state };
    newState.display = null;
    newState.kingdom = null;
    newState.city = newCity;
    newState.previousEntries = previousEntries;

    this.props.stateHandler(newState);
  }

  displayPopulationInformation(fullObj, array, type) {
    const list = [];

    for (let i = 0; i < array.length; i++) {
      let capital = type === "cities" && i === 0 ? "capital" : "";

      list.push(
        <li
          name={array[i].name}
          key={array[i].name + i}
          className={`infoTableRow numeric pointer`}
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
    const kingdom = this.props.kingdom;

    return (
      <Display>
        {/* <input
          type="text"
          className="name heading"
          size={kingdom.name.length + kingdom.name.length / 3}
          onChange={this.updateName}
          value={kingdom.name}
        /> */}
        <h1 className="kingdomName">{kingdom.name}</h1>

        <div className="iconContainer right">
          <span
            role="img"
            className="emjoiIcon seed"
            data-balloon-pos="up"
            aria-label={`seed: ${kingdom.seed}`}
            onClick={() => {
              navigator.clipboard.writeText(kingdom.seed);
            }}
          >
            🌱
          </span>

          <span
            role="img"
            className="emjoiIcon save"
            aria-label={`Copy URL to ${kingdom.name}`}
            data-balloon-pos="left"
            onClick={() => {
              navigator.clipboard.writeText(Utils.buildShareURL(kingdom));
            }}
          >
            🔗
          </span>

          <span
            role="img"
            className="emjoiIcon copyData"
            aria-label={`Copy JSON for ${kingdom.name}`}
            data-balloon-pos="left"
          >
            📋
          </span>
        </div>

        <div className="displayLayout">
          <div className="column">
            <p className="">
              <span className="info__label">Area: </span>
              <span className="info__value capitalize">
                {Utils.numberWithCommas(kingdom.area.sqMiles)} sq. miles
              </span>
            </p>
            <p>
              <small className="info__note">
                <em>{kingdom.area.description}</em>
              </small>
            </p>
            <br />
            <p className="">
              <span className="info__label">Arable Land: </span>
              <span className="info__value">
                {kingdom.area.arablePercent}% ({Utils.numberWithCommas(kingdom.area.arable)} sq.
                miles)
              </span>
            </p>
            <p className="">
              <span className="info__label">Wilderness: </span>
              <span className="info__value">
                {kingdom.area.wildernessPercent}% ({Utils.numberWithCommas(kingdom.area.wilderness)}{" "}
                sq. miles)
              </span>
            </p>

            <br />

            <p className="capitalize">
              <strong>Age: </strong>
              <span className="info__value">{kingdom.age}</span>
            </p>

            <p className="capitalize">
              <strong>Culture: </strong>
              <span className="info__value">{kingdom.culture}</span>
            </p>
          </div>
          <div className="column">
            <p className="">
              <span className="info__label">Population: </span>
              <span className="info__value">
                {Utils.numberWithCommas(kingdom.population.total)}
              </span>
            </p>

            <p className="">
              <span className="info__label">Density: </span>
              <span className="info__value">
                {Utils.numberWithCommas(kingdom.density.int)} persons per sq. mile
              </span>{" "}
              <span className="info__note">({kingdom.density.string})</span>
            </p>

            <br />
            <p className="">
              <span className="info__label">Cities: </span>
              <span className="info__value">
                {Utils.numberWithCommas(kingdom.settlements.cityInfo.count)}
              </span>
            </p>

            <p className="">
              <span className="info__label">Towns: </span>
              <span className="info__value">
                {Utils.numberWithCommas(kingdom.settlements.townInfo.count)}
              </span>
            </p>

            <p className="">
              <span className="info__label">Urban Population: </span>
              <span className="info__value">
                {Utils.numberWithCommas(kingdom.settlements.urbanPopulation.total)}
              </span>{" "}
              <span className="info__note">
                ({kingdom.settlements.urbanPopulation.percentage}%)
              </span>
            </p>

            <br />

            <p className="">
              <span className="info__label">Border Castles: </span>
              <span className="info__value">{kingdom.defenses.activeCastles.borderKeeps}</span>
            </p>

            <p className="">
              <span className="info__label">Interior Castles: </span>
              <span className="info__value">{kingdom.defenses.activeCastles.civilKeeps}</span>
            </p>

            <p className="">
              <span className="info__label">Ruined Castles: </span>
              <span className="info__value">{kingdom.defenses.ruinedCastles.total}</span>
            </p>
          </div>
        </div>

        <Tabs>
          <div label="Cities">
            <h3 className="tabs__groupHeading">Cities of {kingdom.name}</h3>
            <TwoColumnDisplay>
              <CityTabsDisplay kingdom={kingdom} />
            </TwoColumnDisplay>
          </div>
          <div label="Towns">
            <h3 className="tabs__groupHeading">Notable Towns of {kingdom.name}</h3>
            <ThreeColumnDisplay>
              <TownTabsDisplay kingdom={kingdom} />
            </ThreeColumnDisplay>
          </div>
          <div label="Government">
            <h3 className="tabs__groupHeading">Government of {kingdom.name}</h3>
            <ThreeColumnDisplay>TBD</ThreeColumnDisplay>
          </div>
          <div label="Castles">
            <h3 className="tabs__groupHeading">Castles of {kingdom.name}</h3>
            <ThreeColumnDisplay>TBD</ThreeColumnDisplay>
          </div>
          <div label="Regions">
            <h3 className="tabs__groupHeading">
              Regions and Geographic Features of {kingdom.name}
            </h3>
            <ThreeColumnDisplay>TBD</ThreeColumnDisplay>
          </div>
        </Tabs>
      </Display>
    );
  }
}
