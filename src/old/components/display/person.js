import React, { Component } from 'react';
import Display from "components/display/display";
import StatBlock from "components/display/statBlock/statBlock";
import Utils from "components/utils";

import "styles/person.scss";

export default class PersonDisplay extends Component {

  constructor(props) {
    super(props);

    this.updateDisplay = this.updateDisplay.bind(this);
    this.raceString = this.raceString.bind(this);
    this.backOneEntry = this.backOneEntry.bind(this);
  }

  updateDisplay(display) {
    if ( this.props.state.display === display ) {
      this.props.stateHandler({display: null});
    } else {
      this.props.stateHandler({display: display});
    }
  }

  raceString (person) {
    if ( person.subRace && person.subRace.name && person.subRace.name !== "Variant" ) {
      if ( person.subRace.alias ) {
        return `${person.subRace.alias[0].toLowerCase()} ${person.race}`;
      }

      return `${person.subRace.name.toLowerCase()} ${person.race}`;
    }
     
    return person.race;
  }

  backOneEntry () {
    const priorEntry = this.props.state.previousEntries[ this.props.state.previousEntries.length - 1 ];
    this.props.state.previousEntries.pop();

    this.props.stateHandler({
      [priorEntry.type]: priorEntry,
      "person": null,
      "display": "nobles"
    });
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
    const person = this.props.person;
    console.log(person);

    return (
      <Display>
        { this.props.state && this.props.state.previousEntries && this.props.state.previousEntries.length > 0 &&
          <React.Fragment>
            <button
              className="backButton"
              onClick={ () => { this.backOneEntry() } }
              >&laquo; Back to { this.props.state.previousEntries[ this.props.state.previousEntries.length - 1 ].name }</button>
              <br/>
          </React.Fragment>
        }
        <h2 className="headline name">{person.name.displayName}</h2>
        <h3 className="subHead">{this.raceString(person)} {person.occupation}</h3>
        <ul className="information">
          <li><strong>Sex:</strong><span className="result">{person.sex}</span></li>
          <li><strong>Alignment:</strong> <span className="result">{person.alignment}</span></li>
          <li><strong>Age:</strong><span className="result">{person.age} ({person.ageGroup})</span></li>                
        </ul>

        { person.physical && 
          <ul className="information">
            { this.props.state.imperial &&
              <React.Fragment>
                <li><strong>Height:</strong><span className="result">{Math.floor(person.physical.imperial.height / 12)} ft { person.physical.imperial.height % 12 } in</span></li>
                <li><strong>Weight:</strong><span className="result">{person.physical.imperial.weight} lbs.</span></li>
              </React.Fragment>
            }
            { !this.props.state.imperial &&
              <React.Fragment>
                <li><strong>Height:</strong><span className="result">{person.physical.metric.height} cm</span></li>
                <li><strong>Weight:</strong><span className="result">{person.physical.metric.weight} kg</span></li>
              </React.Fragment>
            }
          </ul>
        }

        { person.description &&
          <div className="description">
            <p><strong>Likes: </strong><span className="capitalize">{person.description.likes}</span></p>
            <p><strong>Dislikes: </strong><span className="capitalize">{person.description.dislikes}</span></p>
            <p><strong>Random Fact: </strong><span >{person.description.statsDescription[0]}</span></p>
            <p><strong>Personality Quirk: </strong><span >{person.description.quirk}</span></p>
          </div>
        }
        { person.stats && 
          <React.Fragment>
            <StatBlock person={person} />
          </React.Fragment>
        }
      </Display>
    )
  }
}