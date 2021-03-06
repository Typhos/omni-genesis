import Utils from "../../utils";
import Person from "../generators/person/person";

import merchantsObj from "../../../data/merchants/merchants";
import tavernsObj from "../../../data/merchants/taverns";

const allShops = { ...merchantsObj, ...tavernsObj };

export default class Merchant {
  constructor(options = {}) {
    if (options.seed) {
      global.seed = options.seed;
    } else if (global.seed === undefined) {
      Utils.setNewSeed();
    }

    this.seed = global.seed;
    this.shopType = options.type || this.getShopType();
    this.owner = this.getOwner(options);
    this.name = this.getName();
    this.size = this.getSize(options);
    this.atmosphere = this.getAtmosphere(options);
  }

  getShopType() {
    let type = [];
    for (let [key, info] of Object.entries(allShops)) {
      if (info.itemList !== undefined) type.push(key);
    }

    type = type[Utils.randomArrayIndex(type)];

    return type;
  }

  getOwner(options) {
    return new Person({
      race: options.owner,
      jobGroup: "merchant",
      occupation: allShops[this.shopType].owner,
    });
  }

  getName() {
    let nameStyle = ["ownerNamed"][Utils.randomInt(0, 2)];

    if (nameStyle === "ownerNamed") {
      let name = this.owner.name.surname ? this.owner.name.surname : this.owner.name.name;

      name = /s$/.test(name.trim()) ? (name = name + "'") : name + "'s";

      let title = allShops[this.shopType].title;
      title = title[Utils.randomArrayIndex(title)];

      return `${name} ${title}`;
    } else {
      let adjective = allShops[this.shopType].adjective;
      adjective = adjective[Utils.randomArrayIndex(adjective)];

      let noun = allShops[this.shopType].noun;
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
}
