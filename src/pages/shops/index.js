import React, { Component } from 'react';
import Accordion from "../../components/accordion/accordion";
import Aside from "../../components/aside";
import Display from "../../components/display/display";
import MerchantGenerator from "../../components/generators/merchants/merchantGenerator";
import StatBlock from "../../components/display/statBlock/statBlock";
import Button from "../../components/controls/button/buttonStandard";
import Select from "../../components/controls/select/selectStandard";

import Race from "../../data/races/allRaces";
import merchantsObj from "../../data/merchants/merchants";
import tavernsObj from "../../data/merchants/taverns";

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
      [e.target.name]: e.target.value
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

    this.setState({shop: generatedShop});
  }

  render() {
    const {shop, size, type, owner, atmosphere} = this.state;

    return (
      <div className="App">
        <main className="content">
           <Aside>
            <Select title={"Shop Type"} name={"type"} value={type} onChange={this.change} >
              <option value="all">random shop</option>
              {this.getOptions(allShops)}
            </Select>
            
            {/* 
            { type === "inn" &&
              <Select title={"Size"} name={"size"} value={size} onChange={this.change} >
                <option value="all">random size</option>
                {this.getOptions(allShops["inn"].size)}
              </Select>
            }
            { type === "inn" && 
              <Select title={"Atmosphere"} name={"atmosphere"} value={atmosphere} onChange={this.change} >
                <option value="all">random atmosphere</option>
                {this.getOptions(allShops["inn"].atmosphere)}
              </Select>
            }
            { type === "tavern" &&
              <Select title={"Atmosphere"} name={"atmosphere"} value={atmosphere} onChange={this.change} >
                <option value="all">random atmosphere</option>
                {this.getOptions(allShops["tavern"].atmosphere)}
              </Select>
            }

            <Select title={"Shop Owner"} name={"owner"} value={owner} onChange={this.change} >
              <option value="all">random owner</option>
              {this.getOptions(Race)}
            </Select> 
            */}
            
            <Button id={"generateShop"} className={"buildButton"} onClick={this.initShopGen}>
              build shop
            </Button>

          </Aside>
          { this.state.shop && 
            <Display>
              <h2 className="shopName">{shop.name}</h2>
              <h3 className="shopType">{shop.shopType}</h3>
              <div className="shopInfo">
                <p className="shopDetails">{shop.name} is a {shop.size}, {shop.atmosphere} {shop.shopType}.</p>
                <p className="ownerInfo">This {shop.shopType} is owned by {shop.owner.name.displayName}, the {shop.owner.age} year old {shop.owner.race} {shop.owner.occupation}.</p>
              </div>
              { this.state.shop.inventory && 
                <div className="inventory">
                  inventory
                </div>
              }

              { this.state.shop && shop.owner.stats && 
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
