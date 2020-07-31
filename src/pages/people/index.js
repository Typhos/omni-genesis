import React, { Component } from 'react';
import Aside from "components/aside";
import Display from "components/display";
import StatBlock from "components/display/statBlock";
import Accordion from "components/display/accordion";
import Person from "components/generators/person/person";

import Race from "data/races/allRaces";
import Professions from "data/professions";
import crData from "data/mechanics/monsterCR";

const allAlignments = ["lawful good","neutral good","chaotic good","lawful neutral","true neutral","chaotic neutral","lawful evil","neutral evil","chaotic evil"];

const alignments = {
  "any good": ["lawful good","neutral good","chaotic good"],
  "any evil": ["lawful evil","neutral evil","chaotic evil"],
  "any lawful": ["lawful good","lawful neutral","lawful evil"],
  "any chaotic": ["chaotic good","chaotic neutral","chaotic evil"],
  "any neutral": ["neutral good","neutral evil","lawful neutral","true neutral","chaotic neutral"]
};

export default class People extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "race": "all",
      "sex": "all",
      "alignment": "all",
      "cr": "all",
      "occupationGroup": "all",
      "imperial": true
    };

    this.change = this.change.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.initPerosonGen = this.initPerosonGen.bind(this);
  }

  change (e) {
    const key = e.target.className;
    const value = e.target.value;
    this.setState({
      [key]: value
    });
  }

  getOptions(obj) {
    let keys = Object.keys(obj);

    keys = keys.sort();

    return keys.map( key => {
      return <option key={key} value={key}>{key}</option>
    });
  }

  initPerosonGen() {
    let state = this.state;

    for ( let key in state ) {
      if ( state[key] === "all" ) {
        state[key] = undefined;
      }
    }

    const generatedPerson = new Person({
      race: state.race,
      sex: state.sex,
      alignment: state.alignment,
      cr: state.cr,
      occupation: state.job,
      jobGroup: state.occupationGroup,

      // batch property used to skip generating fluff and speed up builds
      // regular builds are 40x slower due to stat block generation
      batch: false
    });

    // this.runTest(50000);

    console.log(generatedPerson)
    this.setState({newPerson: generatedPerson});
  }

  runTest(num) {
    console.log(`Making ${num} people`);
    console.time('people');
    new Array(num).fill(undefined).map( x => new Person({batch: true}));
    console.timeEnd('people');
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

  getOccupationBlock(){
    return (
      <React.Fragment>
        <label>Occupation Type
          <select className="occupationGroup" onChange={this.change} value={this.state.occupationGroup}>
            <option value="all">random occupation</option>
            {this.getOptions(Professions.jobs)}
          </select>
        </label>

        { this.state.occupationGroup !== undefined && 
          this.state.occupationGroup !== "all" && 
          Array.isArray(Professions.jobs[this.state.occupationGroup].list) &&
          <label>Job
            <select className="job" onChange={this.change} value={this.state.job}>
              <option value="all">random job</option>
              {
                Professions.jobs[this.state.occupationGroup].list.map( job => <option key={job} value={job}>{job.replace("*","person")}</option>)
              }
            </select>
          </label>
        }

        { this.state.occupationGroup !== undefined && 
          this.state.occupationGroup !== "all" && 
          this.state.occupationGroup !== "adventurer" &&
          !Array.isArray(Professions.jobs[this.state.occupationGroup].list) &&
          this.state.sex === "all" &&
          <p>please select a sex to choose a specific {this.state.occupationGroup} job.</p>
        }

        { this.state.occupationGroup !== undefined && 
          this.state.occupationGroup !== "all" && 
          this.state.occupationGroup !== "adventurer" &&
          !Array.isArray(Professions.jobs[this.state.occupationGroup].list) &&
          this.state.sex === "male" &&
          <label>Job
            <select className="job" onChange={this.change} value={this.state.job}>
              <option value="all">random job</option>
              {
                Professions.jobs[this.state.occupationGroup].list.male.map( job => <option key={job} value={job}>{job.replace("*","person")}</option>)
              }
            </select>
          </label>
        }

        { this.state.occupationGroup !== undefined && 
          this.state.occupationGroup !== "all" && 
          this.state.occupationGroup !== "adventurer" &&
          !Array.isArray(Professions.jobs[this.state.occupationGroup].list) &&
          this.state.sex === "female" &&
          <label>Job
            <select className="job" onChange={this.change} value={this.state.job}>
              <option value="all">random job</option>
              {
                Professions.jobs[this.state.occupationGroup].list.female.map( job => <option key={job} value={job}>{job.replace("*","person")}</option>)
              }
            </select>
          </label>
        }

        { this.state.occupationGroup !== undefined && 
          this.state.occupationGroup === "adventurer" &&
          <label>Class
            <select className="job" onChange={this.change} value={this.state.job}>
              <option value="all">random class</option>
              {
                Object.keys(Professions.jobs[this.state.occupationGroup]).map( job => <option key={job} value={job}>{job}</option>)
              }
            </select>
          </label>
        }
      </React.Fragment>
    )
  }

  render() {
    const person = this.state.newPerson;

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <label>Race
              <select className="race" onChange={this.change} value={this.state.race}>
                <option value="all">random race</option>
                {this.getOptions(Race)}
              </select>
            </label>

            <label>Sex
              <select className="sex" onChange={this.change} value={this.state.sex}>
                <option value="all">random sex</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </label>

            <label>Alignment
              <select className="alignment" onChange={this.change} value={this.state.alignment}>
                <option value="all">random alignment</option>
                <option disabled>-------</option>
                {this.getOptions(alignments)}
                <option disabled>-------</option>
                {
                  allAlignments.map( al => <option key={al} value={al}>{al}</option>)
                }
              </select>
            </label>

            {
              this.getOccupationBlock()
            }

            <label>Challenge
              <select className="cr" onChange={this.change} value={this.state.cr}>
                <option value="all">random cr</option>
                {
                  crData.cr.map( cr => <option key={cr._cr} value={cr._cr}>{cr._cr}</option>)
                }
              </select>
            </label>
            
            <button 
              id="generatePerson" 
              className="buildButton" 
              onClick={this.initPerosonGen}>build person</button>
          </Aside>

          { person && 
            <Display>
            
              <h2 className="headline name">{person.name.name} {person.name.surname}</h2>
              <h3 className="subHead">{this.raceString(person)} {person.occupation}</h3>
              <ul className="information">
                <li><strong>Sex:</strong><span className="result">{person.sex}</span></li>
                <li><strong>Alignment:</strong> <span className="result">{person.alignment}</span></li>
                <li><strong>Age:</strong><span className="result">{person.age} ({person.ageGroup})</span></li>                
              </ul>

              { person.physical && 
                <ul className="information">
                  { this.state.imperial &&
                    <React.Fragment>
                      <li><strong>Height:</strong><span className="result">{Math.floor(person.physical.imperial.height / 12)} ft { person.physical.imperial.height % 12 } in</span></li>
                      <li><strong>Weight:</strong><span className="result">{person.physical.imperial.weight} lbs.</span></li>
                    </React.Fragment>
                  }
                  { !this.state.imperial &&
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
          }
        </main>
      </div>
    );
  }
}
