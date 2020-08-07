import React, { Component } from 'react';
import Display from "components/display";
import Utils from "components/utils";
import City from 'components/generators/cities';

export default class KingdomDisplay extends Component {

  constructor(props) {
    super(props);

    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  updateName (e) {
    let kingdom = this.props.kingdom;
    kingdom.name = e.target.value;
    this.props.stateHandler({
      "kingdom": kingdom,
      "name": e.target.value
    });
  }

  updateDisplay(display) {
    if ( this.props.state.display === display ) {
      this.props.stateHandler({display: null});
    } else {
      this.props.stateHandler({display: display});
    }
  }

  sendToCityEntry(kingdom, entryName, type) {
    let targetCity = kingdom.settlements[type][type].find( s => s.name === entryName );

    const newCity = new City({
      ...targetCity.inputParams,
      "seed": targetCity.seed,
      "lightWeight": false
    });

    let previousEntries = this.props.state.previousEntries || [];
    previousEntries.push(kingdom);

    let newState = { ...this.props.state };
    newState.display = null;
    newState.kingdom = null;
    newState.city = newCity;
    newState.previousEntries = previousEntries;

    this.props.stateHandler(newState);
  }

  displayPopulationInformation(fullObj, array, type) {
    const list = [];

    for ( let i = 0; i < array.length; i++ ) {
      let capital = type === "cities" && i === 0 ? "capital" : "";

      list.push(
        <li 
          name={array[i].name} key={array[i].name + i} 
          className={`infoTableRow numeric pointer`}
          onClick={ () => {this.sendToCityEntry(fullObj, array[i].name, type)} } >
          
          <strong>
            { capital !== "" &&
              <span
                role="img" 
                className="emjoiIcon text capital"
                aria-label="capital city"
                data-balloon-pos="up" >👑</span>
            } {array[i].name}: </strong>
          <span>{Utils.numberWithCommas(array[i].population.total)}</span>
        </li>
      );
    }

    return list;
  }

  render () {
    const kingdom = this.props.kingdom;

    return (
      <Display>
          <input type="text" 
            className="name heading"
            size={kingdom.name.length + kingdom.name.length / 3}
            onChange={this.updateName}
            value={kingdom.name} />
          
        
          <div className="iconContainer">
            <span 
              role="img" 
              className="emjoiIcon seed" 
              data-balloon-pos="up" 
              aria-label={`seed: ${kingdom.seed}`} 
              onClick={() => {navigator.clipboard.writeText(kingdom.seed)}}>🌱</span>

            <span
              role="img" 
              className="emjoiIcon save"
              aria-label={`Copy URL to ${kingdom.name}`} 
              data-balloon-pos="left"
              onClick={() => {navigator.clipboard.writeText( Utils.buildShareURL(kingdom) )}}>🔗</span>
            
            <span
              role="img" 
              className="emjoiIcon copyData"
              aria-label={`Copy JSON for ${kingdom.name}`} 
              data-balloon-pos="left">📋</span>
          </div>

          <div className="displayLayout">
            <div className="column">
              <p className="">
                <strong>Area: </strong> 
                <span>{Utils.numberWithCommas(kingdom.area.sqMiles)} sq. miles</span>
                {kingdom.area.description &&
                  <span 
                    role="img" 
                    className="emjoiIcon text"
                    aria-label={kingdom.area.description}
                    data-balloon-pos="up" >❓</span>
                }
              </p>
              <p className="">
                <strong>Arable Land: </strong> 
                <span>{kingdom.area.arablePercent}% ({ Utils.numberWithCommas(kingdom.area.arable) } sq. miles)</span>
              </p>
              <p className="">
                <strong>Wilderness: </strong> 
                <span>{kingdom.area.wildernessPercent}% ({ Utils.numberWithCommas(kingdom.area.wilderness) } sq. miles)</span>
              </p>

              <br/>

              <p className="">
                <strong>Population: </strong> 
                <span>{Utils.numberWithCommas(kingdom.population.total)}</span>
              </p>

              <p className="">
                <strong>Density: </strong> 
                <span>{Utils.numberWithCommas(kingdom.density.int)} persons per sq. mile </span>
                <span>({kingdom.density.string})</span>
              </p>
            </div>
            <div className="column">
              <p className="">
                <strong>Cities: </strong> 
                <span>{Utils.numberWithCommas(kingdom.settlements.cities.count)}</span>
                { kingdom.settlements.cities.count > 0 &&
                  <React.Fragment>
                    { this.props.state.display !== "cities" &&
                      <span
                        role="img" 
                        className="emjoiIcon text"
                        data-balloon-pos="right"
                        aria-label="Display Cities"
                        onClick={() => {this.updateDisplay("cities")}} >🏙️</span>
                    }
                    { this.props.state.display === "cities" &&
                      <span 
                        role="img" 
                        className="emjoiIcon close"
                        aria-label={"Close Cities"} 
                        data-balloon-pos="right"
                        onClick={() => {this.updateDisplay(null)}} >❌</span>
                    }
                  </React.Fragment>
                }
              </p>

              <p className="">
                <strong>Towns: </strong> 
                <span>{Utils.numberWithCommas(kingdom.settlements.towns.count)}</span>
                { kingdom.settlements.towns.count > 0 &&
                  <React.Fragment>
                    { this.props.state.display !== "towns" &&
                      <span
                        role="img" 
                        className="emjoiIcon text"
                        data-balloon-pos="right"
                        aria-label="Display Towns"
                        onClick={() => {this.updateDisplay("towns")}} >🏘️</span>
                    }
                    { this.props.state.display === "towns" &&
                      <span 
                        role="img" 
                        className="emjoiIcon close"
                        aria-label={"Close Towns"} 
                        data-balloon-pos="right"
                        onClick={() => {this.updateDisplay(null)}} >❌</span>
                    }
                  </React.Fragment>
                }
              </p>

              <p className="">
                <strong>Urban Population: </strong> 
                <span>{Utils.numberWithCommas(kingdom.settlements.urbanPopulation.total)} ({kingdom.settlements.urbanPopulation.percentage}%)</span>
              </p>

              <br/>

              <p className="capitalize">
                <strong>Culture: </strong> 
                <span>{kingdom.culture}</span>
              </p>
            </div>
          </div>
          
          { this.props.state.display === null &&
            <p className="explanation">Click an icon (<span className="icon" role="img" aria-label="cities icon">🏙️</span>) to show relevant information.</p>
          }

          { kingdom.settlements.cities.count > 0 && this.props.state.display === "cities" &&
            <React.Fragment>
              <h4>Cities of {kingdom.name}</h4>
              <ul className={`standardUl ${ kingdom.settlements.cities.cities.length >= 2 ? "twoColumn" : "singleItemColum" }`}>
                {
                  this.displayPopulationInformation(kingdom, kingdom.settlements.cities.cities, "cities")
                }
              </ul>
              <small>Clicking an entry will take you to the full details for that city.</small>
            </React.Fragment>
          }
          
          { kingdom.settlements.towns.count > 0 && this.props.state.display === "towns" &&
            <React.Fragment>
              { kingdom.settlements.towns.count > 21 &&
                <h4>Most Prominent Towns of {kingdom.name}</h4>
              }
              { kingdom.settlements.towns.count <= 21 &&
                <h4>Towns of {kingdom.name}</h4>  
              }
              <ul className="standardUl threeColumn">
                {
                  this.displayPopulationInformation(kingdom, kingdom.settlements.towns.towns, "towns")
                }
              </ul>
              <small>Clicking an entry will take you to the full details for that town.</small>
            </React.Fragment>
          }
      </Display>
    )
  }
}