import Item from "../items/item";
import Person from "../person/person";
import Utils from "../../components/utils";
import merchantsObj from "../../data/merchants/merchants";
import tavernsObj from "../../data/merchants/taverns";

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
    this.shopDescriptor = this.getShopDescriptor(this.shopType);
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

  getShopDescriptor(type) {
    return allShops[type].descriptor || null;
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
    let nameStyle = ["ownerNamed", "dual"][Utils.randomInt(0, 3)];

    const owner = staff[0];
    const hasSurname = !!owner.name.surname;
    const nameArray = hasSurname ? [owner.name.name, owner.name.surname] : [owner.name.name];
    const finalName = nameArray[Utils.randomArrayIndex(nameArray)];
    const name = /s$/.test(finalName.trim()) ? finalName + "'" : finalName + "'s";

    const adjective = getAdjective();
    const noun = getNoun();

    switch (nameStyle) {
      case "ownerNamed":
        let title = allShops[shopType].title;
        title = title[Utils.randomArrayIndex(title)];

        return `${name} ${title}`;
      case "dual":
        const nounOne = getNoun();
        const nounTwo = getNoun(nounOne);

        return `The ${nounOne} & ${nounTwo}`;
      default:
        return `The ${adjective} ${noun}`;
    }

    function getNoun(exclude) {
      const allNouns = allShops[shopType].noun;
      let noun = allNouns[Utils.randomArrayIndex(allNouns)];

      if (noun === exclude) return getNoun(exclude);
      return noun;
    }

    function getAdjective(exclude) {
      const allAdjectives = allShops[shopType].adjective;
      const adjective = allAdjectives[Utils.randomArrayIndex(allAdjectives)];

      if (adjective === exclude) return getAdjective(exclude);
      return adjective;
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
      return 1;
    });

    return {
      gpValue: Math.round(currentGpValue),
      items: items,
    };
  }
}
