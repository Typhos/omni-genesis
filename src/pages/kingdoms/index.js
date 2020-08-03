import React, { Component } from 'react';
import Utils from "components/utils";
import Aside from "components/aside";
import Display from "components/display";

import stateSizes from "data/kingdoms/sizes";
import Kingdom from 'components/generators/kingdom';
import KingdomDisplay from "components/display/kingdom";

export default class Kingdoms extends Component {
  
  constructor(props) {
    super(props);
    Utils.setNewSeed();

    this.state = {
      "age": undefined,
      "area": undefined,
      "density": undefined,
      "population": undefined,
      "size": undefined,
      "seed": Math.seed
    };

    this.change = this.change.bind(this);
    this.buildState = this.buildState.bind(this);
  }

  change (e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  buildState() {
    const params = {
      age: this.state.age,
      area: this.state.area,
      density: this.state.density,
      population: this.state.population,
      size: this.state.size,
      seed: this.state.seed 
    };

    const kingdom = new Kingdom(params);
    Utils.setNewSeed();

    this.setState({
      "kingdom": kingdom,
      "seed": Math.seed
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

  render() {
    const kingdom = this.state.kingdom;

    return (
      <div className="App">
        <main className="content">
        <Aside>
            <label>State Size
              <select name="size" onChange={this.change} value={this.state.size}>
                <option value="all">random size</option>
                {this.getOptions(stateSizes, false)}
              </select>
            </label>

            <label>Seed
              <input type="number" name="seed" onChange={this.change} value={this.state.seed}/>
            </label>

            <button id="generateState" className="buildButton" onClick={this.buildState}>build kingdom</button>
          </Aside>

          { kingdom && 
            <KingdomDisplay kingdom={kingdom} state={this.state} stateHandler={this.stateHandler}/>
          }

        </main>
      </div>
    );
  }
}
