import React, { Component } from "react";

import Aside from "../../components/aside";
import Button from "../../components/controls/button/buttonStandard";
import Select from "../../components/controls/select/selectStandard";
import SwordDescription from "../../generators/sword";
import SwordDisplay from "../../components/display/sword";
import Utils from "../../components/utils";
import swordData from "../../data/swords/swords.json";

export default class SwordsPage extends Component {
  constructor(props) {
    super(props);
    Utils.setNewSeed();

    this.state = {
      type: "random",
      sword: null,
    };

    this.change = this.change.bind(this);
    this.createSword = this.createSword.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

  change(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  }

  createSword() {
    const params = { ...this.state };
    Utils.setNewSeed();

    const sword = new SwordDescription(params);

    this.setState({
      seed: global.seed,
      sword,
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

  stateHandler(obj) {
    this.setState(obj);
  }

  render() {
    const { type, sword } = this.state;

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <Select
              title="Sword Type"
              value={type}
              onChange={(el) => this.setState({ type: el.target.value })}
            >
              <option key="random" value="random">
                random
              </option>

              {this.getOptions(swordData.type, false)}
            </Select>
            <Button id={"generateState"} className={"buildButton"} onClick={this.createSword}>
              create sword
            </Button>
          </Aside>

          {sword && <SwordDisplay state={this.state} stateHandler={this.stateHandler} />}
        </main>
      </div>
    );
  }
}
