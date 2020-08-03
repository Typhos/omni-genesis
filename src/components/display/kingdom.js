import React, { Component } from 'react';
import Display from "components/display";
import Utils from "components/utils";

export default class KingdomDisplay extends Component {

  constructor(props) {
    super(props);

    this.buildCopyURL = this.buildCopyURL.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  updateDisplay(display) {
    if ( this.props.state.display === display ) {
      this.props.stateHandler({display: null});
    } else {
      this.props.stateHandler({display: display});
    }
  }

  buildCopyURL() {
    const city = this.props.state.kingdom;
    const origin = window.location.origin;
    const path = window.location.pathname;
    const search = "?";

    let searchArray = [
      `run=build`,
      `seed=${this.props.kingdom.seed}`
    ];

    if (this.props.kingdom.inputs.size) searchArray.push(`size=${this.props.kingdom.inputs.size}`);

    return origin+path+search+searchArray.join("&");
  }

  render () {
    const kingdom = this.props.kingdom;

    return (
      <Display>
        <h2 className="name cityName">
          {kingdom.name}
        </h2>
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
          onClick={() => {navigator.clipboard.writeText(this.buildCopyURL())}}>🔗</span>
        
        <span
          role="img" 
          className="emjoiIcon copyData"
          aria-label={`Copy JSON for ${kingdom.name}`} 
          data-balloon-pos="left">📋</span>

        <div className="displayLayout">
          <div className="column">
            <p className="">
              <strong>Area: </strong> 
              <span>{Utils.numberWithCommas(kingdom.area.sqMiles)} sq. miles</span>
            </p>
            <p className="">
              <strong>Arable Land: </strong> 
              <span>{kingdom.area.arable} sq. miles</span>
            </p>
            <p className="">
              <strong>Wilderness: </strong> 
              <span>{kingdom.area.wilderness} sq. miles</span>
            </p>

            <br/>

            <p className="">
              <strong>Population: </strong> 
              <span>{Utils.numberWithCommas(kingdom.population)}</span>
            </p>

            <p className="">
              <strong>Density: </strong> 
              <span>{Utils.numberWithCommas(kingdom.density.int)} persons per sq. mile </span>
              <span>({kingdom.density.string})</span>
            </p>
          </div>
        </div>

      </Display>
    )
  }
}