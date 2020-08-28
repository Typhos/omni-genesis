import React, { Component } from "react";
import Accordion from "../../components/accordion/accordion";
import Aside from "../../components/aside";
import Display from "../../components/display/display";
import MerchantGenerator from "../../components/generators/merchants/merchantGenerator";
import Button from "../../components/controls/button/buttonStandard";
import Select from "../../components/controls/select/selectStandard";
import Tabs from "../../components/tabs";

import ShopDisplay from "../../components/display/shop";

import Inventory from "./";
import StatBlock from "../../components/display/statBlock/statBlock";

import Race from "../../data/races/allRaces";
import merchantsObj from "../../data/merchants/merchants";
import tavernsObj from "../../data/merchants/taverns";

const allShops = { ...merchantsObj, ...tavernsObj };

export default class Shops extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "all",
      owner: "all",
    };

    this.change = this.change.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.initShopGen = this.initShopGen.bind(this);
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getOptions(obj) {
    let keys = [];
    for (let [key, info] of Object.entries(obj)) {
      if (info.itemList !== undefined) keys.push(key);
    }

    keys = keys.sort();

    return keys.map((key) => {
      return (
        <option key={key} value={key}>
          {key}
        </option>
      );
    });
  }

  initShopGen() {
    let state = this.state;

    for (let key in state) {
      if (state[key] === "all") {
        state[key] = undefined;
      }
    }

    const generatedShop = new MerchantGenerator({
      type: state.type,
      owner: state.owner,
    });

    this.setState({ shop: generatedShop });
  }

  render() {
    const { shop, stats, size, type, owner, atmosphere } = this.state;

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <Select title={"Shop Type"} name={"type"} value={type} onChange={this.change}>
              <option value="all">random shop</option>
              {this.getOptions(allShops)}
            </Select>
            <Button id={"generateShop"} className={"buildButton"} onClick={this.initShopGen}>
              build shop
            </Button>
          </Aside>
          {shop && <ShopDisplay shop={shop} />}
        </main>
      </div>
    );
  }
}
