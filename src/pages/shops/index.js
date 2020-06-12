import React, { Component } from 'react';
import Aside from "components/aside";
import Display from "components/display";

import Race from "data/races";
import ShopData from "data/shops";
import TavernData from "data/taverns";

import ShopGen from "components/generators/shop";

const allShops = {...ShopData, ...TavernData};

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
    let keys = Object.keys(obj);

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

    const generatedShop = new ShopGen({
      type: state.type,
      owner: state.owner
    });

    console.log(generatedShop)

    // MAKE 10,000 items to just test for errors =======================
    // let x = new Array(10000).fill(undefined).map( x => new Person());
    // console.log(x)

    this.setState({newShop: generatedShop});
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
                <p className="ownerInfo">This {shop.shopType} is owned by {shop.owner.name}, the {shop.owner.age} year old {shop.owner.race} {shop.owner.occupation}.</p>
              </div>
              { this.state.newShop.inventory && 
                <div className="inventory">
                  inventory
                </div>
              }
            </Display>
          }
        </main>
      </div>
    );
  }
}
