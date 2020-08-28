//components
import React, { Component } from "react";
import Utils from "../../components/utils";
import Aside from "../../components/aside";
import CityDisplay from "../../components/display/city";
import PersonDisplay from "../../components/display/person";

//generators
import CityGenerator from "../../components/generators/cities";

//data
import cityObj from "../../data/cities/cities";
import pantheonsObj from "../../data/gods/pantheons";
import placeNames from "../../data/names/randomPlaceNames";

//styles
import "styles/cities.scss";

export default class Settlements extends Component {
  constructor(props) {
    super(props);

    Utils.setNewSeed();
    const seed = global.seed;

    this.state = {
      display: null,
      pantheon: "centhris",
      seed: seed,
      city: null,
    };

    this.change = this.change.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.initCityBuild = this.initCityBuild.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
    this.urlBuild = this.urlBuild.bind(this);
  }

  componentDidMount() {
    if (window.location.search.length > 0 && window.location.search.includes("run=build")) {
      // automatically start a city build based on url provided params
      this.urlBuild(window.location.search);
    }
  }

  urlBuild(params) {
    const buildObj = {};
    params
      .substring(1)
      .split("&")
      .forEach((p) => {
        let arr = p.split("=");
        buildObj[arr[0]] = arr[1];
      });

    this.setState({
      city: new CityGenerator(buildObj),
      display: null,
      seed: global.seed,
      pantheon: buildObj.pantheon || "centhris",
    });
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
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

  initCityBuild() {
    let state = this.state;

    for (let key in state) {
      if (state[key] === "all") state[key] = undefined;
    }

    const city = new CityGenerator({ ...this.state });

    console.log(city);
    // this.runTest(500);

    Utils.setNewSeed();
    this.setState({
      city: city,
      display: null,
      seed: global.seed,
    });
  }

  runTest(num) {
    console.log(`Making ${num} cities`);
    console.time("cities");
    for (let i = 1; i <= num; i++) {
      Utils.setNewSeed();
      new CityGenerator({
        seed: global.seed,
        type: undefined,
      });
    }
    console.timeEnd("cities");
  }

  stateHandler(obj) {
    this.setState(obj);
  }

  render() {
    return (
      <div className="App">
        <main className="content">
          <Aside>
            <label>
              <span>City Size</span>
              <select name="type" onChange={this.change} value={this.state.type}>
                <option value="all">random size</option>
                {this.getOptions(cityObj.sizes, false)}
              </select>
            </label>
            <label>
              <span>Culture</span>
              <select name="culture" onChange={this.change} value={this.state.culture}>
                <option value="all">random culture</option>
                {this.getOptions(placeNames, true)}
              </select>
            </label>
            <label>
              <span>Pantheon</span>
              <select name="pantheon" onChange={this.change} value={this.state.pantheon}>
                {this.getOptions(pantheonsObj, true)}
              </select>
            </label>

            <label>
              <span>Seed</span>
              <input type="number" name="seed" onChange={this.change} value={this.state.seed} />
            </label>

            <button id="generateCity" className="buildButton" onClick={this.initCityBuild}>
              build city
            </button>
          </Aside>

          {this.state.city && (
            <CityDisplay
              city={this.state.city}
              state={this.state}
              stateHandler={this.stateHandler}
            />
          )}

          {this.state.person && (
            <PersonDisplay
              person={this.state.person}
              state={this.state}
              stateHandler={this.stateHandler}
            />
          )}
        </main>
      </div>
    );
  }
}
