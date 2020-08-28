import React, { Component } from "react";
import Utils from "../../components/utils";
import Aside from "../../components/aside";
import Kingdom from "../../components/generators/kingdom";
import KingdomDisplay from "../../components/display/kingdom";
import CityDisplay from "../../components/display/city";
import PersonDisplay from "../../components/display/person";
import LoadingSpinner from "../../components/display/loadingSpinner";

import stateSizes from "../../data/kingdoms/sizes";
import placeNames from "../../data/names/randomPlaceNames";

export default class Kingdoms extends Component {
  constructor(props) {
    super(props);
    Utils.setNewSeed();

    this.state = {
      seed: global.seed,
      loading: false,
    };

    this.change = this.change.bind(this);
    this.buildKingdom = this.buildKingdom.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

  change(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  }

  buildKingdom() {
    const params = { ...this.state };
    const kingdom = new Kingdom(params);
    Utils.setNewSeed();

    this.setState({
      kingdom: kingdom,
      loading: false,
      seed: global.seed,
      display: null,
      fullDisplay: null,
      city: null,
      previousEntries: [],
    });
  }

  getOptions(obj, sort, filterKey) {
    let keys = Object.keys(obj);

    if (sort) {
      keys = keys.sort();
    }

    if (filterKey) {
      keys = keys.filter((e) => e !== filterKey);
    }

    return keys.map((key) => {
      return (
        <option key={key} value={key}>
          {key}
        </option>
      );
    });
  }

  stateHandler(obj) {
    this.setState(obj);
  }

  render() {
    const { size, culture, seed, kingdom, city, person, loading } = this.state;

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <label>
              <span>State Size</span>
              <select name="size" onChange={this.change} value={size}>
                <option value="all">random size</option>
                {this.getOptions(stateSizes.sizes, false)}
              </select>
            </label>

            <label>
              <span>Culture</span>
              <select name="culture" onChange={this.change} value={culture}>
                <option value="all">random culture</option>
                {this.getOptions(placeNames, true)}
              </select>
            </label>

            <label>
              <span>Seed</span>
              <input type="number" name="seed" onChange={this.change} value={seed} />
            </label>

            <button id="generateState" className="buildButton" onClick={this.buildKingdom}>
              build kingdom
            </button>
          </Aside>

          <LoadingSpinner name="kingdomLoading" show={loading}>
            <span>Loading...</span>
          </LoadingSpinner>

          {kingdom && (
            <KingdomDisplay kingdom={kingdom} state={this.state} stateHandler={this.stateHandler} />
          )}

          {city && <CityDisplay city={city} state={this.state} stateHandler={this.stateHandler} />}

          {person && (
            <PersonDisplay person={person} state={this.state} stateHandler={this.stateHandler} />
          )}
        </main>
      </div>
    );
  }
}
