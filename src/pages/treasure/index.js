import React, { Component } from "react";
import { Treasure, generateTreasure } from "../../generators/treasure";

import Aside from "../../components/aside";
import Button from "../../components/controls/button/buttonStandard";
import CheckBoxInput from "../../components/controls/input/checkBoxInput";
import Select from "../../components/controls/select/selectStandard";
import TreasureDisplay from "../../components/display/treasure";
import Utils from "../../components/utils";

export default class TreasurePage extends Component {
  constructor(props) {
    super(props);
    Utils.setNewSeed();

    this.state = {
      itemsRoll: "specific",
      guaranteedTreasure: false,
      table: "A",
      treasure: null,
    };

    this.change = this.change.bind(this);
    this.findTreasure = this.findTreasure.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

  change(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  }

  findTreasure() {
    const params = { ...this.state };
    Utils.setNewSeed();

    // this.runTest(10000);

    const treasure = generateTreasure(params);

    this.setState({
      seed: global.seed,
      treasure,
    });
  }

  runTest(num) {
    let errors = 0;
    const params = { ...this.state };
    console.log(`Making ${num} treasure tables`);
    console.time("treasure");
    for (let i = 1; i <= num; i++) {
      try {
        Utils.setNewSeed();
        new Treasure(params);
      } catch (e) {
        errors++;
        console.log(`error #${errors} at ${i} treasure roll`);
        console.error(e);
      }
    }
    console.timeEnd("treasure");
  }

  getOptions(obj, sort, filterKey) {
    let keys = Object.keys(obj);

    if (sort) {
      keys = keys.sort();
    }

    if (filterKey) {
      keys = keys.filter((e) => e !== filterKey);
    }

    return keys.map((key) => {
      return (
        <option key={key} value={key}>
          {key}
        </option>
      );
    });
  }

  stateHandler(obj) {
    this.setState(obj);
  }

  render() {
    const { guaranteedTreasure, itemsRoll, table, treasure = {} } = this.state;

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <Select
              title="Treasure Table"
              value={table}
              onChange={(el) => this.setState({ table: el.target.value })}
            >
              <option disabled>Hoards</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I</option>
              <option value="J">J</option>
              <option value="K">K</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="N">N</option>
              <option value="O">O</option>
              <option disabled>Individual Treasure</option>
              <option value="P">P</option>
              <option value="Q">Q</option>
              <option value="R">R</option>
              <option value="S">S</option>
              <option value="T">T</option>
              <option disabled>Group Treasure</option>
              <option value="U">U</option>
              <option value="V">V</option>
            </Select>

            <Select
              title="Magic Items"
              value={itemsRoll}
              onChange={(el) => this.setState({ itemsRoll: el.target.value })}
            >
              <option value="specific">roll specific items</option>
              <option value="vague">just roll item type</option>
              <option value="basic">don't roll items</option>
            </Select>

            <CheckBoxInput
              title="No Empty Treasure Vaults"
              name={"guaranteedTreasure"}
              checked={guaranteedTreasure}
              onChange={(e) =>
                this.setState({
                  [e.target.name]: e.target.checked,
                })
              }
            ></CheckBoxInput>

            <Button id={"generateState"} className={"buildButton"} onClick={this.findTreasure}>
              find treasure
            </Button>
          </Aside>

          {treasure && (
            <TreasureDisplay state={this.state} stateHandler={this.stateHandler} />
            // <SamuraiClanDisplay clan={clan} state={this.state} stateHandler={this.stateHandler} />
          )}
        </main>
      </div>
    );
  }
}
