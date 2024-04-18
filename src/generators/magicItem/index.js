import Utils from "../../components/utils";
import clericSpells from "../../data/spells/clericSpells.json";
import druidSpells from "../../data/spells/druidSpells.json";
import illusionistSpells from "../../data/spells/illusionistSpells.json";
import itemTables from "../../data/magicItems/magicItems.json";
import magicPropertiesData from "../../data/items/magic/magicProperties";
import magicUserSpells from "../../data/spells/magicUserSpells.json";
import monstersTables from "../../data/monsters/monsters.json";

class MagicItem {
  constructor(params = {}) {
    const { type, restriction, knaveProperties = false } = params;
    const { itemGroups } = itemTables;

    this.details = "";
    this.itemType = this.checkRestrictions(
      type || this.generateValueFromOdds(itemGroups),
      restriction
    );
    this.generateGenericPowers = knaveProperties;
    this.itemName = this.getItem();
  }

  generateValueFromOdds(inputObject) {
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

    if (this.generateGenericPowers) {
      return this.genericMagicItem(itemType);
    }

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
      case "Weapon":
        return this.getWeapon();
      case "Rod/Staff/Wand":
        return this.getRodStaffWand();
      case "Misc. Item":
        return this.getMiscItem();
      // no default
    }
  }

  checkRestrictions(itemType, restriction) {
    const { itemGroups } = itemTables;
    if (restriction === "no weapons" && (itemType === "Sword" || itemType === "Weapon")) {
      return this.checkRestrictions(this.generateValueFromOdds(itemGroups), restriction);
    }

    return itemType;
  }

  getArmor() {
    const { itemGroups } = itemTables;
    const { itemsList, armorTypes } = itemGroups[this.itemType];
    const armorName = this.generateValueFromOdds(itemsList);
    const armorType = this.generateValueFromOdds(armorTypes);

    return armorName.replace("Armor", `${armorType} Armor`);
  }

  getPotion() {
    const { itemGroups } = itemTables;
    const { itemsList } = itemGroups[this.itemType];
    return `Potion of ${this.generateValueFromOdds(itemsList)}`;
  }

  getRing() {
    const { itemGroups } = itemTables;
    const { itemsList } = itemGroups[this.itemType];
    return `Ring of ${this.generateValueFromOdds(itemsList)}`;
  }

  getScroll(itemType = this.itemType) {
    const { itemGroups } = itemTables;
    const { itemsList } = itemGroups[itemType];
    const scrollName = this.generateValueFromOdds(itemsList);
    let spellArray = [];

    if (itemsList[scrollName].spellCount) {
      const spellType = Utils.randomInt(1, 4) === 1 ? "Divine" : "Arcane";
      for (let i = 1; i <= itemsList[scrollName].spellCount; i++) {
        spellArray.push(this.getSpell(spellType));
      }

      return `Spell Scroll: ${spellArray.sort().join(", ")}`;
    }

    if (scrollName.includes("Treasure") || scrollName.includes("Scroll")) {
      return scrollName;
    }

    return `Scroll of ${scrollName}`;
  }

  getSpell(spellType) {
    const { scrollSpellLevels } = itemTables;
    const arcaneCasterLists = [magicUserSpells, illusionistSpells];
    const divineCasterLists = [clericSpells, druidSpells];
    let spellList = undefined;

    if (spellType === "Arcane") {
      spellList = arcaneCasterLists[Utils.randomArrayIndex(arcaneCasterLists)];
    } else {
      spellList = divineCasterLists[Utils.randomArrayIndex(divineCasterLists)];
    }

    const spellLevel = this.generateValueFromOdds(scrollSpellLevels[spellType]);
    const spellLevelArray = spellList[spellLevel];

    return spellLevelArray[Utils.randomArrayIndex(spellLevelArray)];

    // return `${spellType} ${spellLevel} Level`;
  }

  getWeapon() {
    const { itemGroups } = itemTables;
    const { itemsList } = itemGroups[this.itemType];
    let result = this.generateValueFromOdds(itemsList);

    // for items (arrows/bolts) which have multiple value options for the same item type
    if (itemsList[result].hasOwnProperty("options")) {
      const selectedOption = this.generateValueFromOdds(itemsList[result].options);

      if (itemsList[result].options[selectedOption].hasOwnProperty("diceType")) {
        return getItemCount(result, itemsList[result].options[selectedOption]);
      }

      return selectedOption;
    }

    // if item has a randomly rolled amount (arrows/bolts/javelins), determine how many
    if (itemsList[result].hasOwnProperty("diceType")) {
      return getItemCount(result, itemsList[result]);
    }

    function getItemCount(name, itemObject) {
      const { diceNum, diceType, bonus } = itemObject;

      const itemCount = Utils.rollDice(diceNum, diceType, bonus ? bonus : 0);
      return `${name} (${itemCount})`;
    }

    return result;
  }

  getRodStaffWand() {
    const { itemGroups } = itemTables;
    const { itemsList } = itemGroups[this.itemType];
    return this.generateValueFromOdds(itemsList);
  }

  getMiscItem() {
    const { itemGroups } = itemTables;
    const { tables } = itemGroups[this.itemType];
    const table = tables[Utils.randomArrayIndex(tables)];
    const itemName = this.generateValueFromOdds(table);

    if (itemName === "Ioun Stones") {
      return this.getIounStones(table[itemName], itemName);
    }

    if (table[itemName].hasOwnProperty("options")) {
      const options = table[itemName].options;
      const itemVersion = this.generateValueFromOdds(options);
      return `${itemName} (${itemVersion})`;
    }

    return itemName;
  }

  getIounStones(obj, name) {
    const { diceNum, diceType, options } = obj;
    const stonesCount = Utils.rollDice(diceNum, diceType);
    const stonesArray = [];
    // let stonesArray = new Array(Utils.rollDice(diceNum, diceType)).fill(undefined);
    // stonesArray = stonesArray.map(() => {
    //   return this.generateValueFromOdds(options);
    // });

    const iounStones = {};
    for (let i = 1; i <= stonesCount; i++) {
      const stone = this.generateValueFromOdds(options);
      if (iounStones.hasOwnProperty(stone)) {
        iounStones[stone]++;
      } else {
        iounStones[stone] = 1;
      }
    }

    for (let [stone, count] of Object.entries(iounStones)) {
      stonesArray.push(`${count}x ${stone}`);
    }

    stonesArray.sort();

    return `${name} (${stonesArray.join(", ")})`;
  }

  getSword(forceSentientSword = false) {
    if (forceSentientSword || Utils.randomInt(1, 10) <= 3) {
      this.itemType = "Sword";
      return this.getSentientSword();
    }

    const { itemGroups } = itemTables;
    const { itemsList, swordTypes } = itemGroups[this.itemType];
    const type = this.generateValueFromOdds(swordTypes);
    const sword = this.generateValueFromOdds(itemsList).replace("Sword", type);

    return sword;
  }

  getSentientSword() {
    const { itemGroups } = itemTables;
    const { swordTypes } = itemGroups[this.itemType];
    const type = this.generateValueFromOdds(swordTypes);
    const intelligence = 6 + Utils.randomInt(1, 6);
    const alignment = this.getSwordAlignment();
    const powers = this.getPowers(intelligence);
    let ego = Utils.randomInt(1, 12);
    let specialPurpose = "";
    let languages = "";

    // swords with Int 10 or higher speaks a number of randomly rolled languages
    if (intelligence >= 10) {
      languages = `, ${intelligence >= 11 ? "Reads/" : ""}${
        intelligence >= 10 ? "Speaks" : ""
      } ${this.getSwordLanguages(alignment)}`;
    }

    if (Utils.randomInt(1, 6) === 1) {
      specialPurpose = `Purpose: ${this.getSpecialPurpose(alignment)}, `;
      ego = 12;
    }

    this.details = `[ ${specialPurpose}${alignment}, Int ${intelligence}, Ego ${ego}${languages}, ${powers} ]`;

    return `Sentient ${type}`;
  }

  getSwordAlignment = () => {
    let alignmentRoll = Utils.rollDice(1, 20);

    if (alignmentRoll <= 13) {
      return "Lawful";
    } else if (alignmentRoll <= 18) {
      return "Neutral";
    } else {
      return "Chaotic";
    }
  };

  getPowers = (intelligence) => {
    const classThis = this;
    const { sentientSwords } = itemTables;
    const { sensoryPowers, extraordinaryPowers } = sentientSwords;

    let sensoryPowersCount = 3;
    let extraordinaryPowersCount = 0;

    if (intelligence === 7) {
      sensoryPowersCount = 1;
    } else if (intelligence === 8) {
      sensoryPowersCount = 2;
    } else if (intelligence >= 12) {
      extraordinaryPowersCount = 1;
    }

    let sensoryPowersArray = [];
    let extraordinaryPowersArray = [];

    // Sensory Powers
    for (let i = 1; i <= sensoryPowersCount; i++) {
      const generatedPower = getSensoryPower(sensoryPowers);
      sensoryPowersArray.push(generatedPower);
    }

    if (sensoryPowersArray.includes("2x")) {
      const safeObj = { ...sensoryPowers };
      delete safeObj["2x"];

      sensoryPowersArray.splice(sensoryPowersArray.indexOf("2x"), 1);

      for (let i = 1; i <= 2; i++) {
        const generatedPower = getSensoryPower(safeObj);
        sensoryPowersArray.push(generatedPower);
      }
    }

    if (sensoryPowersArray.includes("Roll an extraordinary power")) {
      sensoryPowersArray.splice(sensoryPowersArray.indexOf("Roll an extraordinary power"), 1);
      extraordinaryPowersCount++;
    }

    // Extraordinary Powers
    for (let i = 1; i <= extraordinaryPowersCount; i++) {
      const generatedPower = getExtraordinaryPower(extraordinaryPowers);
      extraordinaryPowersArray.push(generatedPower);
    }

    while (
      extraordinaryPowersArray.indexOf("2x") > -1 ||
      extraordinaryPowersArray.indexOf("3x") > -1
    ) {
      let extraPowersCount = 0;
      const safeObj = { ...extraordinaryPowers };
      delete safeObj["2x"];
      delete safeObj["3x"];

      if (!extraordinaryPowersArray.indexOf["2x"]) extraPowersCount += 2;
      if (!extraordinaryPowersArray.indexOf["3x"]) extraPowersCount += 3;

      if (extraordinaryPowersArray.indexOf("2x")) {
        extraordinaryPowersArray.splice(sensoryPowersArray.indexOf("2x"), 1);
      }

      if (extraordinaryPowersArray.indexOf("3x")) {
        extraordinaryPowersArray.splice(sensoryPowersArray.indexOf("3x"), 1);
      }

      for (let i = 1; i <= extraPowersCount; i++) {
        const generatedPower = getExtraordinaryPower(safeObj);
        extraordinaryPowersArray.push(generatedPower);
      }
    }

    const extraordinaryPowersStr = mergePowers(extraordinaryPowersArray).join(", ");

    return `Powers: ${
      extraordinaryPowersStr !== "" ? `${extraordinaryPowersStr}, ` : ""
    }${sensoryPowersArray.join(", ")}`;

    // Operational Functions
    function getSensoryPower(obj) {
      const newPower = classThis.generateValueFromOdds(obj);
      if (sensoryPowersArray.includes(newPower)) return getSensoryPower(obj);
      return newPower;
    }

    function getExtraordinaryPower(obj) {
      const newPower = classThis.generateValueFromOdds(obj);
      if (
        extraordinaryPowersArray.includes(newPower) &&
        !sentientSwords.extraordinaryPowers[newPower].duplicatesAllowed
      ) {
        return getExtraordinaryPower(obj);
      }
      return newPower;
    }

    function mergePowers(array) {
      const powersArray = [];
      const powersObj = {};
      for (let i = 1; i <= array.length; i++) {
        const index = i - 1;
        if (powersObj.hasOwnProperty(array[index])) {
          powersObj[array[index]]++;
        } else {
          powersObj[array[index]] = 1;
        }
      }

      for (let [power, count] of Object.entries(powersObj)) {
        if (count >= 2) {
          powersArray.push(`${count}x ${power}`);
        } else {
          powersArray.push(`${power}`);
        }
      }

      return powersArray.sort();
    }
  };

  getSpecialPurpose = (alignment) => {
    const { sentientSwords } = itemTables;
    const { specialPurpose } = sentientSwords;
    const { types: monsterTypes } = monstersTables;

    const purpose = this.generateValueFromOdds(specialPurpose);

    switch (purpose) {
      case "Slay monster":
        const monsterType = this.generateValueFromOdds(monsterTypes);
        return `Slay ${monsterType}`;
      case "Defeat Law":
        if (alignment === "Lawful") return "Defeat Chaos";
        return purpose;
      case "Defeat Chaos":
        if (alignment === "Chaotic") return "Defeat Law";
        return purpose;
      default:
        return purpose;
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

  genericMagicItem = (itemType) => {
    switch (itemType) {
      case "Armor or Shield":
        if (Utils.randomInt(1, 2) === 1) {
          return this.generateMagicProperties("Armor");
        } else {
          return this.generateMagicProperties("Shield");
        }
      case "Potion":
        return this.generateMagicProperties("Potion");
      case "Ring":
        return this.generateMagicProperties("Ring");
      case "Scroll or Map":
        return this.generateMagicProperties("Scroll");
      case "Sword":
        return this.generateMagicProperties("Sword");
      case "Sentient Sword":
        return this.getSword(true);
      case "Weapon":
        const weaponTypes = [
          "Battle axe",
          "Club",
          "Crossbow",
          "Dagger",
          "Hand axe",
          "Javelin",
          "Bow",
          "Mace",
          "Polearm",
          "Short sword",
          "Spear",
          "War hammer"
        ];
        const thisType = weaponTypes[Utils.randomArrayIndex(weaponTypes)];

        return this.generateMagicProperties(thisType);
      case "Rod/Staff/Wand":
        const rodStaffWand = Utils.randomInt(1, 3);
        let charges;
        if (rodStaffWand === 1) {
          charges = Utils.randomInt(1, 10);
          return this.generateMagicProperties(`Rod (${charges} charges)`);
        } else if (rodStaffWand === 2) {
          charges = Utils.randomInt(3, 10);
          return this.generateMagicProperties(`Staff (${charges} charges)`);
        } else {
          charges = Utils.randomInt(2, 10);
          return this.generateMagicProperties(`Wand (${charges} charges)`);
        }
      case "Misc. Item":
        return this.generateMagicProperties("Misc Item");
      // no default
    }
  };

  generateMagicProperties(itemType) {
    const { combinations } = magicPropertiesData;

    const effect = combinations[Utils.randomArrayIndex(combinations)];
    const properties = effect
      .map((e) => {
        const possibilitiesArray = magicPropertiesData[e];
        let result = possibilitiesArray[Utils.randomArrayIndex(possibilitiesArray)];

        if (Array.isArray(result)) {
          result = result[Utils.randomArrayIndex(result)];
        }

        return result;
      })
      .join(" ");

    return `${itemType} [${properties}]`;
  }
}

export default MagicItem;
