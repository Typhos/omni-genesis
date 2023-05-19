import Utils from "../../components/utils";
import demiHumanNames from "../../data/names/allNames";
import hirelingsData from "../../data/hirelings/hirelings";
import nobleHouses from "../../data/names/nobleHouses";

class HirelingRoster {
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
      // no default
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
        max: 5
      },
      town: {
        min: 2,
        max: 6
      },
      city: {
        min: 3,
        max: 7
      }
    };
    const bonus = this.crier ? Utils.randomInt(1, 3) : 0;
    const min = applicantRange[this.townSize].min + bonus;
    const max = applicantRange[this.townSize].max + bonus;

    return Utils.randomInt(min, max);
  }

  getLevelProbabilityArray() {
    const maxHirelingLevel = this.partyLevel - 1;
    let array = new Array(100).fill(0);

    for (let i = 0; i < maxHirelingLevel; i++) {
      const odds = new Array((10 - i) ** 2).fill(i);
      array.push(...odds);
    }

    return array;
  }
}

const { characterRaces } = hirelingsData;

class Hireling {
  constructor(level) {
    this.race = this.getRace();
    this.level = this.checkLevel(level);
    this.charClass = this.getClass();
    this.hp = this.rollHP();
    this.sex = this.rollSex();
    this.name = this.getName();
    this.surname = this.getSurname();
    this.goal = this.getGoal();
    this.descriptor = this.getDescriptor();
    this.background = this.getRandomBackground();
    this.quirk = this.getQuirk();
    this.alignment = this.getAlignment();
    this.armor = this.getArmor();
    this.weapons = this.getWeapons();
  }

  getRace() {
    const { level } = this;
    const racesArray = [];

    // level 0 peasants are always human
    if (level === 0) return "Human";

    for (const [key, value] of Object.entries(characterRaces)) {
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

  getSurname() {
    const { race, sex } = this;

    switch (race) {
      case "Dwarf":
        let front =
          demiHumanNames.dwarven.last.frontCompound[
            Utils.randomArrayIndex(demiHumanNames.dwarven.last.frontCompound)
          ];
        const rear =
          demiHumanNames.dwarven.last.backCompound[
            Utils.randomArrayIndex(demiHumanNames.dwarven.last.backCompound)
          ];
        front = front.substr(0, 1).toUpperCase() + front.substr(1, front.length);
        return front.concat(rear);
      case "Elf":
        return demiHumanNames.elf.last[Utils.randomArrayIndex(demiHumanNames.elf.last)];
      case "Gnome":
        const sexTransform = sex === "M" ? "male" : "female";
        let frontCompound =
          demiHumanNames.gnome.first[sexTransform].front[
            Utils.randomArrayIndex(demiHumanNames.gnome.first[sexTransform].front)
          ];
        const backCompound =
          demiHumanNames.gnome.first[sexTransform].back[
            Utils.randomArrayIndex(demiHumanNames.gnome.first[sexTransform].back)
          ];
        frontCompound =
          frontCompound.substr(0, 1).toUpperCase() + frontCompound.substr(1, frontCompound.length);
        return `${frontCompound}${backCompound}`;
      case "Half-Elf":
        return demiHumanNames["half-elf"].last[
          Utils.randomArrayIndex(demiHumanNames["half-elf"].last)
        ];
      case "Half-Orc":
        return demiHumanNames["half-orc"].last[
          Utils.randomArrayIndex(demiHumanNames["half-orc"].last)
        ];
      default:
        const part1 = nobleHouses.rand1[Utils.randomArrayIndex(nobleHouses.rand1)];
        const part2 = nobleHouses.rand2[Utils.randomArrayIndex(nobleHouses.rand2)];

        return part1.concat(part2);
    }
  }

  checkLevel(level) {
    let maxLevel = characterRaces[this.race].maxLevel;
    if (maxLevel > 8) maxLevel = 8;

    if (level === 0 && this.race !== "Human") {
      this.race = "Human";
      return level;
    }

    return level > maxLevel ? maxLevel : level;
  }

  getClass() {
    const classesArray = [];

    if (this.race !== "Human") return "Adventurer";

    if (this.level >= 1) {
      for (const [key, value] of Object.entries(characterRaces.Human.classes)) {
        const { odds } = value;
        const classCount = new Array(odds).fill(key);
        classesArray.push(...classCount);
      }

      return classesArray[Utils.randomArrayIndex(classesArray)];
    } else {
      for (const [key, value] of Object.entries(characterRaces.Human.henchman)) {
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
      HD = characterRaces[this.race].hd;
    } else {
      HD = characterRaces.Human.classes[this.charClass].hd;
    }

    let hpArray = new Array(this.level).fill(undefined);

    return hpArray.map(() => Utils.randomInt(2, HD)).reduce((total, val) => total + val);
  }

  rollSex() {
    return Utils.randomInt(1, 10) > 3 ? "M" : "F";
  }

  getGoal() {
    const { goals } = hirelingsData;
    return goals[Utils.randomArrayIndex(goals)];
  }

  getDescriptor() {
    const { descriptors } = hirelingsData;
    return descriptors[Utils.randomArrayIndex(descriptors)];
  }

  getQuirk() {
    const { quirks } = hirelingsData;
    const quirksArray = [];

    for (let [key, odds] of Object.entries(quirks)) {
      const array = new Array(odds).fill(key);
      quirksArray.push(...array);
    }

    return quirksArray[Utils.randomArrayIndex(quirksArray)];
  }

  getRandomBackground() {
    const { backgrounds } = hirelingsData;
    const backgroundArray = [];

    for (let [key, odds] of Object.entries(backgrounds)) {
      const array = new Array(odds).fill(key);
      backgroundArray.push(...array);
    }

    return backgroundArray[Utils.randomArrayIndex(backgroundArray)];
  }

  getAlignment() {
    let alignArray = undefined;
    if (this.race !== "Human") {
      alignArray = characterRaces[this.race].alignments;
    } else {
      if (this.level > 0) {
        alignArray = characterRaces.Human.classes[this.charClass].alignments;
      } else {
        alignArray = characterRaces.Human.henchman[this.charClass].alignments;
      }
    }
    return alignArray[Utils.randomArrayIndex(alignArray)];
  }

  getArmor() {
    let armorArray = undefined;
    if (this.race !== "Human") {
      armorArray = characterRaces[this.race].armorOptions;
    } else {
      if (this.level > 0) {
        armorArray = characterRaces.Human.classes[this.charClass].armorOptions;
      } else {
        armorArray = characterRaces.Human.henchman[this.charClass].armorOptions;
      }
    }
    return armorArray[Utils.randomArrayIndex(armorArray)];
  }

  getWeapons() {
    const singleRollClasses = [
      "Magic-User",
      "Illusionist",
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

    if (this.race !== "Human") {
      cClass = characterRaces[this.race];
    } else {
      cClass =
        this.level > 0
          ? characterRaces.Human.classes[this.charClass]
          : characterRaces.Human.henchman[this.charClass];
    }

    primary = cClass.weaponOptions;
    if (!singleRollClasses.includes(this.charClass)) secondary = cClass.weaponOptions;
    weaponsArray = [
      primary[Utils.randomArrayIndex(primary)],
      secondary[Utils.randomArrayIndex(secondary)]
    ].filter((e) => e !== undefined);

    return weaponsArray.length > 1 ? weaponsArray.join(", ") : weaponsArray;
  }
}

export { HirelingRoster, Hireling };
