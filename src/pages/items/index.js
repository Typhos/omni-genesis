import React, { Component } from 'react';
import Utils from "components/utils";
import Aside from "components/aside";
import Display from "components/display";
import Item from "components/generators/items/item";

import Weapons from "data/weapons";
import Armor from "data/armor";
import Jewelry from "data/jewelry";
import Items from "data/items";

const itemsData = {...Weapons, ...Armor, ...Jewelry, ...Items};

export default class ItemGenerator extends Component {

  constructor (props) {
    super (props);

    this.state = {
      newItem: {},
      category: "all",
      type: undefined,
      subtype: undefined
    };

    this.change = this.change.bind(this);
    this.updateState = this.updateState.bind(this);
    this.initItemGen = this.initItemGen.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  change(e) {
    if (e.target.className === "category") {
      this.setState({
        [e.target.className]: e.target.value,
        "type": "all",
        "subtype": undefined
      });
    } else if (e.target.className === "type") {
      this.setState({
        [e.target.className]: e.target.value,
        "subtype": "all"
      });
    } else {
      this.setState({
        [e.target.className]: e.target.value
      });  
    }    
  }

  updateState(obj) {
    this.setState(obj);
  }

  initItemGen() {
    const state = this.state;
    const generatedItem = new Item(state.category, state.type, state.subtype);

    // this.runTest(500);
    this.setState({newItem: generatedItem});
  }  
  
  runTest(num) {
    console.log(`Making ${num} items`);
    console.time('items');
    new Array(num).fill(undefined).map( x => {
      Utils.setNewSeed();
      new Item();
    });
    console.timeEnd('items');
  }

  getOptions(obj) {
    let arr = [];
    for (const key in obj) {
      arr.push(<option key={key} value={key}>{key}</option>);
    }

    return arr;
  }

  render() {
    const item = this.state.newItem;
    const typeGroup = (this.state.category !== "all") ? itemsData[this.state.category] : undefined;
    const subGroups = (this.state.type !== undefined && this.state.type !== "all") ? itemsData[this.state.category][this.state.type].subtype : undefined;

    return (
      <div className="App">
        <main className="content">
          <Aside>
            <select className="category" onChange={this.change} value={this.state.category}>
              <option value="all">all</option>
              {this.getOptions(itemsData)}
            </select>

            { this.state.category !== undefined && this.state.category !== "all" &&
              <select className="type" onChange={this.change}>
                <option value="all">all</option>
                {this.getOptions(typeGroup)}
              </select>
            }

            {  this.state.type !== undefined && this.state.type !== "all" &&
              <select className="subtype" onChange={this.change}>
                <option value="all">all</option>
                {this.getOptions(subGroups)}
              </select>
            }

            <button id="generateItem" className="buildButton" onClick={this.initItemGen}>
              { this.state.category === "all" &&
                <span>build</span>
              }
              {
                this.state.type === "all" &&
                <span>build {this.state.category}</span>
              }
              {
                this.state.subtype === "all" && this.state.type !== "all" &&
                <span>build {this.state.type}</span>
              }
              {
                this.state.subtype !== "all" && this.state.subtype !== undefined &&
                <span>build {this.state.subtype}</span>
              }
            </button>
          </Aside>

          { item &&
            <Display>
              <h2 className="name">{item.primaryMaterial} {item.subtype}</h2>
              <p className="description">{item.description}</p>
              { item.fiveEStats && 
                <section className="statsShell">
                  <div className="statBlock">
                    <div className="grouping">
                      <p><span className="classification">Type: </span> {item.fiveEStats.type}</p>
                      <p><span className="classification">Value: </span> {item.fiveEStats.value} gp</p>
                      { item.fiveEStats.damage && 
                        <p><span className="classification">Damage: </span> 
                          {item.fiveEStats.damage} {item.fiveEStats.damage_type.join(" / ")}
                        </p>
                      }
                      { item.type.includes("armor") && item.fiveEStats.armor_class &&
                        <p><span className="classification">AC: </span> {item.fiveEStats.armor_class}</p>
                      }
                      { item.fiveEStats.properties && item.fiveEStats.properties.length > 0 &&
                        <p><span className="classification">Properties: </span> {item.fiveEStats.properties.join(", ")}</p>
                      }
                      <p><span className="classification">Weight: </span> {item.fiveEStats.weight} lbs</p>
                    </div>
                  </div>
                </section>
              }
            </Display>
          }
        </main>
      </div>
    );
  }
}
