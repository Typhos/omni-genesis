import React, { Component } from 'react';
import Utils from "components/utils";
import Aside from "components/aside";
import Display from "components/display";

import stateSizes from "data/states/kingdoms";

export default class States extends Component {
  
  constructor(props) {
    super(props);
    Utils.setNewSeed();

    this.state = {
      "age": undefined,
      "area": undefined,
      "density": undefined,
      "population": undefined,
      "type": undefined,
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
    return (
      <div className="App">
        <main className="content">
        <Aside>
            <label>State Size
              <select name="type" onChange={this.change} value={this.state.type}>
                <option value="all">random size</option>
                {this.getOptions(stateSizes.sizes, false)}
              </select>
            </label>

            <label>Seed
              <input type="number" name="seed" onChange={this.change} value={this.state.seed}/>
            </label>

            <button id="generateState" className="buildButton" onClick={this.buildState}>build kingdom</button>
          </Aside>

        </main>
      </div>
    );
  }
}
