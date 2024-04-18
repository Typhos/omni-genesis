import { Gemstone } from "./gemstones";
import Item from "../items/item";
import MagicItem from "../magicItem";
import Utils from "../../components/utils";
import treasureTables from "../../data/treasure/treasure.json";

const generateTreasure = (params = {}) => {
  const { guaranteedTreasure, table } = params;
  const treasure = new Treasure(params);

  if (!guaranteedTreasure && table !== "Jewelry") return treasure;

  if (treasure.treasureArray.length > 0) {
    return treasure;
  }

  return generateTreasure(params);
};

class Treasure {
  constructor(params = {}) {
    const { table, itemCount, generateSpecialTreasures } = params;
    const { avgValue } = treasureTables[table];

    this.treasureTable = table;
    this.total = 0;
    this.gemValue = 0;
    this.JewelryValue = 0;
    this.specialValue = 0;
    this.Jewelry = [];
    this.gems = [];
    this.magicItems = [];
    this.specialTreasures = [];

    this.treasureArray = this.generateTreasureTable(table, itemCount, generateSpecialTreasures);
    if (this.specialTreasures.length) {
      this.treasureArray.push(`${this.specialTreasures.length} special treasure(s)`);
      this.specialTreasures.forEach((t) => {
        const val = Math.ceil(t.value);
        this.total += val;
        this.specialValue += val;
      });
    }

    this.total = Math.round(this.total);
    this.abnormallyLargeValue = this.checkValue(avgValue);
  }

  generateTreasureTable(table, itemCount, generateSpecialTreasures) {
    const rollTable = treasureTables[table];

    const output = rollTable.rollArray
      .map((entry) => {
        let { percentage, diceNum, diceType, amount, itemType } = entry;
        if (!amount) amount = diceNum;

        // only create treasure when rolling under the % chance
        if (Utils.randomInt(1, 100) > percentage) return undefined;

        if (table === "onlyMagicItems") {
          for (let i = 1; i <= itemCount; i++) {
            const generateGeneric = Utils.randomInt(1, 100) <= 33;
            const item = new MagicItem({ knaveProperties: generateGeneric });
            this.magicItems.push(item);
          }
          return `${itemCount} magic items`;
        }

        if (itemType.includes("magic item")) {
          if (itemType.includes("not weapons")) {
            this.getMagicItems(diceNum || 1, "no weapons");
          } else {
            this.getMagicItems(diceNum || 1);
          }
        }

        if (itemType.includes("plus 1 potion")) {
          this.magicItems.push(new MagicItem({ type: "Potion" }));
        }

        if (itemType.includes("plus 1 scroll")) {
          this.magicItems.push(new MagicItem({ type: "Scroll or Map" }));
        }

        if (itemType.includes("magic sword, suit of armor, or weapon")) {
          const itemRoll = Utils.rollDice(1, 3);
          if (itemRoll === 1) {
            this.magicItems.push(new MagicItem({ type: "Sword" }));
          } else if (itemRoll === 2) {
            this.magicItems.push(new MagicItem({ type: "Armor or Shield" }));
          } else {
            this.magicItems.push(new MagicItem({ type: "Weapon" }));
          }
          return `${amount} ${itemType}`;
        }

        if (itemType.includes("potion(s)")) {
          const roll = Utils.rollDice(diceNum, diceType);
          for (let i = 1; i <= roll; i++) {
            const potion = new MagicItem({ type: "Potion" });
            this.magicItems.push(potion);
          }

          return `${roll} ${itemType}`;
        }

        if (itemType.includes("scroll(s)")) {
          const roll = Utils.rollDice(diceNum, diceType);
          for (let i = 1; i <= roll; i++) {
            const scroll = new MagicItem({ type: "Scroll or Map" });
            this.magicItems.push(scroll);
          }

          return `${roll} ${itemType}`;
        }

        const rollTotal = Utils.rollDice(diceNum, diceType);

        if (amount >= 100) {
          // for more realistic coin values (not just 1000, 2000, etc) make a deviation of +-0.15
          const deviateTotal = Math.ceil(amount * (Utils.randomInt(850, 1150) / 1000));
          let value = rollTotal * deviateTotal;
          this.updateTotalValue(value, itemType);

          if (generateSpecialTreasures) {
            value = this.replaceCoinWithSpecialTreasures(value, itemType);
          }

          return `${Utils.numberWithCommas(value)} ${itemType}`;
        }

        // ===== JEWELRY

        if (itemType.includes("jewel")) {
          if (itemCount) {
            amount = itemCount;
          } else if (!diceType && diceNum) {
            amount = diceNum;
          } else if (!amount) amount = 1;

          if (generateSpecialTreasures) amount = this.replaceJewelryWithSpecialTreasure(amount);
          this.getJewelryValue(rollTotal * amount);
          if (!!amount) {
            return `${rollTotal * amount} ${itemType}`;
          } else {
            return undefined;
          }
        }

        // ===== GEMSTONES

        if (itemType.includes("gem")) {
          if (!amount) amount = 1;

          if (itemCount) {
            amount = itemCount;
          } else {
            amount = rollTotal * amount;
          }

          this.getGemstones(amount, generateSpecialTreasures);

          if (!!amount) {
            return `${amount} ${itemType}`;
          } else {
            return undefined;
          }
        }

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
      const item = getItemOfSuitableValue(value);

      this.Jewelry.push({
        value: `${Utils.numberWithCommas(value)} gp`,
        item
      });
    });

    return num;

    function getItemOfSuitableValue(value) {
      const itemQuality = Math.ceil(value * 0.0055555556);

      const jewelry = new Item({
        category: "jewelry",
        noMagic: true,
        qualityRange: {
          minQuality: itemQuality,
          maxQuality: itemQuality
        }
      });

      if (jewelry.value < value * 0.66 || jewelry.value > value * 1.33) {
        return getItemOfSuitableValue(value);
      } else {
        return jewelry;
      }
    }
  }

