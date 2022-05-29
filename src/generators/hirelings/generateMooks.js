import Utils from "../../components/utils";
import demiHumanNames from "../../data/names/allNames";

export default class HirelingRoster {
  constructor(params = {}) {
    if (params.seed) {
      global.seed = params.seed;
    } else if (!global.seed) {
      Utils.setNewSeed();
    }

    const { crier, level, townSize } = params;

    this.townSize = townSize;
    this.crier = crier;
    this.partyLevel = level;
    this.cost = this.calculateCost();
    this.roster = this.generateSellswordRoster();
  }

  calculateCost() {
    let base = this.crier ? 5 : 0;

    switch (this.townSize) {
      case "village":
        return base + 5;
      case "town":
        return base + 10;
      case "city":
        return base + 15;
    }
  }

  generateSellswordRoster() {
    const applicantCount = this.getNumberOfHirelings();
    const levelProbabilityArray = this.getLevelProbabilityArray();

    const hirelingsArray = new Array(applicantCount).fill(undefined);
    return hirelingsArray.map(
      () => new Hireling(levelProbabilityArray[Utils.randomArrayIndex(levelProbabilityArray)])
    );
  }

  getNumberOfHirelings() {
    const applicantRange = {
      village: {
        min: 1,
        max: 5,
      },
      town: {
        min: 2,
        max: 6,
      },
      city: {
        min: 3,
        max: 7,
      },
    };
    const bonus = this.crier ? Utils.randomInt(1, 3) : 0;
    const min = applicantRange[this.townSize].min + bonus;
    const max = applicantRange[this.townSize].max + bonus;

    return Utils.randomInt(min, max);
  }

  getLevelProbabilityArray() {
    const maxHirelingLevel = this.partyLevel;
    let array = new Array(100).fill(0);

    for (let i = 1; i <= maxHirelingLevel; i++) {
      const odds = new Array(50 - i).fill(i);
      array.push(...odds);
    }

    return array;
  }
}

