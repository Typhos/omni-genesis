export default class Utils {
  static setNewSeed(num) {
    if (!num) num = this.genRandomSeedValue();
    global.seed = num;
  }

  static genRandomSeedValue() {
    return Math.abs(
      Math.floor(
        Math.sin(Math.random() * 9301) * 10000 * (Math.sin(Math.random() * 49297) * 100001)
      )
    );
  }

  static coinFlip() {
    return Math.random() >= 0.5;
  }

  static numberInRange(numberInQuestion, min, max) {
    // returns true or false
    return numberInQuestion >= min && numberInQuestion <= max;
  }

  static randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    global.seed = (global.seed * 9301 + 49297) % 233280;
    const rnd = global.seed / 233280;

    return Math.floor(Math.abs(min + Math.floor(rnd * (max - min + 1))));
  }

  static randomArrayIndex(array) {
    const min = 0;
    const max = array.length - 1;

    return this.randomInt(min, max);
  }

  static shuffleArray(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  static numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  static rollDice(diceQuantity, numberOfSides, bonusValue = 0) {
    const arr = new Array(diceQuantity).fill(undefined);
    let filledArr = arr.map(() => Utils.randomInt(1, numberOfSides));

    return filledArr.reduce((total, num) => num + total) + bonusValue;
  }

  static buildShareURL(dataObj) {
    const origin = window.location.origin;
    const path = window.location.pathname;
    const search = "?";

    const searchArray = ["run=build"];

    for (let [key, value] of Object.entries(dataObj.inputParams)) {
      if (typeof value === "string" || typeof value === "number") {
        searchArray.push(`${key}=${value}`);
      }
    }

    return origin + path + search + searchArray.join("&");
  }

  static combineDuplicateArrayElements(array) {
    const outputArray = [];
    const builderObj = {};
    for (let i = 1; i <= array.length; i++) {
      const index = i - 1;
      if (builderObj.hasOwnProperty(array[index])) {
        builderObj[array[index]]++;
      } else {
        builderObj[array[index]] = 1;
      }
    }

    for (let [string, count] of Object.entries(builderObj)) {
      if (count >= 2) {
        outputArray.push(`${count}x ${string}`);
      } else {
        outputArray.push(`${string}`);
      }
    }

    return outputArray.sort();
  }

  static generateValueFromOdds(inputObject) {
    // require an object with child objects that each have an "odds" value to pick from
    const array = [];

    for (const [key, value] of Object.entries(inputObject)) {
      const { odds } = value;
      const classCount = new Array(odds).fill(key);
      array.push(...classCount);
    }

    return array[Utils.randomArrayIndex(array)];
  }

  static firstLetterUppercase(word) {
    const firstLetter = word.substring(0, 1).toUpperCase();

    return firstLetter + word.substring(1);
  }

  static getStatModifier(stat) {
    if (stat === 3) {
      return -3;
    } else if (stat > 3 && stat <= 5) {
      return -2;
    } else if (stat > 5 && stat <= 8) {
      return -1;
    } else if (stat > 12 && stat <= 15) {
      return 1;
    } else if (stat > 15 && stat <= 17) {
      return 2;
    } else if (stat === 18) {
      return 3;
    } else {
      return 0;
    }
  }
}