  replaceJewelryWithSpecialTreasure(num) {
    const checks = num;
    for (let i = 1; i <= checks; i++) {
      const roll = Utils.rollDice(1, 24);
      if (roll <= 9) {
        num -= 1;

        let count = 0;
        switch (roll) {
          case 1:
            count = Utils.rollDice(2, 6);
            const glassEyeValue = 20 * Utils.rollDice(1, 6);
            this.specialTreasures.push({
              item: `${count} glass eyes, lenses, or prisms, each worth ${glassEyeValue} gp.`,
              weight: "3 coins each",
              value: count * glassEyeValue
            });
            break;
          case 2:
            count = Utils.rollDice(1, 4);
            const holySymbolValue = 20 * Utils.rollDice(2, 8);
            this.specialTreasures.push({
              item: `${count} silver holy/unholy symbols, each worth ${holySymbolValue} gp.`,
              weight: "5 coins each",
              value: count * holySymbolValue
            });
            break;
          case 3:
            count = Utils.rollDice(3, 6);
            const figurineValue = Utils.rollDice(2, 4) * 10;
            this.specialTreasures.push({
              item: `${count} bone fetishes and figurines, each worth ${figurineValue} gp.`,
              weight: "20 coins each",
              value: count * figurineValue
            });
            break;
          case 4:
            count = 100 * Utils.rollDice(3, 4);
            this.specialTreasures.push({
              item: `1 rich fur cape, worth ${count} gp.`,
              weight: "100 coins",
              value: count
            });
            break;
          case 5:
            count = Utils.rollDice(2, 6) * 100 + 400;
            this.specialTreasures.push({
              item: `1 rich fur coat, worth ${count} gp.`,
              weight: "100 coins",
              value: count
            });
            break;
          case 6:
            count = Utils.rollDice(1, 3);
            const statueValue = 100 * Utils.rollDice(1, 6);
            this.specialTreasures.push({
              item: `${count} statuette(s), worth ${Math.ceil(statueValue / count)} gp each.`,
              weight: "50 coins each",
              value: statueValue
            });
            break;
          case 7:
            count = Utils.rollDice(2, 6);
            const gamePieceValue = 10 * Utils.rollDice(3, 6);
            this.specialTreasures.push({
              item: `${count} alabaster and jet game pieces with jeweled eyes, worth ${gamePieceValue} gp each.`,
              weight: "5 coins each",
              value: count * gamePieceValue
            });
            break;
          case 8:
            count = Utils.rollDice(1, 2);
            const reliquaryValue = 50 * Utils.rollDice(3, 6);
            this.specialTreasures.push({
              item: `${count} platinum reliquaries with crystal panes, worth ${reliquaryValue} gp each.`,
              weight: "100 coins each",
              value: count * reliquaryValue
            });
            break;
          case 9:
            count = Utils.rollDice(1, 8);
            const netsukeValue = 100 * Utils.rollDice(1, 4);
            this.specialTreasures.push({
              item: `${count} carved ivory netsuke and figurines, worth ${netsukeValue} gp each.`,
              weight: "100 coins each",
              value: count * netsukeValue
            });
            break;
        }
      }
    }
    return num;
  }