const oseCharacterRaces = {
  Human: {
    odds: 25,
    maxLvl: 14,
    classes: {
      Acrobat: {
        hd: 4,
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Staff", "Longsword", "Short sword", "Spear", "Polearm"],
        additionalWeapon: ["Dagger"],
        armorOptions: ["Leather"],
      },
      Assassin: {
        hd: 6,
        odds: 1,
        alignments: ["Neutral", "Chaos"],
        weaponOptions: ["Short sword", "Club", "Mace", "Hand axe", "Shortbow", "Longbow"],
        additionalWeapon: ["Dagger"],
        armorOptions: ["Leather", "Leather & Shield"],
      },
      Barbarian: {
        hd: 8,
        odds: 2,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: [
          "Battle axe",
          "Hand axe",
          "Short sword",
          "Longsword",
          "Bastard sword",
          "Polearm",
          "Mace",
          "Club",
          "Warhammer",
          "Spear",
        ],
        additionalWeapon: ["Dagger"],
        armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"],
      },
      Bard: {
        hd: 6,
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: [],
        additionalWeapon: ["Dagger"],
        armorOptions: ["Leather", "Chainmail"],
      },
      Cleric: {
        hd: 6,
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Club", "Mace", "Warhammer", "Staff"],
        armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"],
      },
      Druid: {
        hd: 6,
        odds: 1,
        alignments: ["Neutral"],
        weaponOptions: ["Club", "Dagger", "Sling", "Spear", "Staff"],
        armorOptions: ["Leather", "Leather & Shield"],
      },
      Fighter: {
        hd: 8,
        odds: 5,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: [
          "Battle axe",
          "Hand axe",
          "Short sword",
          "Longsword",
          "Bastard sword",
          "Polearm",
          "Mace",
          "Club",
          "Warhammer",
          "Spear",
        ],
        additionalWeapon: ["Dagger"],
        armorOptions: ["Chainmail", "Chainmail & Shield", "Plate mail", "Plate mail & Shield"],
      },
      Illusionist: {
        hd: 4,
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Staff", "Dagger"],
        armorOptions: ["None"],
      },
      Knight: {
        hd: 8,
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: [
          "Battle axe",
          "Hand axe",
          "Short sword",
          "Longsword",
          "Bastard sword",
          "Polearm",
          "Mace",
          "Club",
          "Warhammer",
          "Spear",
        ],
        additionalWeapon: ["Dagger"],
        armorOptions: ["Chainmail", "Chainmail & Shield", "Plate mail", "Plate mail & Shield"],
      },
      "Magic-User": {
        hd: 4,
        odds: 2,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Staff", "Dagger"],
        armorOptions: ["None"],
      },
      Paladin: {
        hd: 8,
        odds: 1,
        alignments: ["Law"],
        weaponOptions: [
          "Battle axe",
          "Hand axe",
          "Short sword",
          "Longsword",
          "Bastard sword",
          "Polearm",
          "Mace",
          "Club",
          "Warhammer",
          "Spear",
        ],
        additionalWeapon: ["Dagger"],
        armorOptions: ["Chainmail", "Chainmail & Shield", "Plate mail", "Plate mail & Shield"],
      },
      Ranger: {
        hd: 8,
        odds: 1,
        alignments: ["Law", "Neutral"],
        weaponOptions: ["Battle axe", "Hand axe", "Short sword", "Longsword", "Spear", "Dagger"],
        additionalWeapon: ["Longbow", "Shortbow"],
        armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"],
      },
      Thief: {
        hd: 4,
        odds: 3,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Short sword", "Hand axe", "Mace", "Club", "Shortbow", "Longbow"],
        additionalWeapon: ["Dagger"],
        armorOptions: ["Leather"],
      },
    },
    henchman: {
      "Man-at-Arms": {
        odds: 15,
        weaponOptions: [
          "Club",
          "Mace",
          "Spear",
          "Short sword",
          "Longsword",
          "Warhammer",
          "Crossbow",
          "Shortbow",
        ],
        alignments: ["Law", "Neutral", "Chaos"],
        additionalWeapon: ["Dagger"],
        armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"],
      },
      "Torch-Bearer": {
        odds: 6,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Dagger"],
        armorOptions: ["None"],
      },
      Porter: {
        odds: 3,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Dagger"],
        armorOptions: ["None"],
      },
      Scout: {
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Hand axe", "Short bow", "Spear", "Sling"],
        additionalWeapon: ["Dagger"],
        armorOptions: ["None", "Leather"],
      },
      Scribe: {
        odds: 1,
        alignments: ["Law", "Neutral", "Chaos"],
        weaponOptions: ["Dagger"],
        armorOptions: ["None"],
      },
    },
  },
  Dwarf: {
    odds: 1,
    maxLvl: 12,
    hd: 8,
    alignments: ["Law", "Neutral", "Chaos"],
    weaponOptions: [
      "Battle axe",
      "Club",
      "Short sword",
      "Mace",
      "Warhammer",
      "Crossbow",
      "Longsword",
    ],
    armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"],
  },
  Elf: {
    odds: 1,
    maxLvl: 10,
    hd: 6,
    alignments: ["Law", "Neutral", "Chaos"],
    weaponOptions: ["Short sword", "Short bow", "Longsword", "Longbow"],
    armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"],
  },
  Gnome: {
    odds: 1,
    maxLvl: 8,
    hd: 4,
    alignments: ["Law", "Neutral", "Chaos"],
    weaponOptions: ["Short sword", "Short bow", "Club", "Dagger", "Sling"],
    armorOptions: ["Leather", "Leather & Shield"],
  },
  "Half-Elf": {
    odds: 1,
    maxLvl: 12,
    hd: 6,
    alignments: ["Law", "Neutral", "Chaos"],
    weaponOptions: ["Short sword", "Short bow", "Longsword", "Longbow"],
    armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"],
  },
  Halfling: {
    odds: 1,
    maxLvl: 8,
    hd: 6,
    alignments: ["Law", "Neutral", "Chaos"],
    weaponOptions: ["Short sword", "Short bow", "Club", "Dagger", "Sling"],
    armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"],
  },
  "Half-Orc": {
    odds: 1,
    maxLvl: 8,
    hd: 6,
    alignments: ["Law", "Neutral", "Chaos"],
    weaponOptions: ["Battle axe", "Club", "Short sword", "Dagger", "Mace", "Crossbow", "Longsword"],
    armorOptions: ["Leather", "Leather & Shield", "Chainmail", "Chainmail & Shield"],
  },
};

