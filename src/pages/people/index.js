import React, { Component } from 'react';
import Aside from "components/aside";
import PersonDisplay from 'components/display/person';
import Person from "components/generators/person/person";
import Noble from "components/generators/person/noble";

import Professions from "data/professions";
import Race from "data/races/allRaces";
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
    this.getOccupationBlock = this.getOccupationBlock.bind(this);
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
    // array of job groups that automatically confer noble status.
    const nobleJobGroups = [
      "Greater Nobility",
      "Lesser Nobility",
      "Magic",
      "Educated"
    ];
    let state = this.state;

    for ( let key in state ) {
      if ( state[key] === "all" ) state[key] = undefined;
    }

    const options = {
      race: state.race,
      sex: state.sex,
      alignment: state.alignment,
      cr: state.cr,
      occupation: state.job,
      jobGroup: state.occupationGroup,

      // batch property used to skip generating fluff and speed up builds
      // regular builds are 40x slower due to stat block generation
      batch: false
    };

    if ( nobleJobGroups.includes( e => e.toLowerCase() === options.jobGroup ) ) {
      this.setState({person: new Noble(options)});
    } else {
      this.setState({person: new Person(options)});
    }

    // this.runTest(50000);
  }

  runTest(num) {
    console.log(`Making ${num} people`);
    console.time('people');
    new Array(num).fill(undefined).map( x => new Person({batch: true}));
    console.timeEnd('people');
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
    const person = this.state.person;

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
            <PersonDisplay person={this.state.person} state={this.state} stateHandler={this.stateHandler}/>
          }
        </main>
      </div>
    );
  }
}
