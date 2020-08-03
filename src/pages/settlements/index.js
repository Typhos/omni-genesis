import React, { Component } from 'react';
import Utils from "components/utils";

import Aside from "components/aside";
import City from "components/display/city";
import CityGenerator from "components/generators/cities";

import cityObj from "data/cities/cities";
import pantheonsObj from "data/gods/pantheons";

import "styles/cities.scss";

export default class Settlements extends Component {

  constructor(props) {
    super(props);

    Utils.setNewSeed();
    const seed = Math.seed;

    this.state = {
      type: "all",
      size: "all",
      pantheon: "centhris",
      display: null,
      primaryRace: undefined,
      secondaryRace: undefined,
      seed: seed
    };

    this.change = this.change.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.initCityBuild = this.initCityBuild.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
    this.urlBuild = this.urlBuild.bind(this);

    if ( window.location.search.length > 0 && window.location.search.includes('run=build') ) {
      // automatically start a city build based on url provided params
      this.urlBuild( window.location.search );
    }
  }

  urlBuild(params) {
    const buildObj = {};
    params.substring(1).split("&").forEach(p => {
      let arr = p.split("=");
      buildObj[arr[0]] = arr[1];
    });

    console.log(buildObj)
    
    this.state = {
      city: new CityGenerator(buildObj),
      display: null,
      seed: Math.seed,
      pantheon: buildObj.pantheon || "centhris"
    };
    
  }

  change (e) {
    this.setState({
      [e.target.name]: e.target.value
    });
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

  initCityBuild() {
    let state = this.state;

    for ( let key in state ) {
      if ( state[key] === "all" ) state[key] = undefined;
    }

    console.log(state);

    const city = new CityGenerator({
      type: state.type,
      primaryRace: state.primaryRace,
      secondaryRace: state.secondaryRace,
      pantheon: state.pantheon,
      seed: state.seed
    });

    console.log(city)
    // this.runTest(500);

    Utils.setNewSeed();
    this.setState({
      city: city,
      display: null,
      seed: Math.seed
    });
  }

  runTest(num) {
    console.log(`Making ${num} cities`);
    console.time('cities');
    new Array(num).fill(undefined).map( x => {
      Utils.setNewSeed();
      new CityGenerator({
        seed: Math.seed,
        type: undefined
      })
    });
    console.timeEnd('cities');
  }

  stateHandler(obj){
    this.setState(obj);
  }
  
  render() {
    const city = this.state.city;

    return (
      <div className="App">
        <main className="content">

           <Aside>
            <label>City Size
              <select name="type" onChange={this.change} value={this.state.type}>
                <option value="all">random size</option>
                {this.getOptions(cityObj.sizes, false)}
              </select>
            </label>
            <label>Pantheon
              <select name="pantheon" onChange={this.change} value={this.state.pantheon}>
                {this.getOptions(pantheonsObj, true)}
              </select>
            </label>

            <label>Seed
              <input type="number" name="seed" onChange={this.change} value={this.state.seed}/>
            </label>

            <button id="generateCity" className="buildButton" onClick={this.initCityBuild}>build settlement</button>
          </Aside>

          { city && 
            <City city={city} state={this.state} stateHandler={this.stateHandler}/>
          }
        </main>
      </div>
    );
  }
}
