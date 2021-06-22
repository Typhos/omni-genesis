import React, { Component } from "react";
import Utils from "../../components/utils";
import Aside from "../../components/aside";
import Button from "../../components/controls/button/buttonStandard";
import Select from "../../components/controls/select/selectStandard";
import NumberInput from "../../components/controls/input/numberInput";

import ClanGenerator from "../../generators/samuraiClan/clanGenerator";
import SamuraiClanDisplay from "../../components/display/samuraiClan";

export default class Clans extends Component {
  constructor(props) {
    super(props);
    Utils.setNewSeed();

    this.state = {
      seed: global.seed,
      size: "random",
      alignment: "random",
    };

    this.change = this.change.bind(this);
    this.buildClan = this.buildClan.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

  change(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  }

  buildClan() {
    const params = { ...this.state };
    Utils.setNewSeed();

    // this.runTest(10000);

    const clan = new ClanGenerator(params);

    console.log(clan);

    this.setState({
      seed: global.seed,
      display: null,
      previousEntries: [],
      clan,
    });
  }

  runTest(num) {
    let errors = 0;
    const params = { ...this.state };
    console.log(`Making ${num} clans`);
    console.time("clans");
    for (let i = 1; i <= num; i++) {
      try {
        Utils.setNewSeed();
        new ClanGenerator(params);
      } catch (e) {
        errors++;
        console.log(`error #${errors} at ${i} clans`);
        console.error(e);
      }
    }
    console.timeEnd("clans");
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
    const { size, alignment, clan, members } = this.state;

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <Select
              title="Clan Size"
              value={size}
              onChange={(el) => this.setState({ size: el.target.value })}
            >
              <option value="random">random</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
              <option value="major">major</option>
            </Select>

            <Select
              title="Alignment"
              value={alignment}
              onChange={(el) => this.setState({ alignment: el.target.value })}
            >
              <option value="random">random</option>
              <option value="lawful neutral">lawful neutral</option>
              <option value="lawful good">lawful good</option>
              <option value="lawful evil">lawful evil</option>
              <option value="neutral">neutral</option>
              <option value="neutral good">neutral good</option>
              <option value="neutral evil">neutral evil</option>
              <option value="chaotic neutral">chaotic neutral</option>
              <option value="chaotic good">chaotic good</option>
              <option value="chaotic evil">chaotic evil</option>
            </Select>

            {/* <NumberInput
              title="Retainers"
              value={members}
              onChange={(el) => this.setState({ members: parseInt(el.target.value) })}
            /> */}

            <Button id={"generateState"} className={"buildButton"} onClick={this.buildClan}>
              create new clan
            </Button>
          </Aside>

          {clan && (
            <SamuraiClanDisplay clan={clan} state={this.state} stateHandler={this.stateHandler} />
          )}
        </main>
      </div>
    );
  }
}
