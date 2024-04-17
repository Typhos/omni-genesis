import React, { Component } from "react";
import { Treasure, generateTreasure } from "../../generators/treasure";

import Aside from "../../components/aside";
import Button from "../../components/controls/button/buttonStandard";
import CheckBoxInput from "../../components/controls/input/checkBoxInput";
import NumberInput from "../../components/controls/input/numberInput";
import Select from "../../components/controls/select/selectStandard";
import TreasureDisplay from "../../components/display/treasure";
import Utils from "../../components/utils";

export default class TreasurePage extends Component {
  constructor(props) {
    super(props);
    Utils.setNewSeed();

    this.state = {
      itemCount: 1,
      specialTreasure: true,
      guaranteedTreasure: false,
      table: "Jewelry",
      treasure: null
    };

    this.change = this.change.bind(this);
    this.findTreasure = this.findTreasure.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

  change(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  findTreasure() {
    const params = { ...this.state };
    Utils.setNewSeed();

    // this.runTest(1000);

    const treasure = generateTreasure(params);

    this.setState({
      seed: global.seed,
      treasure
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
    const { guaranteedTreasure, specialTreasure, itemCount, table, treasure = {} } = this.state;

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <Select
              title="Treasure Table"
              value={table}
              onChange={(el) => this.setState({ table: el.target.value })}
            >
              <option disabled>Specific Items</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Gemstones">Gemstones</option>
              <option disabled>Hoards</option>
              <option value="A">a</option>
              <option value="B">b</option>
              <option value="C">c</option>
              <option value="D">d</option>
              <option value="E">e</option>
              <option value="F">f</option>
              <option value="G">g</option>
              <option value="H">h</option>
              <option value="I">i</option>
              <option value="J">j</option>
              <option value="K">k</option>
              <option value="L">l</option>
              <option value="M">m</option>
              <option value="N">n</option>
              <option value="O">o</option>
              <option disabled>Individual Treasure</option>
              <option value="P">p</option>
              <option value="Q">q</option>
              <option value="R">r</option>
              <option value="S">s</option>
              <option value="T">t</option>
              <option disabled>Group Treasure</option>
              <option value="U">u</option>
              <option value="V">v</option>
            </Select>

            {(table === "Jewelry" || table === "Gemstones") && (
              <NumberInput
                title={`Amount of ${table}`}
                value={itemCount}
                onChange={(el) => this.setState({ itemCount: el.target.value })}
              ></NumberInput>
            )}

            <CheckBoxInput
              title="No Empty Treasure Vaults"
              name={"guaranteedTreasure"}
              checked={guaranteedTreasure}
              onChange={(e) =>
                this.setState({
                  [e.target.name]: e.target.checked
                })
              }
            ></CheckBoxInput>

            <CheckBoxInput
              title={specialTreasure}
              // title="Replace some coins with special treasure"
              name={"specialTreasure"}
              checked={specialTreasure}
              onChange={(e) =>
                this.setState({
                  [e.target.name]: e.target.checked
                })
              }
            ></CheckBoxInput>

            <Button id={"generateState"} className={"buildButton"} onClick={this.findTreasure}>
              find treasure
            </Button>
          </Aside>

          {treasure && <TreasureDisplay state={this.state} stateHandler={this.stateHandler} />}
        </main>
      </div>
    );
  }
}
