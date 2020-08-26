//components
import React, { Component } from "react";
import Utils from "../../components/utils";
import Aside from "../../components/aside";
import CityDisplay from "../../components/display/city/city";
import PersonDisplay from "../../components/display/person/person";
import Button from "../../components/controls/button/buttonStandard";
import Select from "../../components/controls/select/selectStandard";
import NumberInput from "../../components/controls/input/numberInput";

//generators
import CityGenerator from "../../components/generators/city";

//data
import cityObj from "../../data/cities/cities";
import pantheonsObj from "../../data/gods/pantheons";
import placeNames from "../../data/names/randomPlaceNames";

export default class Settlements extends Component {
  constructor(props) {
    super(props);

    Utils.setNewSeed();
    const seed = Math.seed;

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
      seed: Math.seed,
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
    let { state } = this;

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
      seed: Math.seed,
    });
  }

  runTest(num) {
    console.log(`Making ${num} cities`);
    console.time("cities");
    for (let i = 1; i <= num; i++) {
      Utils.setNewSeed();
      new CityGenerator({
        seed: Math.seed,
        type: undefined,
      });
    }
    console.timeEnd("cities");
  }

  stateHandler(obj) {
    this.setState(obj);
  }

  render() {
    const { size, culture, pantheon, seed } = this.state;

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

            <Select title={"Pantheon"} name={"pantheon"} value={pantheon} onChange={this.change}>
              {this.getOptions(pantheonsObj, true)}
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
