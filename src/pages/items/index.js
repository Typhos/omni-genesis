import React, { Component } from "react";

// Custom Components
import Utils from "../../components/utils";
import Aside from "../../components/aside";
import Display from "../../components/display/display";
import Item from "../../generators/items/item";
import Button from "../../components/controls/button/buttonStandard";
import Select from "../../components/controls/select/selectStandard";
import Switch from "../../components/controls/switch";

// DATA
import Armor from "../../data/items/armor";
import Items from "../../data/items/items";
import Jewelry from "../../data/items/jewelry";
import Weapons from "../../data/items/weapons";

import Races from "../../data/races/allRaces";

export default class ItemGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: undefined,
      type: undefined,
      subtype: undefined,
      forceMagicItem: false,
      crafterRace: undefined,
      category: "all",
    };

    this.change = this.change.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
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

  updateCheckbox(e) {
    let name = e.target.name;
    let val = e.target.checked;

    this.setState({
      [name]: val,
    });
  }

  initItemGen() {
    const { category, type, subtype, forceMagicItem, crafterRace } = this.state;
    const generatedItem = new Item({
      category,
      type,
      subtype,
      forceMagicItem,
      crafterRace,
    });

    this.runTest(10000);

    this.setState({ item: generatedItem });
  }

  runTest(count) {
    for (let i = 1; i < count; i++) {
      new Item();
    }
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
    const { item, category, type, subtype, forceMagicItem, crafterRace } = this.state;
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
            <Select title={"Type of " + type} name='subtype' onChange={this.change} value={subtype}>
              <option value='all'>all</option>
              {this.getOptions(subGroups)}
            </Select>
          )}

          <Select
            title={"Crafter Race"}
            name='crafterRace'
            onChange={this.change}
            value={crafterRace}
          >
            <option value='all'>all</option>
            {this.getOptions(Races)}
          </Select>

          <Switch
            title='Only Magic Items'
            name='forceMagicItem'
            onChange={this.updateCheckbox}
            value={forceMagicItem}
          />

          <Button id={"generateItem"} className={"buildButton"} onClick={this.initItemGen}>
            build an item
          </Button>
        </Aside>

        {item && (
          <Display>
            <h2 className='displayLayout__name'>{item.displayName}</h2>
            {item.uniqueName && !item.isMagical && (
              <h3 className='displayLayout__subName'>{item.descriptiveName}</h3>
            )}
            {item.isMagical && (
              <h3 className='displayLayout__subName'>
                {item.descriptiveName} ({item.magicTier})
              </h3>
            )}
            <p className='displayLayout__description'>{item.description}</p>
            <p className='displayLayout__description'>
              {item.engraving} {item.carving}
            </p>
            <p className='displayLayout__description'>
              {item.crafter} {item.enchanter}
            </p>

            {item.fiveEStats && (
              <section className='statsShell'>
                <div className='statBlock'>
                  <div className='grouping'>
                    <p>
                      <span className='info__label'>Type: </span>{" "}
                      <span className='info__value'>{item.fiveEStats.type}</span>
                    </p>
                    <p>
                      <span className='info__label'>Value: </span>{" "}
                      <span className='info__value'>{Utils.numberWithCommas(item.value)} gp</span>
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
                        <span className='info__label'>AC: </span>{" "}
                        <span className='info__value'>{item.fiveEStats.armor_class}</span>
                      </p>
                    )}
                    {item.fiveEStats.properties && item.fiveEStats.properties.length > 0 && (
                      <p>
                        <span className='info__label'>Properties: </span>{" "}
                        {item.fiveEStats.properties.join(", ")}
                      </p>
                    )}
                    <p>
                      <span className='classification'>Weight: </span>{" "}
                      <span className='info__value'>{item.fiveEStats.weight} lbs</span>
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
