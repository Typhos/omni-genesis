import Item from "../items/item";
import Utils from "../../components/utils";
import itemTables from "./magicItems.json";
import treasureTables from "./treasure.json";

const generateTreasure = (params = {}) => {
  const { table, guaranteedTreasure, itemsRoll } = params;
  const { avgValue } = treasureTables[table];
  const treasure = new Treasure(params);
  // const minValuePercentage = 0.66;
  // const maxValuePercentage = 1.33;

  if (!guaranteedTreasure) return treasure;

  if (treasure.treasureArray.length > 0) {
    return treasure;
  }

  return generateTreasure(params);
};

class Treasure {
  constructor(params = {}) {
    const { table, itemsRoll } = params;
    const { avgValue } = treasureTables[table];

    console.log(new MagicItem({ type: "Sentient Sword" }));

    this.total = 0;
    this.gemValue = 0;
    this.jewelleryValue = 0;
    this.jewellery = [];
    this.gems = [];
    this.magicItems = [];

    this.treasureArray = this.generateTreasure(table, itemsRoll);
    this.total = Math.round(this.total);
    this.abnormallyLargeValue = this.checkValue(avgValue);
  }

  generateTreasure(table, itemsRoll) {
    const rollTable = treasureTables[table];

    const output = rollTable.rollArray
      .map((entry) => {
        let { percentage, diceNum, diceType, amount, itemType } = entry;

        // only create treasure when rolling under the % chance
        if (Utils.randomInt(1, 100) > percentage) return undefined;

        if (itemType.includes("magic item")) {
          this.getMagicItems(diceNum || 1);
        }

        if (itemType.includes("plus 1 potion")) {
          this.magicItems.push(new MagicItem({ type: "Potion" }));
        }

        if (itemType.includes("plus 1 scroll")) {
          this.magicItems.push(new MagicItem({ type: "Scroll or Map" }));
        }

        // If no roll is made, return the amount and type of treasure
        if (!diceType) {
          return `${diceNum} ${itemType}`;
        }

        const rollTotal = this.rollDice(diceNum, diceType);

        if (amount >= 100) {
          // for more realistic coin values (not just 1000, 2000, etc) make a deviation of +-0.15
          const deviateTotal = Math.ceil(amount * (Utils.randomInt(850, 1150) / 1000));
          const value = rollTotal * deviateTotal;
          this.updateTotalValue(value, itemType);
          return `${Utils.numberWithCommas(value)} ${itemType}`;
        }

        if (itemType.includes("jewel")) {
          if (!amount) amount = 1;
          this.getJewelleryValue(rollTotal * amount);
          return `${rollTotal * amount} ${itemType}`;
        }

        if (itemType.includes("gem")) {
          if (!amount) amount = 1;
          this.getGemValue(rollTotal * amount);
          return `${rollTotal} ${itemType}`;
        }

        if (!amount) amount = 1;
        const value = rollTotal * amount;
        this.updateTotalValue(value, itemType);
        return `${value} ${itemType}`;
      })
      .filter((e) => e !== undefined);

    return output;
  }

  checkValue(avgValue) {
    // a generated treasure is considered unusually large if it over 50% above the avergage expected value.
    return this.total > avgValue * 1.5 ? true : false;
  }

  rollDice(num, die) {
    const arr = new Array(num).fill(undefined);
    let filledArr = arr.map(() => Utils.randomInt(1, die));

    return filledArr.reduce((total, num) => num + total);
  }

  getJewelleryValue(num = 1) {
    const arr = Array(num).fill(undefined);
    arr.forEach(() => {
      const value = this.rollDice(3, 6) * 100;
      this.jewelleryValue += value;
      this.updateTotalValue(value);
      this.jewellery.push(`${Utils.numberWithCommas(value)} gp`);
    });
  }

  getGemValue(num = 1) {
    const arr = Array(num).fill(undefined);
    arr.forEach(() => {
      const roll = this.rollDice(1, 20);
      let value = 0;

      if (roll <= 4) {
        value = 10;
      } else if (roll >= 5 && roll <= 9) {
        value = 50;
      } else if (roll >= 10 && roll <= 15) {
        value = 100;
      } else if (roll >= 16 && roll <= 19) {
        value = 500;
      } else if (roll === 20) {
        value = 1000;
      }

      this.gemValue += value;
      this.updateTotalValue(value);

      this.gems.push(`${Utils.numberWithCommas(value)} gp`);
    });
  }

  getMagicItems(num = 1, itemsRoll) {
    for (let i = 1; i <= num; i++) {
      const item = new MagicItem();
      this.magicItems.push(item);
    }
  }

  updateTotalValue(value = 0, type = "gp") {
    switch (type) {
      case "cp":
        this.total += Math.round((value / 100) * 1e3) / 1e3;
        break;
      case "sp":
        this.total += Math.round((value / 10) * 1e2) / 1e2;
        break;
      case "ep":
        this.total += value * 2;
        break;
      case "pp":
        this.total += value * 5;
        break;
      default:
        this.total += value;
        break;
    }
  }
}