  getGemstones(num = 1, generateSpecialTreasures) {
    let totalGems = num;
    for (let i = 1; i <= num; i++) {
      const gemstone = new Gemstone();
      const specialRoll = Utils.rollDice(1, 8);
      if (specialRoll <= 3 && generateSpecialTreasures) {
        totalGems -= 1;
        this.getGemReplacement(specialRoll, gemstone.group);
      } else {
        const { value } = gemstone;
        this.gems.push(gemstone);
        this.gemValue += value;
        this.updateTotalValue(value);
      }
    }

    let combinedGemstones = new Map();
    this.gems
      .sort((a, b) => {
        if (a.value > b.value) {
          return 1;
        } else if (a.value < b.value) {
          return -1;
        } else {
          return a.description.localeCompare(b.description);
        }
      })
      .forEach((gem) => {
        const { description, value, group } = gem;
        if (combinedGemstones.hasOwnProperty(description)) {
          combinedGemstones[description].count += 1;
        } else {
          combinedGemstones[description] = { count: 1, value, group };
        }
      });
    this.gems = combinedGemstones;

    return totalGems;
  }

  getGemReplacement(roll, group) {
    switch (group) {
      case "Brilliant":
        return this.replaceBrilliant(roll);
      case "Ornamental":
        return this.replaceOrnamental(roll);
      default:
        return this.replaceGem(roll);
    }
  }

  replaceOrnamental(roll) {
    let count = 0;
    switch (roll) {
      case 1:
        count = Utils.rollDice(1, 12);
        this.specialTreasures.push({
          item: `${count} silver arrows, each worth 5gp.`,
          weight: "1 coin per 2",
          value: count * 5
        });
        break;
      case 2:
        count = Utils.rollDice(1, 6);
        this.specialTreasures.push({
          item: `${count} pouches of belladonna or wolfsbane, each worth 10gp.`,
          weight: "10 coins each",
          value: count * 10
        });
        break;
      case 3:
        count = Utils.rollDice(1, 4);
        this.specialTreasures.push({
          item: `${count} pouches of saffron, each worth 15gp.`,
          weight: "10 coins each",
          value: count * 15
        });
        break;
    }
  }

  replaceGem(roll) {
    let count = 0;
    switch (roll) {
      case 1:
        count = Utils.rollDice(1, 3);
        const teethValue = 10 * Utils.rollDice(2, 6);
        this.specialTreasures.push({
          item: `${count} sets of engraved teeth, each worth ${teethValue} gp.`,
          weight: "1 coin each",
          value: count * teethValue
        });
        break;
      case 2:
        count = Utils.rollDice(1, 10);
        const incenseValue = Utils.rollDice(5, 6);
        this.specialTreasures.push({
          item: `${count} sticks of rare incense, each worth ${incenseValue} gp.`,
          weight: "1 coin each",
          value: count * incenseValue
        });
        break;
      case 3:
        count = Utils.rollDice(1, 3);
        const perfumeValue = 25 * Utils.rollDice(1, 6);
        this.specialTreasures.push({
          item: `${count} vials of rare perfume, each worth ${perfumeValue} gp per vial.`,
          weight: "1 coin each",
          value: count * perfumeValue
        });
        break;
    }
  }

  replaceBrilliant(roll) {
    let count = 0;
    switch (roll) {
      case 1:
        count = Utils.rollDice(2, 20);
        this.specialTreasures.push({
          item: `${count} jade carvings of heroes, monsters, and gods, each worth 200 gp.`,
          weight: "20 coins each",
          value: count * 200
        });
        break;
      case 2:
        count = Utils.rollDice(1, 8);
        this.specialTreasures.push({
          item: `${count} opal cameo portraits and intaglio erotic tableaux, each worth 800 gp.`,
          weight: "10 coins each",
          value: count * 800
        });
        break;
      case 3:
        count = Utils.rollDice(1, 6);
        this.specialTreasures.push({
          item: `${count} amethyst cylinder seals depicting religious scenes, each worth 1,200 gp.`,
          weight: "10 coins each",
          value: count * 1200
        });
        break;
    }
  }

