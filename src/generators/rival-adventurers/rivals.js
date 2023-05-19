import City from "../city";
import Person from "../person/person";
import RivalAdventurerData from "../../data/rivals/adventurers.json";
import Utils from "../../components/utils";
import converter from "number-to-words";
import hirelingsData from "../../data/hirelings/hirelings";
import magicPropertiesData from "../../data/items/magic/magicProperties";
import partyNameData from "../../data/rivals/partyNames.json";

const { alignments, classes } = RivalAdventurerData;
const { characterRaces, quirks, descriptors } = hirelingsData;

export default class RivalParty {
  constructor(params = {}) {
    let { dungeonLevel, encounterLocation } = params;
    dungeonLevel = dungeonLevel === "10+" ? 10 : parseInt(dungeonLevel);

    const alignment = Utils.generateValueFromOdds(alignments);
    let partySize = this.getPartySize();
    let charactersArray = this.getParty(dungeonLevel, partySize, alignment);
    if (encounterLocation === "wilderness") charactersArray = this.checkForMounts(charactersArray);

    const partyName = this.getPartyName(alignment, charactersArray);

    return {
      partySize,
      charactersArray,
      partyName
    };
  }

  getPartySize = () => {
    // Begin by establishing the number encountered by rolling 1d4+2.
    return Utils.rollDice(1, 4, 2);
  };

  getParty = (dungeonLevel, partySize, alignment) => {
    const partyArray = [];

    for (let i = 1; i <= partySize; i++) {
      const classRoll = Utils.rollDice(3, 8);

      const { charClass } = classes.find((el) => {
        const { range } = el;

        if (Array.isArray(range)) {
          if (classRoll >= range[0] && classRoll <= range[1]) return el;
        } else {
          if (range === classRoll) return el;
        }
        return null;
      });

      const sex = Utils.rollDice(1, 3) <= 2 ? "male" : "female";
      const level = this.getCharacterLevel(dungeonLevel);
      const stats = this.rollStats(charClass);

      partyArray.push({
        sex,
        name: this.getCharacterName(charClass, sex),
        age: this.getCharacterAge(charClass),
        charClass,
        stats,
        level,
        alignment,
        descriptor: this.getDescriptor(),
        quirk: this.getQuirk(),
        hp: this.rollHP(charClass, level, stats.Con),
        armor: this.getArmor(charClass),
        weapons: this.getWeapons(charClass),
        treasure: this.getTreasure(level),
        magicItems: this.getMagicItems(level)
      });
    }

    return partyArray;
  };

  getCharacterLevel = (dungeonLevel) => {
    let baseLevel;
    switch (Utils.rollDice(1, 6)) {
      case 1:
        baseLevel = parseInt(dungeonLevel) - 2;
        break;
      case 2:
        baseLevel = parseInt(dungeonLevel) - 1;
        break;
      case 5:
        baseLevel = parseInt(dungeonLevel) + 1;
        break;
      case 6:
        baseLevel = parseInt(dungeonLevel) + 2;
        break;
      default:
        baseLevel = parseInt(dungeonLevel);
        break;
    }

    if (baseLevel < 1) return 1;
    return parseInt(baseLevel);
  };

  getCharacterAge = (charClass) => {
    switch (charClass) {
      case "Gnome":
        return Utils.rollDice(3, 30, 25);
      case "Dwarf":
        return Utils.rollDice(3, 30, 25);
      case "Elf":
        return Utils.rollDice(3, 20, 75);
      case "Fighter":
        return Utils.rollDice(2, 10, 15);
      case "Thief":
        return Utils.rollDice(2, 10, 15);
      case "Magic-User":
        return Utils.rollDice(3, 12, 17);
      case "Necromancer":
        return Utils.rollDice(3, 12, 17);
      case "Illusionist":
        return Utils.rollDice(3, 12, 17);
      default:
        return Utils.rollDice(2, 8, 17);
    }
  };

  checkForMounts = (charactersArray) => {
    const avgLevel = Math.round(
      charactersArray.reduce((total, char) => total + char.level, 0) / charactersArray.length
    );
    const odds = 10 * avgLevel;
    const mounted = Utils.rollDice(1, 100) <= odds;

    return charactersArray.map((c) => {
      return { ...c, mounted };
    });
  };

  getCharacterName = (charClass, sex) => {
    const europeanCultures = ["english", "french", "germanic", "italian", "spanish", "polish"];
    const barbarianCultures = ["celtic", "nordic", "slavic"];

    let race = () => {
      if (charClass === "Elf") return "elf";
      if (charClass === "Dwarf") return "dwarf";
      if (charClass === "Gnome") return "gnome";
      if (charClass === "Halfling") return "halfling";
      return "human";
    };

    let culture = () => {
      if (charClass === "Barbarian")
        return barbarianCultures[Utils.randomArrayIndex(barbarianCultures)];
      return europeanCultures[Utils.randomArrayIndex(europeanCultures)];
    };

    const person = new Person({
      sex,
      race: race(),
      culture: culture()
    });

    return person.name;
  };

