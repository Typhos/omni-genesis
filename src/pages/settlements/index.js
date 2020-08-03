import React, { Component } from 'react';
import Utils from "components/utils";

import Aside from "components/aside";
import Display from "components/display";
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
    this.urlBuild = this.urlBuild.bind(this);

    if ( window.location.search.length > 0 && window.location.search.includes('run=build') ) {
      // automatically start a city build based on url provided params
      this.urlBuild( window.location.search );
    }
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
  
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  initCityBuild() {
    let state = this.state;

    for ( let key in state ) {
      if ( state[key] === "all" ) {
        state[key] = undefined;
      }
    }

    if (state.primaryRace === undefined) state.secondaryRace = undefined;

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

  urlBuild(params) {
    const buildObj = {};
    const paramsArray = params.substring(1).split("&").forEach(p => {
      let arr = p.split("=");
      buildObj[arr[0]] = arr[1];
    });
    
    this.state = {
      city: new CityGenerator(buildObj),
      display: null,
      seed: Math.seed
    };
    
  }

  updateDisplay(display) {
    if ( this.state.display === display ) {
      this.setState({display: null});
    } else {
      this.setState({display: display});
    }
  }

  buildCopyURL() {
    const city = this.state.city;
    const origin = window.location.origin;
    const path = window.location.pathname;
    const search = "?";

    let searchArray = [
      `run=build`,
      `type=${city.type}`,
      `pantheon=${city.religion.pantheon}`,
      `seed=${city.seed}`
    ];

    return origin+path+search+searchArray.join("&");
  }

  numicalObjectDisplay(obj) {
    const names = [];

    // if we want sorted names, we need an array.
    for ( let [key, val] of Object.entries(obj) ) {
      names.push(key);
    }

    return names.sort().map( name => {
      const val = obj[name];
      return <li name={name} key={name} className={`infoTable numeric ${ val === 0 ? "zero" : "" }`}><strong>{name}:</strong> <span>{this.numberWithCommas(val)}</span></li>;
    });
  }

  nobleArrayDisplay(arr) {   
    return arr.sort().map( (obj,i) => {
      return <li name={obj.name.displayName} key={obj.name.displayName+i} className={`infoTable names`}>
        <span className="capitalize">{obj.occupation} </span>
        <strong>{obj.name.displayName}</strong>
      </li>;
    });
  }

  getShopsDisplay(obj) {
    let resp = [];
    let ind = 0;

    for ( let [key, val] of Object.entries(obj) ) {
      ind++;

      resp.push(
        <React.Fragment key={key+ind}>
          <h3 className="shopGroupHeading" key={key}>{key}</h3>
          <ul className="standardUl shops threeColumn" key={key+"ul"}>
            {
              val.map( (e,i) => {
                return <li key={e.name+i} className="infoTable names" seed={e.seed}>
                  <p className="heading">{e.name.toLowerCase()}</p>
                  <p className="subInfo">Owner: {e.owner.name.displayName}</p>
                </li>
              })
            }
          </ul>
        </React.Fragment>
      );
    }

    return resp;
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
            {/*
                        <label>Primary Race
                          <select name="primaryRace" onChange={this.change} value={this.state.primaryRace}>
                            <option value="all">random race</option>
                            {this.getOptions(raceObj, true, this.state.secondaryRace)}
                          </select>
                        </label>

                        { this.state.primaryRace && 
                          <label>Secondary Race
                            <select name="secondaryRace" onChange={this.change} value={this.state.secondaryRace}>
                              <option value="all">random race</option>
                              {this.getOptions(raceObj, true, this.state.primaryRace)}
                            </select>
                          </label>
                        }
            */}
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
            <Display>

              <h2 contentEditable className="name cityName">
                {city.name}
                
              </h2>
              <span 
                role="img" 
                className="emjoiIcon seed" 
                data-balloon-pos="up" 
                aria-label={`seed: ${city.seed}`} 
                onClick={() => {navigator.clipboard.writeText(city.seed)}}>🌱</span>

              <span
                role="img" 
                className="emjoiIcon save"
                aria-label={`Copy URL to ${city.name}`} 
                data-balloon-pos="left"
                onClick={() => {navigator.clipboard.writeText(this.buildCopyURL())}}>🔗</span>
              
              <span
                role="img" 
                className="emjoiIcon copyData"
                aria-label={`Copy JSON for ${city.name}`} 
                data-balloon-pos="left">📋</span>

              <div className="settlementLayout">
                <div className="column">
                  <p className="cityType">
                    <strong>Size: </strong> 
                    <span>{city.type}</span>
                  </p>
                  <p className="cityType">
                    <strong>Pop: </strong> 
                    <span>{this.numberWithCommas(city.population.total)}</span>
                    { this.state.display !== "population" &&
                      <span
                        role="img" 
                        className="emjoiIcon"
                        aria-label={"Display Population"} 
                        data-balloon-pos="right"
                        onClick={() => {this.updateDisplay("population")}} >🧝‍♂️</span>
                    }
                    { this.state.display === "population" &&
                      <span 
                        role="img" 
                        className="emjoiIcon close"
                        aria-label={"Close Population"} 
                        data-balloon-pos="right"
                        onClick={() => {this.updateDisplay(null)}} >❌</span>                      
                    }
                  </p>
                  <p className="cityType">
                    <strong>Prof. Guards: </strong>
                    <span>{city.guards.count}</span>
                  </p>
                  { city.population.total <= 4000 &&
                    <p className="cityType">
                      <strong>Militia Levy: </strong>
                      <span>{city.guards.militiaLevy}</span>
                    </p>
                  }
                  <br/>
                  <p className="cityType">
                    <strong>Government: </strong>
                    <span>{city.government.details.name}</span>
                    <span 
                    role="img" 
                    className="emjoiIcon text"
                    aria-label={city.government.details.description}
                    data-balloon-length="large"
                    data-balloon-pos="right" >❓</span>
                  </p>
                  <p className="cityType">
                    <strong>Leader: </strong>
                    <span>{city.government.leader.occupation} </span>
                    <span>{city.government.leader.name.displayName}</span>
                  </p>
                  <p className="cityType">
                    <strong>Important People: </strong>
                    <span>{city.population.importantPeople.number}</span>
                      { city.population.importantPeople.noblePeopleArray.length > 0 &&
                        <React.Fragment>
                          { this.state.display !== "nobles" &&
                            <span 
                            role="img" 
                            className="emjoiIcon"
                            aria-label={"Display Noble Houses"}
                            data-balloon-pos="right"
                            onClick={() => {this.updateDisplay("nobles")}} >🏷️</span>
                          }
                          { this.state.display === "nobles" &&
                            <span 
                              role="img" 
                              className="emjoiIcon close"
                              aria-label={"Close Noble Houses"} 
                              data-balloon-pos="right"
                              onClick={() => {this.updateDisplay(null)}} >❌</span>
                          }
                        </React.Fragment>
                      }
                  </p>
                  <p className="cityType">
                    <strong>Corruption: </strong>
                    <span>{city.government.corruption}</span>
                  </p>
                </div>
                <div className="column">
                  <p className="cityType"><strong>Economy:</strong> <span>{city.economy.description}</span></p>
                  <p className="cityType"><strong>Economic Focus:</strong> <span>{city.economy.primary}</span></p>
                  <p className="cityType">
                    <strong>Tradesfolk: </strong> 
                    <span>{this.numberWithCommas(city.economy.merchants.tradesTotal)}</span>
                    <span> ({(city.economy.merchants.tradesTotal/city.population.total*100).toFixed(1)}%)</span>
                    { city.economy.merchants.tradesTotal > 0 &&
                      <React.Fragment>
                        { this.state.display !== "tradesfolk" &&
                          <span 
                            role="img" 
                            className="emjoiIcon"
                            aria-label={"Display Tradesfolk"} 
                            data-balloon-pos="right"
                            onClick={() => {this.updateDisplay("tradesfolk")}} >⚒️</span>
                        }
                        { this.state.display === "tradesfolk" &&
                          <span 
                            role="img" 
                            className="emjoiIcon close"
                            aria-label={"Close Tradesfolk"} 
                            data-balloon-pos="right"
                            onClick={() => {this.updateDisplay(null)}} >❌</span>
                        }
                      </React.Fragment>
                    }
                  </p>
                  <p className="cityType">
                    <strong>Shops: </strong> 
                    <span>{this.numberWithCommas(city.economy.merchants.shopsTotal)}</span>
                    { city.economy.merchants.shopsTotal > 0 &&
                      <React.Fragment>
                        { this.state.display !== "shops" &&
                          <span 
                            role="img" 
                            className="emjoiIcon"
                            aria-label={"Display Shops"} 
                            data-balloon-pos="right"
                            onClick={() => {this.updateDisplay("shops")}} >🏬</span>
                        }
                        { this.state.display === "shops" &&
                          <span 
                            role="img" 
                            className="emjoiIcon close"
                            aria-label={"Close Tradesfolk"} 
                            data-balloon-pos="right"
                            onClick={() => {this.updateDisplay(null)}} >❌</span>
                        }
                      </React.Fragment>
                    }
                  </p>
                  <p className="cityType"><strong>Crime:</strong> <span>{city.economy.crime}</span></p>
                  <br/>
                  <p className="cityType">
                    <strong>Temples: </strong> 
                    <span>{city.religion.temples.count}</span>
                    { city.religion.temples.count > 0 &&
                      <React.Fragment>
                        { this.state.display !== "temples" &&
                          <span 
                            role="img" 
                            className="emjoiIcon"
                            aria-label={"Display Temples"} 
                            data-balloon-pos="right"
                            onClick={() => {this.updateDisplay("temples")}} >🏛️</span>
                        }
                        { this.state.display === "temples" &&
                          <span 
                            role="img" 
                            className="emjoiIcon close"
                            aria-label={"Close Temples"} 
                            data-balloon-pos="right"
                            onClick={() => {this.updateDisplay(null)}} >❌</span>
                        }
                      </React.Fragment>
                    }
                  </p>
                  <p className="cityType">
                    <strong>Shrines: </strong> 
                    <span>{this.numberWithCommas(city.religion.shrines.count)}</span>
                    { city.religion.shrines.count > 0 &&
                      <React.Fragment>
                        { this.state.display !== "shrines" &&
                          <span 
                            role="img" 
                            className="emjoiIcon"
                            aria-label={"Display Shrines"} 
                            data-balloon-pos="right"
                            onClick={() => {this.updateDisplay("shrines")}} >🏺</span>
                        }
                        { this.state.display === "shrines" &&
                          <span 
                            role="img" 
                            className="emjoiIcon close"
                            aria-label={"Close Shrines"} 
                            data-balloon-pos="right"
                            onClick={() => {this.updateDisplay(null)}} >❌</span>
                        }
                      </React.Fragment>
                    }
                  </p>
                  <br/>
                  <p className="cityType"><strong>Architecture:</strong> <span>{city.houses}</span></p>
                </div>
              </div>
              { this.state.display === null &&
                <p className="explanation">Click an icon (<span className="icon" role="img" aria-label="tradesfolk icon">⚒️</span>) to show relevant information.</p>
              }

              { this.state.display === "population" &&
                <React.Fragment>
                  <h4>Population by Race</h4>
                  <ul className="standardUl threeColumn">
                    {
                      this.numicalObjectDisplay(city.population.races)
                    }
                  </ul>
                </React.Fragment>
              }

              { city.economy.merchants.shopsTotal > 0 && this.state.display === "shops" &&
                <React.Fragment>
                  <h4>Merchants & Shops</h4>
                  {
                    this.getShopsDisplay(city.economy.merchants.shops)
                  }
                </React.Fragment>
              }

              { city.economy.merchants.tradesTotal > 0 && this.state.display === "tradesfolk" &&
                <React.Fragment>
                  <h4>Trades</h4>
                  <ul className="standardUl threeColumn">
                    {
                      this.numicalObjectDisplay(city.economy.merchants.tradesArray)
                    }
                  </ul>
                </React.Fragment>
              }

              { city.religion.temples.count > 0 && this.state.display === "temples" &&
                <React.Fragment>
                  <h4>Temples</h4>
                  <ul className="standardUl threeColumn">
                    {
                      this.numicalObjectDisplay(city.religion.temples.breakdown)
                    }
                  </ul>
                </React.Fragment>
              }

              { city.religion.shrines.count > 0 && this.state.display === "shrines" &&
                <React.Fragment>
                  <h4>Shrines</h4>
                  <ul className="standardUl threeColumn">
                    {
                      this.numicalObjectDisplay(city.religion.shrines.breakdown)
                    }
                  </ul>
                </React.Fragment>
              }

              { city.population.importantPeople.noblePeopleArray.length > 0 && this.state.display === "nobles" &&
                <React.Fragment>
                  { !city.population.importantPeople.limited &&
                    <h4>Important People in {city.name}</h4>
                  }
                  { city.population.importantPeople.limited &&
                    <h4>Most Influential People in {city.name}</h4>
                  }
                  <ul className="standardUl twoColumn">
                    {
                      this.nobleArrayDisplay(city.population.importantPeople.noblePeopleArray)
                    }
                  </ul>
                </React.Fragment>
              }
            </Display>
          }
        </main>
      </div>
    );
  }
}
