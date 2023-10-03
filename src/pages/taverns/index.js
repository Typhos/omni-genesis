//components

import React, { Component } from "react";

import Aside from "../../components/aside";
import Button from "../../components/controls/button/buttonStandard";
import Select from "../../components/controls/select/selectStandard";
import TavernPatronDisplay from "../../components/display/tavernPatrons";
import TavernPatrons from "../../generators/tavernPatrons/patrons";
import Utils from "../../components/utils";
import taverns from "../../data/taverns/bar-patrons.json";

//generators

//data

export default class TavernPatronsPage extends Component {
  constructor(props) {
    super(props);

    Utils.setNewSeed();

    this.state = {
      tavernName: null,
      timeOfDay: "Evening",
      tavern: null
    };

    this.change = this.change.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.getPatronList = this.getPatronList.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getOptions(obj, sort = false) {
    let keys = Object.keys(obj);

    if (sort) {
      keys = keys.sort();
    }

    return keys.map((key) => {
      return (
        <option key={key} value={key}>
          {key}
        </option>
      );
    });
  }

  componentDidMount() {
    const tavern = Object.keys(taverns);
    this.setState({ tavernName: tavern[0], tavern: taverns[0] });
  }

  getPatronList() {
    const { tavernName, timeOfDay } = this.state;
    const {
      patrons: { patronList, totalPatrons }
    } = new TavernPatrons({ tavernName, timeOfDay });
    this.setState({ tavern: { patrons: patronList, totalPatrons, timeOfDay, tavernName } });
  }

  render() {
    const { tavernName, timeOfDay, tavern } = this.state;
    const timesOfDay = ["Morning", "Afternoon", "Evening"];

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <Select title={"Tavern"} name={"tavernName"} value={tavernName} onChange={this.change}>
              {this.getOptions(taverns, false)}
            </Select>

            <Select title={"Time"} name={"timeOfDay"} value={timeOfDay} onChange={this.change}>
              {timesOfDay.map((time) => {
                return (
                  <option key={time} value={time}>
                    {time}
                  </option>
                );
              })}
            </Select>

            <Button id={"getPatrons"} className={"buildButton"} onClick={this.getPatronList}>
              who's at the tavern?
            </Button>
          </Aside>

          {tavern && (
            <TavernPatronDisplay
              tavern={tavern}
              state={this.state}
              stateHandler={this.stateHandler}
            />
          )}
        </main>
      </div>
    );
  }
}