  getTreasure = (level) => {
    const baseTreasureGPValue = 250;
    const modifier = ((100 - (Utils.randomInt(0, 50) - 25)) / 100) * parseInt(level);

    return Math.round(baseTreasureGPValue * modifier);
  };

  getMagicItems = (level) => {
    const categories = ["Armor", "Weapon", "Potion", "Ring", "Misc. item"];

    const categoryItems = categories.map((c) => {
      const hasItem = Utils.randomInt(1, 100) <= level * 5;
      if (!hasItem) return null;
      return `${c}: ${this.getMagicProperties()}`;
    });

    return categoryItems.filter((i) => !!i);
  };

  getMagicProperties = () => {
    const { combinations } = magicPropertiesData;

    const effect = combinations[Utils.randomArrayIndex(combinations)];
    return effect
      .map((e) => {
        const possibilitiesArray = magicPropertiesData[e];
        return possibilitiesArray[Utils.randomArrayIndex(possibilitiesArray)];
      })
      .join(" ");
  };

  getPartyName = (alignment, charactersArray) => {
    const { patterns, Adj, Noun, People } = partyNameData;
    const pattern = patterns[Utils.generateValueFromOdds(patterns)].name.split(" ");

    const getPartyLeaderName = () => {
      return `${[...charactersArray].sort((a, b) => (a.level >= b.level ? -1 : 1))[0].name.name}'s`;
    };

    const string = pattern.map((el) => {
      switch (el) {
        case "Adj":
          return Adj[Utils.randomArrayIndex(Adj)];
        case "Noun":
          return Noun[Utils.randomArrayIndex(Noun)];
        case "People":
          return People[Utils.randomArrayIndex(People)];
        case "Number":
          return Utils.firstLetterUppercase(converter.toWords(charactersArray.length));
        case "Place":
          return new City({ culture: "generic fantasy", allowPrefixes: false }).name;
        case "Name":
          return getPartyLeaderName();
        default:
          return el;
      }
    });

    return string.join(" ").trim();
  };

  rollHP(charClass, level, con) {
    const mod = Utils.getStatModifier(con);
    let HD = 8;
    if (characterRaces.Human.classes[charClass]) {
      HD = characterRaces.Human.classes[charClass].hd;
    } else {
      HD = characterRaces[charClass].hd;
    }

    let hpArray = new Array(level).fill(undefined);

    return hpArray
      .map((e, i) => {
        const roll = Utils.randomInt(1, HD) + mod;
        const lvlOneMin = Math.ceil(HD / 2) + mod;
        if (i === 0) {
          if (roll < lvlOneMin) return lvlOneMin || 1;
        }
        return roll || 1;
      })
      .reduce((total, val) => total + val);
  }

  getQuirk() {
    const quirksArray = [];

    for (let [key, odds] of Object.entries(quirks)) {
      const array = new Array(odds).fill(key);
      quirksArray.push(...array);
    }

    return quirksArray[Utils.randomArrayIndex(quirksArray)];
  }

  getDescriptor() {
    return descriptors[Utils.randomArrayIndex(descriptors)];
  }

  getArmor(charClass) {
    let armorArray = undefined;
    if (characterRaces[charClass]) {
      armorArray = characterRaces[charClass].armorOptions;
    } else {
      armorArray = characterRaces.Human.classes[charClass].armorOptions;
    }
    return armorArray[Utils.randomArrayIndex(armorArray)];
  }

  getWeapons(charClass) {
    const singleRollClasses = [
      "Magic-User",
      "Illusionist",
      "Necromancer",
      "Porter",
      "Torch-Bearer",
      "Scribe",
      "Scout",
      "Hunter",
      "Cook"
    ];
    let weaponsArray = undefined;
    let cClass = undefined;
    let primary = [];
    let secondary = [undefined];

    if (characterRaces[charClass]) {
      cClass = characterRaces[charClass];
    } else {
      cClass = characterRaces.Human.classes[charClass];
    }

    primary = cClass.weaponOptions;
    if (!singleRollClasses.includes(charClass)) secondary = cClass.weaponOptions;
    weaponsArray = [
      primary[Utils.randomArrayIndex(primary)],
      secondary[Utils.randomArrayIndex(secondary)]
    ].filter((e) => e !== undefined);

    return weaponsArray.length > 1 ? weaponsArray.join(", ") : weaponsArray;
  }

  rollStats = (charClass) => {
    const {
      characterRaces: {
        Human: { classes },
        Dwarf,
        Elf,
        Gnome,
        Halfling
      }
    } = hirelingsData;
    const classObj = { ...classes, Dwarf, Elf, Gnome, Halfling };
    const classStats = classObj[charClass].stats;

    const stats = {
      Str: undefined,
      Int: undefined,
      Wis: undefined,
      Dex: undefined,
      Con: undefined,
      Cha: undefined
    };

    Object.keys(stats).forEach((key) => {
      const roll = Utils.rollDice(3, 6);
      if (classStats.includes(key) && roll <= 9) {
        stats[key] = 10;
      } else {
        stats[key] = roll;
      }
    });

    return stats;
  };
}
