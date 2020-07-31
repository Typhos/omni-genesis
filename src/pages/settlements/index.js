import React, { Component } from 'react';
import Utils from "components/utils";

import Aside from "components/aside";
import Display from "components/display";
import StatBlock from "components/display/statBlock";
import Accordion from "components/display/accordion";
import CityGenerator from "components/generators/cities";

import raceObj from "data/races/allRaces";
import cityObj from "data/cities/cities";

import "styles/cities.scss";

export default class Settlements extends Component {

  constructor(props) {
    super(props);

    this.state = {
      type: "all",
      size: "all",
      primaryRace: undefined,
      secondaryRace: undefined
    };

    this.change = this.change.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.initCityBuild = this.initCityBuild.bind(this);
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
      secondaryRace: state.secondaryRace
    });

    console.log(city)
    // this.runTest(500);

    this.setState({city: city});
  }

  runTest(num) {
    console.log(`Making ${num} cities`);
    console.time('cities');
    let x = new Array(num).fill(undefined).map( x => new CityGenerator());
    console.timeEnd('cities');
  }

  render() {
    const city = this.state.city;

    const merchantOutput = function() {
      let arr = [];
      let names = [];

      for ( let [key, val] of Object.entries(city.economy.merchants.tradesArray) ) {
        {/*;*/}
        names.push(key);
      }

      names.sort();

      names.forEach( name => {
        const val = city.economy.merchants.tradesArray[name];
        arr.push(<li name={name} key={name} className={`merchant ${ val === 0 ? "zero" : "" }`}><strong>{name}:</strong> <span>{val}</span></li>)
      });

      return arr;
    }

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
{/*
            <label>Seed
              <input type="number" name="seed" onChange={this.change} value={this.state.seed}/>
            </label>
*/}
            <button id="generateCity" className="buildButton" onClick={this.initCityBuild}>build settlement</button>
          </Aside>

          { city && 
            <Display>
              <h2 className="name cityName">
                {city.name}
                <span 
                  role="img" 
                  className="emjoiIcon" 
                  data-balloon-pos="up" 
                  aria-label={`seed: ${city.seed}`} 
                  onClick={() => {navigator.clipboard.writeText(city.seed)}}>🌱</span>
                </h2>

              <div className="settlementLayout">
                <div className="column">
                  <p className="cityType"><strong>Size:</strong> <span>{city.type}</span></p>
                  <p className="cityType"><strong>Pop:</strong> <span>{this.numberWithCommas(city.population.total)}</span></p>
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
                    <span>{this.numberWithCommas(city.government.type)}</span>
                  </p>
                  <p className="cityType">
                    <strong>Noble Houses: </strong>
                    <span>{city.population.nobleHouses.number}</span>

                    { city.population.nobleHouses.names.length <= 10 && city.population.nobleHouses.names.length > 0 &&
                      <span 
                      role="img" 
                      className="emjoiIcon"
                      aria-label={city.population.nobleHouses.names.join(", ") } 
                      data-balloon-length="large" 
                      data-balloon-pos="right" 
                      onClick={() => {navigator.clipboard.writeText( city.population.nobleHouses.names.join(", ") )}} >🏷️</span>
                    }

                    { city.population.nobleHouses.names.length > 10 &&
                      <span 
                      role="img" 
                      className="emjoiIcon"
                      aria-label={"Imporant Houses: " + city.population.nobleHouses.names.filter((x,i) => i < 10).join(", ") } 
                      data-balloon-length="large" 
                      data-balloon-pos="right" 
                      onClick={() => {navigator.clipboard.writeText( city.population.nobleHouses.names.filter((x,i) => i < 10).join(", ") )}} >🏷️</span>
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
                  <p className="cityType"><strong>Crime:</strong> <span>{city.economy.crime}</span></p>
                  <br/>
                  <p className="cityType">
                    <strong>Temples: </strong> 
                    <span>{city.religion.temples.count}</span>
                    <span 
                      role="img" 
                      className="emjoiIcon"
                      aria-label={city.religion.temples.breakdown } 
                      data-balloon-length="large" 
                      data-balloon-pos="right">🏛️</span>
                  </p>
                  <p className="cityType">
                    <strong>Shrines: </strong> 
                    <span>{this.numberWithCommas(city.religion.shrines.count)}</span>
                    <span 
                      role="img" 
                      className="emjoiIcon"
                      aria-label={city.religion.shrines.breakdown } 
                      data-balloon-length="large" 
                      data-balloon-pos="right">🏺</span>
                  </p>
                  <br/>
                  <p className="cityType"><strong>Architecture:</strong> <span>{city.houses}</span></p>
                </div>
              </div>
              { city.economy.merchants &&
                <React.Fragment>
                  <h4>Trades</h4>
                  <ul className="standardUl threeColumn">
                    {
                      merchantOutput()
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
