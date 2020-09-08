import React, { Component } from "react";
import Aside from "../../components/aside";
import PersonDisplay from "../../components/display/person/person";
import Button from "../../components/controls/button/buttonStandard";
import Select from "../../components/controls/select/selectStandard";

// Generators
import Person from "../../generators/person/person";

// Data
import Professions from "../../data/professions";
import Race from "../../data/races/allRaces";
import crData from "../../data/mechanics/monsterCR";

const allAlignments = [
  "lawful good",
  "neutral good",
  "chaotic good",
  "lawful neutral",
  "true neutral",
  "chaotic neutral",
  "lawful evil",
  "neutral evil",
  "chaotic evil",
];

const alignments = {
  "any good": ["lawful good", "neutral good", "chaotic good"],
  "any evil": ["lawful evil", "neutral evil", "chaotic evil"],
  "any lawful": ["lawful good", "lawful neutral", "lawful evil"],
  "any chaotic": ["chaotic good", "chaotic neutral", "chaotic evil"],
  "any neutral": [
    "neutral good",
    "neutral evil",
    "lawful neutral",
    "true neutral",
    "chaotic neutral",
  ],
};

export default class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      race: "all",
      sex: "all",
      alignment: "all",
      cr: "all",
      jobGroup: "all",
      imperial: true,
    };

    this.change = this.change.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.initPersonGen = this.initPersonGen.bind(this);
    this.getOccupationBlock = this.getOccupationBlock.bind(this);
  }

  change(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  componentDidUpdate() {
    // console.log(this.state)
  }

  getOptions(obj) {
    let keys = Object.keys(obj);

    keys = keys.sort();

    return keys.map((key) => {
      return (
        <option key={key} value={key}>
          {key}
        </option>
      );
    });
  }

  initPersonGen() {
    let state = this.state;

    for (let key in state) {
      if (state[key] === "all") state[key] = undefined;
    }

    // const options = {
    //   race: state.race,
    //   sex: state.sex,
    //   alignment: state.alignment,
    //   cr: state.cr,
    //   occupation: state.job,
    //   jobGroup: state.jobGroup,

    //   // batch property used to skip generating fluff and speed up builds
    //   // regular builds are 40x slower due to stat block generation
    //   batch: false
    // };

    const options = {
      ...this.state,
      batch: false,
    };

    // TODO - Nobles aren't generated correctly. Because job group is decided after the call to Person or Noble, even someone with a random noble title will always be generated as a normal person instead of as a noble. Either job needs to be determined first (against batch method) or another method needs to be set for generating nobility.

    this.setState({ person: new Person(options) });
  }

  getOccupationBlock() {
    const { jobGroup, job, sex } = this.state;
    const dataGroup = Professions.jobs[jobGroup];
    const mappable = dataGroup && Array.isArray(dataGroup.list);
    const genderMappable =
      dataGroup && !Array.isArray(dataGroup.list) && Array.isArray(dataGroup.list.male);

    return (
      <React.Fragment>
        {/* Genderless jobs */}
        {mappable && (
          <Select title={"Job"} name={"job"} value={job} onChange={this.change}>
            <option value='all'>random job</option>
            {dataGroup.list.map((job) => (
              <option key={job} value={job}>
                {job.replace("*", "person")}
              </option>
            ))}
          </Select>
        )}

        {/* Jobs with gender-specific titles */}
        {genderMappable && (
          <React.Fragment>
            <Select
              title={"Job"}
              name={"job"}
              value={job}
              onChange={this.change}
              disabled={sex === "all"}
            >
              <option value='all'>random job</option>
              {sex !== "all" &&
                dataGroup.list[sex].map((job) => (
                  <option key={job} value={job}>
                    {job.replace("*", "person")}
                  </option>
                ))}
            </Select>

            {sex === "all" && (
              <p className='warning'>
                <span role='img' aria-label='warning'>
                  ⚠️
                </span>{" "}
                Please select a sex to choose a specific {jobGroup} job.
              </p>
            )}
          </React.Fragment>
        )}

        {/* Adventuring Classes */}
        {jobGroup === "adventurer" && (
          <Select title={"Class"} name={"job"} value={job} onChange={this.change}>
            <option value='all'>random class</option>
            {Object.keys(dataGroup).map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </Select>
        )}
      </React.Fragment>
    );
  }

  render() {
    const { person, race, sex, alignment, cr, jobGroup } = this.state;

    return (
      <div className='App'>
        <main className='content'>
          <Aside>
            <Select title={"Race"} name={"race"} value={race} onChange={this.change}>
              <option value='all'>random race</option>
              {this.getOptions(Race)}
            </Select>

            <Select title={"Sex"} name={"sex"} value={sex} onChange={this.change}>
              <option value='all'>random sex</option>
              <option value='male'>male</option>
              <option value='female'>female</option>
            </Select>

            <Select title={"Alignment"} name={"alignment"} value={alignment} onChange={this.change}>
              <option value='all'>random alignment</option>
              <option disabled>-------</option>
              {this.getOptions(alignments)}
              <option disabled>-------</option>
              {allAlignments.map((al) => (
                <option key={al} value={al}>
                  {al}
                </option>
              ))}
            </Select>

            <Select title={"Occupation"} name={"jobGroup"} value={jobGroup} onChange={this.change}>
              <option value='all'>random occupation</option>
              {this.getOptions(Professions.jobs)}
            </Select>

            {this.getOccupationBlock()}

            <Select title={"Challenge"} name={"cr"} value={cr} onChange={this.change}>
              <option value='all'>random cr</option>
              {crData.cr.map((cr) => (
                <option key={cr._cr} value={cr._cr}>
                  {cr._cr}
                </option>
              ))}
            </Select>

            <Button id={"generatePerson"} className={"buildButton"} onClick={this.initPersonGen}>
              build person
            </Button>
          </Aside>

          {person && (
            <PersonDisplay person={person} state={this.state} stateHandler={this.stateHandler} />
          )}
        </main>
      </div>
    );
  }
}