  getMagicItems(num = 1, restriction) {
    for (let i = 1; i <= num; i++) {
      const item = new MagicItem({ restriction });
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

  replaceCoinWithSpecialTreasures(coinValue, coinType) {
    // for every 1000 coins of a given type, roll to see if they are replaced with more interesting goods.
    const lots = Math.floor(coinValue / 1000);
    for (let i = 1; i <= lots; i++) {
      const roll = Utils.rollDice(1, 20);
      if (roll < 9) {
        coinValue -= 1000;
        if (coinType === "cp") {
          this.getCopperTreasures(roll);
        } else if (coinType === "gp") {
          this.getGoldTreasures(roll);
        } else if (coinType === "sp") {
          this.getSilverTreasures(roll);
        } else if (coinType === "ep") {
          this.getElectrumTreasures(roll);
        } else if (coinType === "gp") {
          this.getGoldTreasures(roll);
        } else if (coinType === "pp") {
          this.getPlatinumTreasures(roll);
        }
      }
    }

    return coinValue;
  }

  getCopperTreasures(roll) {
    // 1 stone = 140 coin
    let count = 0;
    switch (roll) {
      case 1:
        const rugWeights = [];
        count = Utils.rollDice(1, 3);
        for (let i = 1; i <= count; i++) {
          rugWeights.push(`${Utils.numberWithCommas(Utils.rollDice(2, 6) * 100)} coins`);
        }
        this.specialTreasures.push({
          item: `${count} rugs or tapestries, worth 5gp each.`,
          weight: rugWeights.join(", "),
          value: count * 5
        });
        break;
      case 2:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} barrels of preserved fish, worth 5gp each.`,
          weight: "800 coins each",
          value: count * 5
        });
        break;
      case 3:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} tenths of a cord of hardwood log, worth 5gp each.`,
          weight: "800 coins each",
          value: count * 5
        });
        break;
      case 4:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} barrels of beer, worth 10gp each.`,
          weight: "800 coins each",
          value: count * 10
        });
        break;
      case 5:
        count = Utils.rollDice(2, 6);
        this.specialTreasures.push({
          item: `${count} bricks of salt, worth 7sp each.`,
          weight: "50 coins each",
          value: count * 0.7
        });
        break;
      case 6:
        count = Utils.rollDice(2, 4);
        this.specialTreasures.push({
          item: `${count} gallons of lamp oil, worth 2gp each.`,
          weight: "50 coins each",
          value: count * 2
        });
        break;
      case 7:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} rolls of cloth, worth 10gp each.`,
          weight: "400 coins each",
          value: count * 10
        });
        break;
      case 8:
        count = Utils.rollDice(3, 6);
        this.specialTreasures.push({
          item: `${count} ingots of common metals, worth 1gp each.`,
          weight: "50 coins each",
          value: count
        });
        break;
    }
  }

  getSilverTreasures(roll) {
    let count = 0;
    switch (roll) {
      case 1:
        count = Utils.rollDice(1, 100);
        this.specialTreasures.push({
          item: `${count} animal horns worth 2 gp each.`,
          weight: `${Math.ceil(count / 5) * 100} coins total`,
          value: count * 2
        });
        break;
      case 2:
        count = Utils.rollDice(2, 4);
        this.specialTreasures.push({
          item: `${count} jars of lamp oil, worth 20 gp each.`,
          weight: "600 coins per jar",
          value: count * 20
        });
        break;
      case 3:
        count = Utils.rollDice(2, 20);
        this.specialTreasures.push({
          item: `${count} bottles of fine wine, worth 5 gp each.`,
          weight: `20 coins each`,
          value: count * 5
        });
        break;
      case 4:
        count = Utils.rollDice(3, 6);
        this.specialTreasures.push({
          item: `${count} rolls of garishly dyed cloth, worth 10 gp each.`,
          weight: `400 coins each`,
          value: count * 10
        });
        break;
      case 5:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} jars of dyes and pigments, worth 50 gp each.`,
          weight: `500 coins each`,
          value: count * 50
        });
        break;
      case 6:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} crates of terra-cotta pottery, worth 100 gp each.`,
          weight: "500 coins each",
          value: count * 100
        });
        break;
      case 7:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} bags of loose tea, worth 75 gp each.`,
          weight: `500 coins each`,
          value: count * 75
        });
        break;
      case 8:
        count = Utils.rollDice(2, 6);
        this.specialTreasures.push({
          item: `${count} bundles of fur pelts (such as bear, beaver, or fox), worth 15 gp each.`,
          weight: "300 coins per bundle",
          value: count * 15
        });
        break;
    }
  }

  getElectrumTreasures(roll) {
    roll = Math.ceil(roll / 2);
    let count = 0;
    switch (roll) {
      case 1:
        count = Utils.rollDice(1, 4);
        this.specialTreasures.push({
          item: `${count} barrels of fine spirits or liquor, worth 200 gp each.`,
          weight: `1600 coins each`,
          value: count * 200
        });
        break;
      case 2:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} crates of armor and weapons, worth 225 gp each`,
          weight: "1000 coins each",
          value: count * 225
        });
        break;
      case 3:
        count = Utils.rollDice(1, 4);
        this.specialTreasures.push({
          item: `${count} crates of glassware, worth 200 gp each.`,
          weight: `500 coins each`,
          value: count * 200
        });
        break;
      case 4:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} crates of monster parts, worth 300 gp each.`,
          weight: `500 coins each`,
          value: count * 300
        });
        break;
    }
  }

  getGoldTreasures(roll) {
    // 1 stone = 140 coin
    let count = 0;
    switch (roll) {
      case 1:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} bundles of rare fur pelts (such as ermine, mink, or sable), worth 500 gp each.`,
          weight: "700 coins each",
          value: count * 500
        });
        break;
      case 2:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} jars of spices, worth 800 gp each.`,
          weight: "140 coins each",
          value: count * 800
        });
        break;
      case 3:
        count = Utils.rollDice(1, 10) * 50;
        const featherValue = Utils.rollDice(1, 6);
        this.specialTreasures.push({
          item: `${Utils.numberWithCommas(count)} monster feathers, worth ${Utils.numberWithCommas(
            featherValue
          )} gp per feather. ${count * featherValue} gp total.`,
          weight: `${(count / 25) * 140} coins`,
          value: count * featherValue
        });
        break;
      case 4:
        count = Utils.rollDice(1, 100);
        const hornHD = Utils.rollDice(1, 10);
        const hornVal = Utils.rollDice(1, 4, hornHD);
        const hornTotal = hornHD * hornVal;
        this.specialTreasures.push({
          item: `${count} monster horns worth, ${hornTotal} gp each. ${Utils.numberWithCommas(
            count * hornTotal
          )} gp in total.`,
          weight: `${Utils.numberWithCommas(140 * (hornHD / 20))} coins`,
          value: count * hornTotal
        });
        break;
      case 5:
        count = Utils.rollDice(1, 6);
        const carcassHD = Utils.rollDice(1, 10);
        const carcassVal = Utils.rollDice(1, 10) * (carcassHD * 10);
        const carcassTotal = carcassHD * carcassVal;
        this.specialTreasures.push({
          item: `${count} monster carcasses, worth ${carcassTotal} gp each. ${Utils.numberWithCommas(
            count * carcassTotal
          )} gp in total.`,
          weight: `${Utils.numberWithCommas(carcassHD * 140)} coins each`,
          value: count * carcassTotal
        });
        break;
      case 6:
        count = Utils.rollDice(1, 4);
        this.specialTreasures.push({
          item: `${count} crates of fine porcelain, worth 500 gp each.`,
          weight: "280 coins each",
          value: count * 500
        });
        break;
      case 7:
        count = Utils.rollDice(2, 20);
        const ivoryValue = Utils.rollDice(1, 100);
        const ivoryTotal = count * ivoryValue;
        this.specialTreasures.push({
          item: `${count} pieces of ivory, worth ${ivoryValue} gp per piece. ${Utils.numberWithCommas(
            ivoryTotal
          )} gp in total.`,
          weight: `${(ivoryTotal / 100) * 140} coins`,
          value: ivoryTotal
        });
        break;
      case 8:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} rolls of silk, worth 400 gp each`,
          weight: "560 coins each",
          value: count * 400
        });
        break;
    }
  }

  getPlatinumTreasures(roll) {
    roll = Math.ceil(roll / 2);
    let count = 0;
    /*eslint default-case: 0*/
    switch (roll) {
      case 1:
        count = Utils.rollDice(5, 10);
        this.specialTreasures.push({
          item: `${count} rare books, worth 150 gp each.`,
          weight: `50 coins each`,
          value: count * 150
        });
        break;
      case 2:
        count = Utils.rollDice(1, 3);
        this.specialTreasures.push({
          item: `${count} ornamental jars of rare spices, worth 2,500 gp each.`,
          weight: "400 coins each",
          value: count * 2500
        });
        break;
      case 3:
        count = Utils.rollDice(5, 20);
        this.specialTreasures.push({
          item: `${count} typical fur capes, worth 100 gp each.`,
          weight: `100 coins each`,
          value: count * 100
        });
        break;
      case 4:
        count = Utils.rollDice(4, 8);
        this.specialTreasures.push({
          item: `${count} ingots of precious metals, worth 300 gp each`,
          weight: `200 coins each`,
          value: count * 300
        });
        break;
    }
  }
}

export { generateTreasure, Treasure };
