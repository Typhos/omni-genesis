import React, { Component } from "react";

import Aside from "../../components/aside";
import Button from "../../components/controls/button/buttonStandard";
import CheckBoxInput from "../../components/controls/input/checkBoxInput";
import HirelingRoster from "../../generators/hirelings/generateMooks";
import HirelingsDisplay from "../../components/display/hirelings/hirelings";
import Select from "../../components/controls/select/selectStandard";

// Generators

export default class Hirelings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 1,
      townSize: "village",
      crier: false,
      hirelings: undefined,
    };

    this.change = this.change.bind(this);
    this.hireMooks = this.hireMooks.bind(this);
  }

  change(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  hireMooks() {
    let { state } = this;
    const hirelings = new HirelingRoster(state);
    console.log(hirelings);
    this.setState({ hirelings });
  }

  render() {
    const { crier, level, townSize, hirelings } = this.state;

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <CheckBoxInput
              title={"Hire Town Crier? (5 gp)"}
              name={"crier"}
              checked={crier}
              onChange={(e) =>
                this.setState({
                  [e.target.name]: e.target.checked,
                })
              }
            ></CheckBoxInput>
            <Select
              title={"Settlement Size"}
              name={"townSize"}
              value={townSize}
              onChange={this.change}
            >
              <option value="village">village</option>
              <option value="town">town</option>
              <option value="city">city</option>
            </Select>
            <Select
              title={"Average Party Level"}
              name={"level"}
              value={level}
              onChange={this.change}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
            </Select>
            <Button id={"recruit"} className={"buildButton"} onClick={this.hireMooks}>
              recruit
            </Button>
          </Aside>
          <HirelingsDisplay hirelings={hirelings} />
        </main>
      </div>
    );
  }
}
