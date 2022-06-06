import React, { Component } from "react";

import Aside from "../../components/aside";
import Button from "../../components/controls/button/buttonStandard";
import MagicItem from "../../generators/magicItem";
import MagicItemDisplay from "../../components/display/magicItem";
import Select from "../../components/controls/select/selectStandard";
import Utils from "../../components/utils";
import { disabled } from "express/lib/application";
import itemData from "../../data/magicItems/magicItems.json";

export default class MagicItemPage extends Component {
  constructor(props) {
    super(props);
    Utils.setNewSeed();

    this.state = {
      type: undefined,
      magicItem: null,
    };

    this.change = this.change.bind(this);
    this.createMagicItem = this.createMagicItem.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
  }

  change(e) {
    let name = e.target.name;
    let value = e.target.value;

    this.setState({
      [name]: value,
    });
  }

  createMagicItem() {
    const params = { ...this.state };
    Utils.setNewSeed();

    // this.runTest(10000);

    const magicItem = new MagicItem(params);

    this.setState({
      seed: global.seed,
      magicItem,
    });
  }

  runTest(num) {
    let errors = 0;
    const params = { ...this.state };
    console.log(`Making ${num} magic items`);
    console.time("magic items");
    for (let i = 1; i <= num; i++) {
      try {
        Utils.setNewSeed();
        new MagicItem(params);
      } catch (e) {
        errors++;
        console.log(`error #${errors} at ${i} magic item roll`);
        console.error(e);
      }
    }
    console.timeEnd("magic items");
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
    const { type = {}, magicItem } = this.state;

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <Select
              title="Type of Item"
              value={type}
              onChange={(el) => this.setState({ type: el.target.value })}
            >
              <option value={undefined}>random</option>
              {Object.keys(itemData.itemGroups).map((type) => (
                <option key={type} value={type}>
                  {type.toLocaleLowerCase()}
                </option>
              ))}
            </Select>

            <Button id={"generateState"} className={"buildButton"} onClick={this.createMagicItem}>
              create item
            </Button>
          </Aside>

          {magicItem && <MagicItemDisplay state={this.state} stateHandler={this.stateHandler} />}
        </main>
      </div>
    );
  }
}
