import Utils from "../../components/utils";

// Data
import Names from "../../data/names/allNames";
import Races from "../../data/races/allRaces";
import xge from "../../data/names/xgeNames";
import { isCompositeComponent } from "react-dom/test-utils";

export default class Name {
  constructor(params = {}) {
    this.race = params.race || this.randomRace();
    this.sex = params.sex || this.randomSex();
    this.age = params.age;
    this.jobGroup = params.jobGroup;
    this.culture = params.culture || "";
    this.xgeFilteredObj = this.xgeObjFilter();

    this.name = this.getNameByRace();
  }

  randomSex() {
    const sex = ["male", "female"];
    return sex[Utils.randomArrayIndex(sex)];
  }

  randomRace() {
    const racesArray = Object.keys(Races);
    const weightedArray = [];

    racesArray.forEach((race) => {
      const weight = Races[race].rarity;
      for (let i = 1; i <= weight; i++) {
        weightedArray.push(race);
      }
    });

    return weightedArray[Utils.randomArrayIndex(weightedArray)];
  }

  getNameByRace() {
    switch (this.race) {
      case "dwarf":
        return this.buildDwarfName();
      case "half-elf":
        return this.buildHalfElfName();
      case "half-orc":
        return this.buildHalfOrcName();
      case "elf":
        return this.buildElfName();
      case "dragonborn":
        return this.buildDragonbornName();
      // case "halfling":
      //   return this.buildHalflingName();
      case "tiefling":
        return this.buildTieflingName();
      case "gnome":
        return this.buildGnomeName();
      default:
        return this.buildHumanName();
    }
  }

