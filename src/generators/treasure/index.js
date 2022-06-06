import MagicItem from "../magicItem";
import Utils from "../../components/utils";
import treasureTables from "../../data/treasure/treasure.json";

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

    this.treasureTable = table;
    this.total = 0;
    this.gemValue = 0;
    this.JewelryValue = 0;
    this.Jewelry = [];
    this.gems = [];
    this.magicItems = [];

    this.treasureArray = this.generateTreasure(table, itemsRoll);
    this.total = Math.round(this.total);
    this.abnormallyLargeValue = this.checkValue(avgValue);

    this.gems = Utils.combineDuplicateArrayElements(this.gems.sort());
    this.Jewelry = Utils.combineDuplicateArrayElements(this.Jewelry.sort());
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

        const rollTotal = Utils.rollDice(diceNum, diceType);

        if (amount >= 100) {
          // for more realistic coin values (not just 1000, 2000, etc) make a deviation of +-0.15
          const deviateTotal = Math.ceil(amount * (Utils.randomInt(850, 1150) / 1000));
          const value = rollTotal * deviateTotal;
          this.updateTotalValue(value, itemType);
          return `${Utils.numberWithCommas(value)} ${itemType}`;
        }

        if (itemType.includes("jewel")) {
          if (!amount) amount = 1;
          this.getJewelryValue(rollTotal * amount);
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

  getJewelryValue(num = 1) {
    const arr = Array(num).fill(undefined);
    arr.forEach(() => {
      const value = Utils.rollDice(3, 6) * 100;
      this.JewelryValue += value;
      this.updateTotalValue(value);
      this.Jewelry.push(`${Utils.numberWithCommas(value)} gp`);
    });
  }

  getGemValue(num = 1) {
    const arr = Array(num).fill(undefined);
    arr.forEach(() => {
      const roll = Utils.rollDice(1, 20);
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

export { generateTreasure, Treasure };
