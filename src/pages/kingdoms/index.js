import React, { Component } from "react";
import Utils from "../../components/utils";
import Aside from "../../components/aside";
import Kingdom from "../../generators/kingdom";
import KingdomDisplay from "../../components/display/kingdom/kingdom";
import CityDisplay from "../../components/display/city/city";
import PersonDisplay from "../../components/display/person/person";
import Button from "../../components/controls/button/buttonStandard";
import Select from "../../components/controls/select/selectStandard";
import NumberInput from "../../components/controls/input/numberInput";

import stateSizes from "../../data/kingdoms/sizes";
import placeNames from "../../data/places/randomPlaceNames";

export default class Kingdoms extends Component {
  constructor(props) {
    super(props);
    Utils.setNewSeed();

    this.state = {
      seed: global.seed,
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

    console.log(kingdom);

    this.setState({
      kingdom: kingdom,
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
      <div className='App'>
        <main className='content'>
          <Aside>
            <Select title={"Kingdom Size"} name={"size"} value={size} onChange={this.change}>
              <option value='all'>random size</option>
              {this.getOptions(stateSizes.sizes, false)}
            </Select>

            <Select title={"Culture"} name={"culture"} value={culture} onChange={this.change}>
              <option value='all'>random culture</option>
              {this.getOptions(placeNames, true)}
            </Select>

            <NumberInput title={"Seed"} name={"seed"} value={seed} onChange={this.change} />

            <Button id={"generateState"} className={"buildButton"} onClick={this.buildKingdom}>
              build kingdom
            </Button>
          </Aside>

          {kingdom && <KingdomDisplay kingdom={kingdom} state={this.state} stateHandler={this.stateHandler} />}

          {city && <CityDisplay city={city} state={this.state} stateHandler={this.stateHandler} />}

          {person && <PersonDisplay person={person} state={this.state} stateHandler={this.stateHandler} />}
        </main>
      </div>
    );
  }
}
