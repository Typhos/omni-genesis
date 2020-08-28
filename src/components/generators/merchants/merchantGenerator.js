import Utils from "../../utils";
import Person from "../person/person";

import merchantsObj from "../../../data/merchants/merchants";
import tavernsObj from "../../../data/merchants/taverns";
import Item from "../items/item";

const allShops = { ...merchantsObj, ...tavernsObj };

export default class Merchant {
  constructor(params = {}) {
    let { seed, type, culture, batchMode } = params;

    if (params.seed) {
      global.seed = seed;
    } else if (global.seed === undefined) {
      Utils.setNewSeed();
    }

    this.seed = global.seed;
    this.shopType = type || this.getShopType();
    this.culture = culture || "";
    this.staff = this.getStaff(params);
    this.name = this.getName();
    this.size = this.getSize(params);
    this.atmosphere = this.getAtmosphere(params);

    // TEMPORARY
    if (this.shopType === "tavern" || this.shopType === "inn") batchMode = true;

    if (!batchMode) {
      this.inventory = this.getInventory();
    }
  }

  getShopType() {
    let type = [];
    for (let [key, info] of Object.entries(allShops)) {
      if (info.itemList !== undefined) type.push(key);
    }

    type = type[Utils.randomArrayIndex(type)];

    return type;
  }

  getStaff(params) {
    const { culture } = params;
    const { shopType } = this;

    const owner = new Person({
      jobGroup: "merchant",
      culture: culture,
      occupation: allShops[shopType].owner,
    });

    return [owner];
  }

  getName() {
    const { staff, shopType } = this;
    let nameStyle = ["ownerNamed"][Utils.randomInt(0, 2)];

    if (nameStyle === "ownerNamed") {
      let name = staff[0].name.surname ? staff[0].name.surname : staff[0].name.name;

      name = /s$/.test(name.trim()) ? (name = name + "'") : name + "'s";

      let title = allShops[shopType].title;
      title = title[Utils.randomArrayIndex(title)];

      return `${name} ${title}`;
    } else {
      let adjective = allShops[shopType].adjective;
      adjective = adjective[Utils.randomArrayIndex(adjective)];

      let noun = allShops[shopType].noun;
      noun = noun[Utils.randomArrayIndex(noun)];

      return `the ${adjective} ${noun}`;
    }
  }

  getSize(options) {
    let size = allShops[this.shopType].size || ["cramped", "roomy", "spacious"];
    if (!Array.isArray(size)) {
      size = Object.keys(size);
    }

    return size[Utils.randomArrayIndex(size)];
  }

  getAtmosphere(options) {
    let atmosphere = allShops[this.shopType].atmosphere || [
      "dirty",
      "colorful",
      "beautiful",
      "opulent",
      "dingy",
    ];
    if (!Array.isArray(atmosphere)) {
      atmosphere = Object.keys(atmosphere);
    }

    return atmosphere[Utils.randomArrayIndex(atmosphere)];
  }

  getInventory() {
    let { default_inventory_value, itemList } = allShops[this.shopType];
    let targetShopValue = Utils.randomInt(default_inventory_value / 2, default_inventory_value * 2);
    let currentGpValue = 0;
    let items = [];

    while (currentGpValue < targetShopValue) {
      const randomType = itemList[Utils.randomArrayIndex(itemList)];
      const newItem = new Item({
        category: randomType.category,
        type: randomType.type,
      });

      currentGpValue += newItem.fiveEStats.value || 10;
      items.push(newItem);
    }

    items = items.sort((a, b) => {
      if (b.subtype > a.subtype) return -1;
    });

    return {
      gpValue: Math.round(currentGpValue),
      items: items,
    };
  }
}
