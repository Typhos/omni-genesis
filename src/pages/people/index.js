import React, { Component } from 'react';
import Aside from "components/aside";
import Display from "components/display";
import Person from "components/generators/person";

import Race from "data/races";
import Professions from "data/professions";

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
      "occupationGroup": "all",
    };

    this.change = this.change.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.initPerosonGen = this.initPerosonGen.bind(this);

  }

  change (e) {
    this.setState({
      [e.target.className]: e.target.value
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
      occupation: state.job,
      jobGroup: state.occupationGroup
    });

    // MAKE 10,000 items to just test for errors =======================
    // let x = new Array(10000).fill(undefined).map( x => new Person());
    // console.log(x)

    this.setState({newPerson: generatedPerson});
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
            <button id="generatePerson" className="buildButton" onClick={this.initPerosonGen}>build person</button>
          </Aside>

          { person && 
            <Display>
            
              <h2 className="headline name">{person.name}</h2>
              <h3 className="subHead">{person.race} {person.occupation}</h3>
              <ul className="information">
                <li><strong>Sex:</strong> {person.sex}</li>
                <li><strong>Age:</strong> {person.age} ({person.ageGroup})</li>
                <li><strong>Alignment:</strong> {person.alignment}</li>
              </ul>
            </Display>
          }
        </main>
      </div>
    );
  }
}
