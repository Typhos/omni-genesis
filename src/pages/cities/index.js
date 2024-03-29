//components

import React, { Component } from "react";

import Aside from "../../components/aside";
import Button from "../../components/controls/button/buttonStandard";
import CityDisplay from "../../components/display/city/city";
import CityGenerator from "../../generators/city";
import NumberInput from "../../components/controls/input/numberInput";
import PersonDisplay from "../../components/display/person/person";
import Select from "../../components/controls/select/selectStandard";
import Utils from "../../components/utils";
import cityObj from "../../data/cities/cities";
import placeNames from "../../data/places/randomPlaceNames";

//generators

//data

export default class Settlements extends Component {
  constructor(props) {
    super(props);

    Utils.setNewSeed();
    const seed = global.seed;

    this.state = {
      display: null,
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

  getOptions(obj, sort = false) {
    let keys = Object.keys(obj);

    if (sort) {
      keys = keys.sort();
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
    let { state } = this;

    for (let key in state) {
      if (state[key] === "all") state[key] = undefined;
    }

    const city = new CityGenerator({ ...this.state });

    // console.log(city);
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
    const { size, culture, seed } = this.state;

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <Select title={"City Size"} name={"size"} value={size} onChange={this.change}>
              <option value="all">random size</option>
              {this.getOptions(cityObj.sizes, false)}
            </Select>

            <Select title={"Culture"} name={"culture"} value={culture} onChange={this.change}>
              <option value="all">random culture</option>
              {this.getOptions(placeNames, true)}
            </Select>

            <NumberInput title={"Seed"} name={"seed"} value={seed} onChange={this.change} />

            <Button id={"generateCity"} className={"buildButton"} onClick={this.initCityBuild}>
              build city
            </Button>
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
