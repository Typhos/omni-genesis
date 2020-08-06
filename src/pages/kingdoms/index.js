import React, { Component } from 'react';
import Utils from "components/utils";
import Aside from "components/aside";
import Kingdom from 'components/generators/kingdom';
import KingdomDisplay from "components/display/kingdom";
import CityDisplay from 'components/display/city';
import PersonDisplay from 'components/display/person';

import stateSizes from "data/kingdoms/sizes";
import placeNames from "data/names/randomPlaceNames";


export default class Kingdoms extends Component {
  
  constructor(props) {
    super(props);
    Utils.setNewSeed();

    this.state = {
      "seed": Math.seed
    };

    this.change = this.change.bind(this);
    this.buildKingdom = this.buildKingdom.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

  change (e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  buildKingdom() {
    const params = {...this.state};

    console.time('kingdom build');
    const kingdom = new Kingdom(params);
    console.timeEnd('kingdom build');

    Utils.setNewSeed();

    this.setState({
      "kingdom": kingdom,
      "display": null,
      "fullDisplay": null,
      "seed": Math.seed,
      "city": null,
      "previousEntries": []
    });

    console.log(kingdom)
  }

  getOptions(obj, sort, filterKey) {
    let keys = Object.keys(obj);

    if (sort) {
      keys = keys.sort();
    }

    if (filterKey) {
      keys = keys.filter(e => e !== filterKey);
    }

    return keys.map( key => {
      return <option key={key} value={key}>{key}</option>
    });
  }

  stateHandler(obj){
    this.setState(obj);
  }

  render() {

    return (
      <div className="App">
        <main className="content">
        <Aside>
            <label>State Size
              <select name="size" onChange={this.change} value={this.state.size}>
                <option value="all">random size</option>
                {this.getOptions(stateSizes.sizes, false)}
              </select>
            </label>

            <label>Culture
              <select name="culture" onChange={this.change} value={this.state.culture}>
                <option value="all">random culture</option>
                {this.getOptions( placeNames, true)}
              </select>
            </label>

            <label>Seed
              <input type="number" name="seed" onChange={this.change} value={this.state.seed}/>
            </label>

            <button id="generateState" className="buildButton" onClick={this.buildKingdom}>build kingdom</button>
          </Aside>

          { this.state.kingdom && 
            <KingdomDisplay kingdom={this.state.kingdom} state={this.state} stateHandler={this.stateHandler}/>
          }

          { this.state.city &&
            <CityDisplay city={this.state.city} state={this.state} stateHandler={this.stateHandler}/>
          }

          { this.state.person &&
            <PersonDisplay person={this.state.person} state={this.state} stateHandler={this.stateHandler}/>
          }

        </main>
      </div>
    );
  }
}
