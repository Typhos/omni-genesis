import Utils from "../../components/utils";
import gemstones from "../../data/treasure/gemstones.json";

export class Gemstone {
  constructor(params = {}) {
    const { group = null } = params;

    this.group = group || this.getRandomGemstoneType();
    this.value = this.rollGemstoneValue();
    this.description = this.getGemStoneDescription();
    this.count = 1;
  }

  getRandomGemstoneType() {
    const roll = Utils.rollDice(1, 100);
    if (roll <= 45) {
      return "Ornamental";
    } else if (roll >= 95) {
      return "Brilliant";
    } else {
      return "Gem";
    }
  }

  rollGemstoneValue() {
    const getRandomizedValue = () => {
      if (this.group === "Ornamental") {
        return Utils.rollDice(2, 20);
      } else if (this.group === "Brilliant") {
        return Utils.rollDice(1, 100, 80);
      } else {
        return Utils.rollDice(1, 100);
      }
    };

    const randomValue = getRandomizedValue();

    if (randomValue <= 10) {
      return 10;
    } else if (randomValue >= 11 && randomValue <= 25) {
      return 25;
    } else if (randomValue >= 26 && randomValue <= 40) {
      return 50;
    } else if (randomValue >= 41 && randomValue <= 55) {
      return 75;
    } else if (randomValue >= 56 && randomValue <= 70) {
      return 100;
    } else if (randomValue >= 71 && randomValue <= 80) {
      return 250;
    } else if (randomValue >= 81 && randomValue <= 90) {
      return 500;
    } else if (randomValue >= 91 && randomValue <= 95) {
      return 750;
    } else if (randomValue >= 96) {
      return 1000;
    }
  }

  getGemStoneDescription() {
    const gemstoneArray = gemstones[this.value];
    return gemstoneArray[Utils.randomArrayIndex(gemstoneArray)];
  }
}
