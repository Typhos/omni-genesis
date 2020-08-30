import React, { Component } from "react";
import Aside from "../../components/aside";
import Display from "../../components/display/display";
import Item from "../../generators/items/item";
import Button from "../../components/controls/button/buttonStandard";
import Select from "../../components/controls/select/selectStandard";

import Weapons from "../../data/weapons";
import Armor from "../../data/armor";
import Jewelry from "../../data/jewelry";
import Items from "../../data/items";

export default class ItemGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: undefined,
      type: undefined,
      subtype: undefined,
      category: "all",
    };

    this.change = this.change.bind(this);
    this.initItemGen = this.initItemGen.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }

  change(e) {
    // Hierarchy of the object is: category -> type -> subtype
    // If a category of higher order category changes, it invalidates the lower category.
    let name = e.target.name;
    let val = e.target.value;
    let updateObj = { ...this.state };

    if (name === "category") {
      updateObj.type = undefined;
      updateObj.subtype = undefined;
    } else if (name === "type") {
      updateObj.subtype = undefined;
    }

    this.setState({
      ...updateObj,
      [name]: val,
    });
  }

  initItemGen() {
    const { category, type, subtype } = this.state;
    const generatedItem = new Item({
      category,
      type,
      subtype,
    });

    this.setState({ item: generatedItem });
  }

  getOptions(obj) {
    let arr = [];
    for (const key in obj) {
      arr.push(
        <option key={key} value={key}>
          {key}
        </option>
      );
    }

    return arr;
  }

  render() {
    const { item, category, type, subtype } = this.state;
    const itemsData = { ...Weapons, ...Armor, ...Jewelry, ...Items };
    const typeGroup = category !== "all" ? itemsData[category] : undefined;
    const subGroups = type && type !== "all" ? itemsData[category][type].subtype : undefined;

    return (
      <main className='content'>
        <Aside>
          <Select title={"Item Type"} name={"category"} onChange={this.change} value={category}>
            <option value='all'>all</option>
            {this.getOptions(itemsData)}
          </Select>

          {category !== "all" && (
            <Select title={"Type of " + category} name={"type"} onChange={this.change} value={type}>
              <option value='all'>all</option>
              {this.getOptions(typeGroup)}
            </Select>
          )}

          {type && type !== "all" && (
            <Select title={"Type of " + type} name={"subtype"} onChange={this.change} value={subtype}>
              <option value='all'>all</option>
              {this.getOptions(subGroups)}
            </Select>
          )}

          <Button id={"generateItem"} className={"buildButton"} onClick={this.initItemGen}>
            build an item
          </Button>
        </Aside>

        {item && (
          <Display>
            <h2 className='displayLayout__name'>
              {item.primaryMaterial} {item.subtype}
            </h2>
            <p className='displayLayout__description'>{item.description}</p>

            {item.fiveEStats && (
              <section className='statsShell'>
                <div className='statBlock'>
                  <div className='grouping'>
                    <p>
                      <span className='info__label'>Type: </span> <span className='info__value'>{item.fiveEStats.type}</span>
                    </p>
                    <p>
                      <span className='info__label'>Value: </span> <span className='info__value'>{item.fiveEStats.value} gp</span>
                    </p>
                    {item.fiveEStats.damage && (
                      <p>
                        <span className='info__label'>Damage: </span>
                        <span className='info__value'>
                          {item.fiveEStats.damage} {item.fiveEStats.damage_type.join(" / ")}
                        </span>
                      </p>
                    )}
                    {item.type.includes("armor") && item.fiveEStats.armor_class && (
                      <p>
                        <span className='info__label'>AC: </span> <span className='info__value'>{item.fiveEStats.armor_class}</span>
                      </p>
                    )}
                    {item.fiveEStats.properties && item.fiveEStats.properties.length > 0 && (
                      <p>
                        <span className='info__label'>Properties: </span> {item.fiveEStats.properties.join(", ")}
                      </p>
                    )}
                    <p>
                      <span className='classification'>Weight: </span> <span className='info__value'>{item.fiveEStats.weight} lbs</span>
                    </p>
                  </div>
                </div>
              </section>
            )}
          </Display>
        )}
      </main>
    );
  }
}