const randomPossessions = {
  "History of a local human dynasty": 1,
  "History of local dwarven kingdom": 1,
  "History of local elven realm": 1,
  "History of the last great war": 1,
  "Holy text": 1,
  "Skull necklace": 1,
  "Penny whistle": 1,
  "Silver signet ring": 1,
  "Hunting horn": 1,
  Dice: 1,
  "Chess set": 1,
  "Hooded latnern": 1,
  "Wooden idol": 1,
  "Bronze torc": 1,
  "Common-elven dictionary": 1,
  "Common-dwarven dictionary": 1,
  "Dead language dictionary": 1,
  "Gnome doll": 1,
  "Wool blanket": 1,
  "Candles (10)": 1,
  "Spell scroll (1st-level)": 1,
  "Mystery potion": 1,
  Chalk: 1,
  "Pet (small mammal)": 1,
  "Pet (bird)": 1,
  "Pet (reptile)": 1,
  Eyepatch: 1,
  "Gold tooth": 1,
  "Tea set": 1,
  'Bag of "pixie-dust"': 1,
  "Tarot cards": 1,
  "Holy symbol": 1,
  "Lazy eye": 1,
  "Vow of silence": 1,
  "Face tattoo": 1,
  "Close talker": 1,
  Lazy: 1,
  Glutton: 1,
  Skeptical: 1,
  Zealot: 1,
  Gregarious: 1,
  Bold: 1,
  Craven: 1,
  Chaste: 1,
  Ambitious: 1,
  Stubborn: 1,
  Fickle: 1,
  Vengful: 1,
  Greedy: 1,
  Humble: 1,
  Arrogant: 1,
  Trusting: 1,
  Paranoid: 1,
  Impatient: 1,
  Patient: 1,
  Cynical: 1,
  Callous: 1,
  Sadistic: 1,
  Compassionate: 1,
};

const hirelingBackgrounds = {
  Peasant: 5,
  Apprentice: 1,
  "Noble bastard": 1,
  Hunter: 1,
  Beggar: 2,
  Bowyer: 1,
  Butcher: 1,
  "Caravan hand": 1,
  Cultist: 1,
  Servant: 1,
  Deserter: 1,
  "Disowned noble": 1,
  Farmhand: 2,
  Fisherman: 2,
  Gambler: 1,
  Gravedigger: 1,
  Graverobber: 1,
  Historian: 1,
  Indebted: 2,
  Juggler: 1,
  Lumberjack: 1,
  Slaver: 1,
  Mason: 1,
  Messenger: 1,
  Militia: 1,
  Mercenary: 1,
  Miller: 1,
  Miner: 1,
  Minstrel: 1,
  Monk: 1,
  Peddler: 1,
  Poacher: 1,
  Ratcatcher: 1,
  Refugee: 2,
  Shepherd: 1,
  Tailor: 1,
  Vagabond: 2,
  "Temple acolyte": 1,
  Criminal: 2,
  Hermit: 1,
  Sailor: 1,
  Pirate: 1,
  Smuggler: 1,
  Carpenter: 1,
  Thug: 2,
  "Failed merchant": 1,
  "Failed apprentice mage": 1,
  "Stable hand": 1,
};

class Hireling {
  constructor(level) {
    this.race = this.getRace();
    this.level = this.checkLevel(level);
    this.charClass = this.getClass();
    this.hp = this.rollHP();
    this.sex = this.rollSex();
    this.name = this.getName();
    this.background = this.getRandomBackground();
    this.possession = this.getRandomPossession();
    this.alignment = this.getAlignment();
    this.armor = this.getArmor();
    this.weapons = this.getWeapons();
  }

  getRace() {
    const racesArray = [];

    // level 0 peasants are always human
    if (this.level === 0) return "Human";

    for (const [key, value] of Object.entries(oseCharacterRaces)) {
      const { odds } = value;
      const raceArray = new Array(odds).fill(key);
      racesArray.push(...raceArray);
    }

    return racesArray[Utils.randomArrayIndex(racesArray)];
  }

  getName() {
    const { race } = this;
    const sex = this.sex === "M" ? "male" : "female";

    switch (race) {
      case "Dwarf":
        return demiHumanNames.dwarven.first[sex][
          Utils.randomArrayIndex(demiHumanNames.dwarven.first[sex])
        ];
      case "Elf":
        return demiHumanNames.elf.first[sex][Utils.randomArrayIndex(demiHumanNames.elf.first[sex])];
      case "Gnome":
        const frontCompound =
          demiHumanNames.gnome.first[sex].front[
            Utils.randomArrayIndex(demiHumanNames.gnome.first[sex].front)
          ];
        const backCompound =
          demiHumanNames.gnome.first[sex].back[
            Utils.randomArrayIndex(demiHumanNames.gnome.first[sex].back)
          ];
        return `${frontCompound}${backCompound}`;
      case "Halfling":
        return demiHumanNames.halfling.first[sex][
          Utils.randomArrayIndex(demiHumanNames.halfling.first[sex])
        ];
      case "Half-Elf":
        return demiHumanNames["half-elf"].first[sex][
          Utils.randomArrayIndex(demiHumanNames["half-elf"].first[sex])
        ];
      case "Half-Orc":
        return demiHumanNames["half-orc"].first[sex][
          Utils.randomArrayIndex(demiHumanNames["half-orc"].first[sex])
        ];
      default:
        return demiHumanNames.human.first[sex][
          Utils.randomArrayIndex(demiHumanNames.human.first[sex])
        ];
    }
  }

