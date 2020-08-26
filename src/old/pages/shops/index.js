import React, { Component } from 'react';
import Aside from "components/aside";
import Display from "components/display";
import StatBlock from "components/display/statBlock/statBlock";
import Accordion from "components/accordion/accordion";

import Race from "data/races/allRaces";
import merchantsObj from "data/merchants/merchants";
import tavernsObj from "data/merchants/taverns";

import MerchantGenerator from "components/generators/merchants/merchantGenerator";

const allShops = {...merchantsObj, ...tavernsObj};

export default class Shops extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "type": "all",
      "owner": "all",
    };

    this.change = this.change.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.initShopGen = this.initShopGen.bind(this);

  }

  change (e) {
    this.setState({
      [e.target.className]: e.target.value
    });
  }

  getOptions(obj) {
    let keys = [];
    for ( let [key, info] of Object.entries(obj) ){
      if ( info.itemList !== undefined ) keys.push(key); 
    } 

    keys = keys.sort();

    return keys.map( key => {
      return <option key={key} value={key}>{key}</option>
    });
  }

  initShopGen() {
    let state = this.state;

    for ( let key in state ) {
      if ( state[key] === "all" ) {
        state[key] = undefined;
      }
    }

    const generatedShop = new MerchantGenerator({
      type: state.type,
      owner: state.owner
    });

    console.log(generatedShop)
    // this.runTest(500);

    this.setState({newShop: generatedShop});
  }


  runTest(num) {
    console.log(`Making ${num} shops`);
    console.time('shops');
    new Array(num).fill(undefined).map( () => new MerchantGenerator());
    console.timeEnd('shops');
  }

  render() {
    const shop = this.state.newShop;

    return (
      <div className="App">
        <main className="content">
           <Aside>
            <label>Shop Type
              <select className="type" onChange={this.change} value={this.state.type}>
                <option value="all">random shop</option>
                {this.getOptions(allShops)}
              </select>
            </label>
            { this.state.type === "inn" &&
              <label>Size
                <select className="owner" onChange={this.change} value={this.state.owner}>
                  <option value="all">random size</option>
                  {this.getOptions(allShops["inn"].size)}
                </select>
              </label>
            }
            { this.state.type === "inn" && 
              <label>Atmosphere
                <select className="owner" onChange={this.change} value={this.state.owner}>
                  <option value="all">random atmosphere</option>
                  {this.getOptions(allShops["inn"].atmosphere)}
                </select>
              </label>
            }
            { this.state.type === "tavern" &&
              <label>Type of Tavern
                <select className="owner" onChange={this.change} value={this.state.owner}>
                  <option value="all">random type</option>
                  {this.getOptions(Race)}
                </select>
              </label>
            }
            <label>Shop Owner
              <select className="owner" onChange={this.change} value={this.state.owner}>
                <option value="all">random owner</option>
                {this.getOptions(Race)}
              </select>
            </label>
            <button id="generateShop" className="buildButton" onClick={this.initShopGen}>build shop</button>
          </Aside>
          { this.state.newShop && 
            <Display>
              <h2 className="shopName">{shop.name}</h2>
              <h3 className="shopType">{shop.shopType}</h3>
              <div className="shopInfo">
                <p className="shopDetails">{shop.name} is a {shop.size}, {shop.atmosphere} {shop.shopType}.</p>
                <p className="ownerInfo">This {shop.shopType} is owned by {shop.owner.name.displayName}, the {shop.owner.age} year old {shop.owner.race} {shop.owner.occupation}.</p>
              </div>
              { this.state.newShop.inventory && 
                <div className="inventory">
                  inventory
                </div>
              }

              { this.state.newShop && shop.owner.stats && 
                <Accordion title={"Owner Stats"}>
                  <StatBlock person={shop.owner} />
                </Accordion>
              }
            </Display>
          }
        </main>
      </div>
    );
  }
}
