import Utils from "../../components/utils";
import swordData from "../../data/swords/swords.json";

export default class SwordDescription {
  constructor(params = {}) {
    const { type } = params;
    const {
      condition,
      material,
      polish,
      feel,
      edge,
      bladeWidth,
      bladeFlat,
      tip,
      handle,
      guard,
      pommel,
      doubleEdgeShapes,
      singleEdgeShapes,
    } = swordData;

    this.type = type === "random" ? this.getSwordType() : swordData.type[type].name;
    this.condition = this.getStandardInfo(condition);
    this.material = this.getStandardInfo(material);
    this.polish = this.getStandardInfo(polish);
    this.feel = this.getStandardInfo(feel);
    this.edge = this.getStandardInfo(edge);
    this.bladeWidth = this.getStandardInfo(bladeWidth);
    this.bladeFlat = this.getStandardInfo(bladeFlat);
    this.tip = this.getStandardInfo(tip);
    this.handle = this.getStandardInfo(handle);
    this.guard = this.getStandardInfo(guard);
    this.pommel = this.getStandardInfo(pommel);
    this.bladeType =
      this.edge.name === "Single" || this.edge.name === "Toothed"
        ? this.getStandardInfo(singleEdgeShapes)
        : this.getStandardInfo(doubleEdgeShapes);
  }

  arrayFromOdds(dataset) {
    let array = [];

    for (let [key, entryData] of Object.entries(dataset)) {
      const entryArray = new Array(entryData.odds).fill(key);
      array = array.concat(entryArray);
    }

    return array;
  }

  getSwordType() {
    const { type } = swordData;
    const optionsArray = this.arrayFromOdds(type);
    return type[optionsArray[Utils.randomArrayIndex(optionsArray)]].name;
  }

  getCondition() {
    const { condition } = swordData;
    const optionsArray = this.arrayFromOdds(condition);
    const selection = optionsArray[Utils.randomArrayIndex(optionsArray)];

    const { name, description } = condition[selection];

    return {
      name,
      description,
    };
  }

  getStandardInfo(entry) {
    const optionsArray = this.arrayFromOdds(entry);
    const selection = optionsArray[Utils.randomArrayIndex(optionsArray)];

    const { name, description } = entry[selection];

    return {
      name,
      description,
    };
  }
}