// MAGIC ITEM GENERATION

class MagicItem {
  constructor(params = {}) {
    const { type } = params;
    const { itemGroups } = itemTables;

    this.details = "";
    this.itemType = type || this.generateOddsArray(itemGroups);
    this.itemName = this.getItem();
  }

  generateOddsArray(inputObject) {
    const array = [];
    for (const [key, value] of Object.entries(inputObject)) {
      const { odds } = value;
      const classCount = new Array(odds).fill(key);
      array.push(...classCount);
    }

    return array[Utils.randomArrayIndex(array)];
  }

  getItem() {
    const { itemType } = this;

    switch (itemType) {
      case "Armor or Shield":
        return this.getArmor();
      case "Potion":
        return this.getPotion();
      case "Ring":
        return this.getRing();
      case "Scroll or Map":
        return this.getScroll();
      case "Sword":
        return this.getSword();
      case "Sentient Sword":
        return this.getSword(true);
      // no default
    }
  }

  getArmor() {
    const { itemGroups } = itemTables;
    const { itemsList } = itemGroups[this.itemType];
    return this.generateOddsArray(itemsList);
  }

  getPotion() {
    const { itemGroups } = itemTables;
    const { itemsList } = itemGroups[this.itemType];
    return `Potion of ${this.generateOddsArray(itemsList)}`;
  }

  getRing() {
    const { itemGroups } = itemTables;
    const { itemsList } = itemGroups[this.itemType];
    return `Ring of ${this.generateOddsArray(itemsList)}`;
  }

  getScroll(itemType = this.itemType) {
    const { itemGroups } = itemTables;
    const { itemsList } = itemGroups[itemType];
    const scrollName = this.generateOddsArray(itemsList);
    let spellArray = [];

    if (itemsList[scrollName].spellCount) {
      const spellType = Utils.randomInt(1, 4) === 1 ? "Divine" : "Arcane";
      for (let i = 1; i <= itemsList[scrollName].spellCount; i++) {
        spellArray.push(this.getSpell(spellType));
      }

      return `Spell Scroll (${itemsList[scrollName].spellCount}): ${spellArray.sort().join(", ")}`;
    }

    return scrollName.includes("Treasure") ? scrollName : `Scroll of ${scrollName}`;
  }

  getSpell(spellType) {
    const { scrollSpellLevels } = itemTables;
    const spellLevel = this.generateOddsArray(scrollSpellLevels[spellType]);

    return `${spellType} ${spellLevel}-Level`;
  }

  getSword(forceSentientSword = false) {
    if (forceSentientSword || Utils.randomInt(1, 10) <= 3) {
      this.itemType = "Sword";
      return this.getSentientSword();
    }

    const { itemGroups } = itemTables;
    const { itemsList } = itemGroups[this.itemType];
    const sword = this.generateOddsArray(itemsList);

    return sword;
  }

  getSentientSword() {
    const intelligence = 6 + Utils.randomInt(1, 6);
    const alignment = this.getSwordAlignment();
    const ego = Utils.randomInt(1, 12);
    let languages = null;

    // swords with Int 10 or higher speaks a number of randomly rolled languages
    if (intelligence >= 10) {
      languages = `${intelligence >= 11 ? "Reads/" : ""}${
        intelligence >= 10 ? "Speaks" : ""
      } ${this.getSwordLanguages(alignment)},`;
    }

    this.details = `(${alignment}, Int ${intelligence}, ${languages ? languages : ""} Ego ${ego})`;

    return `Sentient Sword`;
  }

  getSwordAlignment = () => {
    let alignmentRoll = Utils.randomInt(1, 20);

    if (alignmentRoll <= 13) {
      return "Lawful";
    } else if (alignmentRoll <= 18) {
      return "Neutral";
    } else {
      return "Chaotic";
    }
  };

  getSwordLanguages = (alignment) => {
    const { sentientSwords } = itemTables;
    const { languages } = sentientSwords;

    const languagesArray = [];
    for (const [key, value] of Object.entries(languages)) {
      const { odds } = value;
      const classCount = new Array(odds).fill(key);
      languagesArray.push(...classCount);
    }

    const roll = languagesArray[Utils.randomArrayIndex(languagesArray)];

    if (roll === "twice") {
      const lanagesWithoutReroll = languagesArray.slice();
      lanagesWithoutReroll.pop();

      const roll1 = lanagesWithoutReroll[Utils.randomArrayIndex(lanagesWithoutReroll)];
      const roll2 = lanagesWithoutReroll[Utils.randomArrayIndex(lanagesWithoutReroll)];
      return `${alignment} + ${Number(roll1) + Number(roll2)} languages`;
    }

    return `${alignment} + ${roll} language(s)`;
  };
}

export { generateTreasure, Treasure, MagicItem };