  checkLevel(level) {
    let maxLevel = oseCharacterRaces[this.race].maxLevel;
    if (maxLevel > 8) maxLevel = 8;

    if (level === 0 && this.race !== "Human") return 1;

    return level > maxLevel ? maxLevel : level;
  }

  getClass() {
    const classesArray = [];

    if (this.race !== "Human") return "Adventurer";

    if (this.level >= 1) {
      for (const [key, value] of Object.entries(oseCharacterRaces.Human.classes)) {
        const { odds } = value;
        const classCount = new Array(odds).fill(key);
        classesArray.push(...classCount);
      }

      return classesArray[Utils.randomArrayIndex(classesArray)];
    } else {
      for (const [key, value] of Object.entries(oseCharacterRaces.Human.henchman)) {
        const { odds } = value;
        const classCount = new Array(odds).fill(key);
        classesArray.push(...classCount);
      }

      return classesArray[Utils.randomArrayIndex(classesArray)];
    }
  }

  rollHP() {
    if (this.level === 0) {
      switch (this.charClass) {
        case "Man-at-Arms":
          return Utils.randomInt(2, 6);
        case "Torch-Bearer":
          return Utils.randomInt(2, 4);
        default:
          return 2;
      }
    }

    let HD = 8;
    if (this.race !== "Human") {
      HD = oseCharacterRaces[this.race].hd;
    } else {
      HD = oseCharacterRaces.Human.classes[this.charClass].hd;
    }

    return Utils.randomInt(2, HD);
  }

  rollSex() {
    return Utils.randomInt(1, 10) > 3 ? "M" : "F";
  }

  getRandomPossession() {
    const possessionsLength = Object.keys(randomPossessions).length;
    const possessionArray = new Array(Math.floor(possessionsLength * 1)).fill("Nothing");

    for (let [key, odds] of Object.entries(randomPossessions)) {
      const array = new Array(odds).fill(key);
      possessionArray.push(...array);
    }

    return possessionArray[Utils.randomArrayIndex(possessionArray)];
  }

  getRandomBackground() {
    const backgroundArray = [];

    for (let [key, odds] of Object.entries(hirelingBackgrounds)) {
      const array = new Array(odds).fill(key);
      backgroundArray.push(...array);
    }

    return backgroundArray[Utils.randomArrayIndex(backgroundArray)];
  }

  getAlignment() {
    let alignArray = undefined;
    if (this.race !== "Human") {
      alignArray = oseCharacterRaces[this.race].alignments;
    } else {
      if (this.level > 0) {
        alignArray = oseCharacterRaces.Human.classes[this.charClass].alignments;
      } else {
        alignArray = oseCharacterRaces.Human.henchman[this.charClass].alignments;
      }
    }
    return alignArray[Utils.randomArrayIndex(alignArray)];
  }

  getArmor() {
    let armorArray = undefined;
    if (this.race !== "Human") {
      armorArray = oseCharacterRaces[this.race].armorOptions;
    } else {
      if (this.level > 0) {
        armorArray = oseCharacterRaces.Human.classes[this.charClass].armorOptions;
      } else {
        armorArray = oseCharacterRaces.Human.henchman[this.charClass].armorOptions;
      }
    }
    return armorArray[Utils.randomArrayIndex(armorArray)];
  }

  getWeapons() {
    let weaponsArray = undefined;
    let cClass = undefined;
    let primary = "";
    let secondary = "";

    if (this.race !== "Human") {
      cClass = oseCharacterRaces[this.race];
    } else {
      cClass =
        this.level > 0
          ? oseCharacterRaces.Human.classes[this.charClass]
          : oseCharacterRaces.Human.henchman[this.charClass];
    }

    primary = cClass.weaponOptions;
    if (!!cClass.additionalWeapon) secondary = cClass.additionalWeapon;
    weaponsArray = [
      primary[Utils.randomArrayIndex(primary)],
      secondary[Utils.randomArrayIndex(secondary)],
    ].filter((e) => e !== undefined);

    return weaponsArray.length > 1 ? weaponsArray.join(", ") : weaponsArray;
  }
}