  buildDwarfName() {
    // -- 50/50 chance of Xanthar's Guide name or a random constructed name

    if (Utils.randomInt(1, 2) === 1) {
      const firstName = this.xgeFirstName(this.xgeFilteredObj, this.sex);
      const clanName = this.xgeClanName(this.xgeFilteredObj);
      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    } else {
      let firstName = Names.dwarven.first[this.sex][Utils.randomArrayIndex(Names.dwarven.first[this.sex])];
      let frontCompound = Names.dwarven.last.frontCompound[Utils.randomArrayIndex(Names.dwarven.last.frontCompound)];
      let backCompound = Names.dwarven.last.backCompound[Utils.randomArrayIndex(Names.dwarven.last.backCompound)];

      frontCompound = frontCompound.substr(0, 1).toUpperCase() + frontCompound.substr(1, frontCompound.length);

      const clanName = frontCompound.concat(backCompound);
      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: frontCompound.concat(backCompound),
        displayName: displayName.trim(),
      };
    }
  }

  buildHalfElfName() {
    const fiftyFifty = Utils.randomInt(1, 2);

    if (fiftyFifty === 1) {
      this.xgeFilteredObj = this.xgeObjFilter("human");
      return this.buildHumanName();
    } else {
      this.xgeFilteredObj = this.xgeObjFilter("elf");
      return this.buildElfName();
    }
  }

  buildHalfOrcName() {
    const method = ["random", "xge"][Utils.randomInt(0, 1)];

    if (method === "xge") {
      const firstName = this.xgeFirstName(this.xgeFilteredObj, this.sex);

      return {
        name: firstName,
        surname: "",
        displayName: firstName,
      };
    } else {
      this.xgeFilteredObj = this.xgeObjFilter("human");
      return this.buildHumanName();
    }
  }

  buildElfName() {
    function getFirstName(xgeFilteredObj, sex) {
      const options = xgeFilteredObj.tables.find((obj, i) => {
        if (obj.option.toLowerCase().includes(sex)) return obj.table;
        return false;
      });

      let diceRoll = Utils.randomInt(1, 100);

      return options.table.find((entry) => {
        if ((diceRoll >= entry.min && diceRoll <= entry.max) || diceRoll === entry.min || diceRoll === entry.max) {
          return entry;
        }

        return false;
      }).result;
    }

    function getSurname(xgeFilteredObj, sex) {
      const nameObj = xgeFilteredObj.tables.find((obj, i) => {
        if (obj.option === "Family") return obj.table;
        return false;
      });

      let diceRoll = Utils.randomInt(1, 100);

      return nameObj.table.find((entry) => {
        if ((diceRoll >= entry.min && diceRoll <= entry.max) || diceRoll === entry.min || diceRoll === entry.max) {
          return entry;
        }

        return false;
      }).result;
    }

    const name = getFirstName(this.xgeFilteredObj, this.sex);
    const surname = getSurname(this.xgeFilteredObj, this.sex);
    const displayName = `${name} ${surname}`;

    return {
      name: name,
      surname: surname,
      displayName: displayName.trim(),
    };
  }

  buildHumanName() {
    // human is also the fallback nameset for any race not explicitly listed.
    const { race, culture, sex, jobGroup } = this;
    let xgeFilteredObj = this.xgeObjFilter("human");

    const data = Names.human;
    const surnameJobs = ["educated", "lesser nobility", "greater nobility", "magic"];

    let firstName = "";
    let surname = "";

    // if (Utils.randomInt(1, 2) === 1) {
    firstName = getXGEName();
    // } else {
    // firstName = data.first[sex][Utils.randomArrayIndex(data.first[sex])];
    // }

    if (surnameJobs.some((job) => job === jobGroup)) {
      let {
        last,
        last: { def },
      } = data;

      if (culture && last[culture]) {
        const group = last[culture];
        surname = group[Utils.randomArrayIndex(group)];
      } else {
        surname = def[Utils.randomArrayIndex(def)];
      }
    }

    let displayName = `${firstName} ${surname}`;
    if (culture === "Chinese" || culture === "Japanese" || culture === "Korean") {
      displayName = `${surname} ${firstName}`;
    }

    return {
      name: firstName,
      surname: surname,
      displayName: displayName.trim(),
    };

    function getXGEName() {
      let { tables } = xgeFilteredObj;

      if (culture) {
        tables = tables.filter((obj, i) => {
          const keys = obj.option.toLowerCase().split(",");
          if (keys[0].trim() === culture.toLowerCase() && keys[1].trim() === sex) {
            return obj;
          }
          return false;
        });
      }

      // if the culture is not listed, reset and just get all names for a given sex.
      if (tables.length === 0) {
        tables = xgeFilteredObj.tables;
      }

      tables = tables.filter((obj, i) => {
        const keys = obj.option.toLowerCase().split(",");
        if (keys[1].trim() === sex) return obj.table;
        return false;
      });

      const randomGroup = tables[Utils.randomArrayIndex(tables)].table;
      return randomGroup[Utils.randomArrayIndex(randomGroup)].result;
    }
  }

  buildDragonbornName() {
    let method = ["random", "xge"][Utils.randomInt(0, 1)];

    if (method === "xge") {
      const firstName = this.xgeFirstName(this.xgeFilteredObj, this.sex);
      const clanName = this.xgeClanName(this.xgeFilteredObj);
      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    } else {
      const firstNameGroup = Names.dragonborn.first[this.sex];
      const fn1 = firstNameGroup.front[Utils.randomArrayIndex(firstNameGroup.front)];
      const fn2 = firstNameGroup.back[Utils.randomArrayIndex(firstNameGroup.back)];

      // TODO - add random clan name generator if its worth the effort.

      let firstName = fn1 + fn2;
      let clanName = "";

      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    }
  }

  buildTieflingName() {
    let method = ["random", "xge"][Utils.randomInt(0, 1)];

    if (method === "xge") {
      const firstName = this.xgeFirstName(this.xgeFilteredObj, this.sex);
      const displayName = `${firstName}`;

      return {
        name: firstName,
        surname: "",
        displayName: displayName.trim(),
      };
    } else {
      const firstNameGroup = Names.tiefling.first[this.sex];
      const fn1 = firstNameGroup.front[Utils.randomArrayIndex(firstNameGroup.front)];
      const fn2 = firstNameGroup.back[Utils.randomArrayIndex(firstNameGroup.back)];

      // TODO - add random clan name generator if its worth the effort.

      let firstName = fn1 + fn2;
      let clanName = "";

      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    }
  }

  buildGnomeName() {
    const method = ["random", "xge"][Utils.randomInt(0, 1)];
    const nameLenArr = new Array(Utils.randomInt(1, 2)).fill(undefined);

    if (method === "xge") {
      const firstName = nameLenArr
        .map((x) => {
          return this.xgeFirstName(this.xgeFilteredObj, this.sex);
        })
        .join(" ");

      const clanName = this.xgeClanName(this.xgeFilteredObj);
      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    } else {
      const firstName = nameLenArr
        .map((x) => {
          const firstNameGroup = Names.gnome.first[this.sex];
          const fn1 = firstNameGroup.front[Utils.randomArrayIndex(firstNameGroup.front)];
          const fn2 = firstNameGroup.back[Utils.randomArrayIndex(firstNameGroup.back)];

          return fn1 + fn2;
        })
        .join(" ");

      // TODO - add random clan name generator if its worth the effort.
      const clanName = this.xgeClanName(this.xgeFilteredObj);

      const displayName = `${firstName} ${clanName}`;

      return {
        name: firstName,
        surname: clanName,
        displayName: displayName.trim(),
      };
    }
  }

  xgeObjFilter(forceRace) {
    let race = forceRace ? forceRace : this.race;

    const xgeFilteredObjFilter = xge.name.find((obj, i) => {
      if (obj.name.toLowerCase() === race) {
        return obj;
      }
      return false;
    });

    return xgeFilteredObjFilter;
  }

  xgeFirstName(obj, sex) {
    const nameObj = obj.tables.find((obj, i) => {
      if (obj.option.toLowerCase() === sex) return obj.table;
      return false;
    });

    let diceRoll = Utils.randomInt(1, 100);

    return nameObj.table.find((entry) => {
      if ((diceRoll >= entry.min && diceRoll <= entry.max) || diceRoll === entry.min || diceRoll === entry.max) {
        return entry;
      }

      return false;
    }).result;
  }

  xgeClanName(obj) {
    const nameObj = obj.tables.find((obj, i) => {
      if (obj.option === "Clan") return obj.table;
      return false;
    });

    let diceRoll = Utils.randomInt(1, 100);

    return nameObj.table.find((entry) => {
      if ((diceRoll >= entry.min && diceRoll <= entry.max) || diceRoll === entry.min || diceRoll === entry.max) {
        return entry;
      }

      return false;
    }).result;
  }
}
