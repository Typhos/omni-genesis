import React, { Component } from "react";

import Aside from "../../components/aside";
import Button from "../../components/controls/button/buttonStandard";
import RivalAdventurersDisplay from "../../components/display/rivalAdventurers/rivals";
import RivalParty from "../../generators/rival-adventurers/rivals";
import Select from "../../components/controls/select/selectStandard";
import Utils from "../../components/utils";

export default class RivalAdventurers extends Component {
  constructor(props) {
    super(props);
    Utils.setNewSeed();

    this.state = {
      type: "random",
      party: null,
      dungeonLevel: "1",
      townSize: "village",
      encounterLocation: "dungeon"
    };

    this.change = this.change.bind(this);
    this.createRivals = this.createRivals.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

  change(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  stateHandler(obj) {
    this.setState(obj);
  }

  createRivals() {
    const params = { ...this.state };
    Utils.setNewSeed();

    // TEST ONLY
    // for (let i = 0; i <= 500; i++) {
    //   new RivalParty(params);
    // }
    if (params.encounterLocation === "settlement") {
      switch (params.townSize) {
        case "hamlet":
          params.dungeonLevel = 2;
          break;
        case "village":
          params.dungeonLevel = 3;
          break;
        case "small town":
          params.dungeonLevel = 4;
          break;
        case "large town":
          params.dungeonLevel = 5;
          break;
        case "small city":
          params.dungeonLevel = 6;
          break;
        case "large city":
          params.dungeonLevel = 7;
          break;
        default:
          params.dungeonLevel = 1;
          break;
      }
    }

    const party = new RivalParty(params);

    this.setState({
      seed: global.seed,
      party
    });
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

  getOptionsFromArray(arr) {
    return arr.map((key) => {
      return (
        <option key={key} value={key}>
          {key}
        </option>
      );
    });
  }

  render() {
    const { townSize, dungeonLevel, encounterLocation, party } = this.state;
    const dungeonLevels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];
    const townSizes = [
      "thorp",
      "hamlet",
      "village",
      "small town",
      "large town",
      "small city",
      "large city"
    ];

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <Select
              title="Encounter Location"
              value={encounterLocation}
              onChange={(el) => this.setState({ encounterLocation: el.target.value })}
            >
              <option value="dungeon">dungeon</option>
              <option value="settlement">settlement</option>
              <option value="wilderness">wilderness</option>
            </Select>
            {(encounterLocation === "dungeon" || encounterLocation === "wilderness") && (
              <Select
                title={`${
                  encounterLocation === "dungeon" ? "Dungeon Level" : "Max Lvl of Nearest Dungeon"
                }`}
                value={dungeonLevel}
                onChange={(el) => this.setState({ dungeonLevel: el.target.value })}
              >
                {this.getOptionsFromArray(dungeonLevels)}
              </Select>
            )}
            {encounterLocation === "settlement" && (
              <Select
                title="Settlement Size"
                value={townSize}
                onChange={(el) => this.setState({ townSize: el.target.value })}
              >
                {this.getOptionsFromArray(townSizes)}
              </Select>
            )}
            <Button id={"generateRivals"} className={"buildButton"} onClick={this.createRivals}>
              create rivals
            </Button>
          </Aside>

          <RivalAdventurersDisplay party={party} stateHandler={this.stateHandler} />
        </main>
      </div>
    );
  }
}
